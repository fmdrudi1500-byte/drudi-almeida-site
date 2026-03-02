/**
 * appointment-router.ts
 * tRPC procedures for the scheduling system.
 *
 * Business rules:
 *  - Mon–Fri: 9h–17h (slots: 9,10,11,12,13,14,15,16,17)
 *  - Saturday: 9h–12h (slots: 9,10,11,12)
 *  - Sunday: closed
 *  - 1 appointment per hour per unit (active = pending | confirmed)
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { appointments } from "../drizzle/schema";
import { and, eq, not } from "drizzle-orm";
import { randomBytes } from "crypto";
import { sendPatientConfirmation, sendClinicNotification } from "./appointment-email";

// ─── Constants ────────────────────────────────────────────────────────────────

export const UNITS = ["Santana", "Guarulhos", "Tatuapé", "São Miguel", "Lapa"] as const;
export type Unit = (typeof UNITS)[number];

const WEEKDAY_SLOTS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // Mon–Fri
const SATURDAY_SLOTS = [9, 10, 11, 12]; // Sat

function getSlotsForDate(dateStr: string): number[] {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const dow = d.getDay(); // 0=Sun, 6=Sat
  if (dow === 0) return []; // Sunday — closed
  if (dow === 6) return SATURDAY_SLOTS;
  return WEEKDAY_SLOTS;
}

function generateCancelToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const appointmentRouter = router({
  /**
   * Returns available hours for a given unit + date.
   * Slots already taken (pending or confirmed) are excluded.
   */
  getAvailableSlots: publicProcedure
    .input(
      z.object({
        unit: z.enum(UNITS),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),
      })
    )
    .query(async ({ input }) => {
      const allSlots = getSlotsForDate(input.date);
      if (allSlots.length === 0) return { slots: [], dayOff: true };

      // Find taken slots (pending or confirmed)
      const db = await getDb();
      if (!db) return { slots: allSlots, dayOff: false }; // DB unavailable: show all slots
      const taken = await db
        .select({ hour: appointments.appointmentHour })
        .from(appointments)
        .where(
          and(
            eq(appointments.unit, input.unit),
            eq(appointments.appointmentDate, input.date),
            not(eq(appointments.status, "cancelled"))
          )
        );

      const takenHours = new Set(taken.map((r: { hour: number }) => r.hour));
      const available = allSlots.filter((h) => !takenHours.has(h));

      return { slots: available, dayOff: false };
    }),

  /**
   * Creates a new appointment after validating no conflict exists.
   */
  createAppointment: publicProcedure
    .input(
      z.object({
        patientName: z.string().min(2).max(200),
        patientPhone: z.string().min(8).max(30),
        patientEmail: z.string().email().optional().or(z.literal("")),
        unit: z.enum(UNITS),
        appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        appointmentHour: z.number().int().min(9).max(17),
        notes: z.string().max(500).optional(),
        siteOrigin: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Validate the slot is still available
      const allSlots = getSlotsForDate(input.appointmentDate);
      if (!allSlots.includes(input.appointmentHour)) {
        throw new Error("Horário não disponível para esta data.");
      }

      const db = await getDb();
      if (!db) throw new Error("Serviço temporariamente indisponível. Tente novamente.");

      const conflict = await db
        .select({ id: appointments.id })
        .from(appointments)
        .where(
          and(
            eq(appointments.unit, input.unit),
            eq(appointments.appointmentDate, input.appointmentDate),
            eq(appointments.appointmentHour, input.appointmentHour),
            not(eq(appointments.status, "cancelled"))
          )
        )
        .limit(1);

      if (conflict.length > 0) {
        throw new Error("Este horário já foi reservado. Por favor, escolha outro.");
      }

      // 2. Create the appointment
      const cancelToken = generateCancelToken();
      const patientEmail = input.patientEmail || null;

      await (db as NonNullable<typeof db>).insert(appointments).values({
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        notes: input.notes || null,
        cancelToken,
        status: "pending",
        emailSentToPatient: false,
        emailSentToClinic: false,
      });

      // 3. Send emails asynchronously (don't block response)
      const emailData = {
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        cancelToken,
        siteOrigin: input.siteOrigin,
      };

      // Fire-and-forget email sends
      sendPatientConfirmation(emailData).catch(console.error);
      sendClinicNotification(emailData).catch(console.error);

      return {
        success: true,
        message: "Solicitação recebida! Nossa equipe entrará em contato em breve.",
      };
    }),

  /**
   * Lists all appointments — protected (admin only).
   */
  listAppointments: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "confirmed", "cancelled", "all"]).default("all"),
        unit: z.enum([...UNITS, "all"] as [string, ...string[]]).default("all"),
        date: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Acesso restrito.");
      }

      const db = await getDb();
      if (!db) return [];
      const rows = await db
        .select()
        .from(appointments)
        .orderBy(appointments.appointmentDate, appointments.appointmentHour);

      type AppointmentRow = typeof rows[0];
      let filtered: AppointmentRow[] = rows;

      if (input.status !== "all") {
        filtered = filtered.filter((r: AppointmentRow) => r.status === input.status);
      }
      if (input.unit !== "all") {
        filtered = filtered.filter((r: AppointmentRow) => r.unit === input.unit);
      }
      if (input.date) {
        filtered = filtered.filter((r: AppointmentRow) => r.appointmentDate === input.date);
      }

      return filtered;
    }),

  /**
   * Updates appointment status — protected (admin only).
   */
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Acesso restrito.");
      }

      const db = await getDb();
      if (!db) throw new Error("Serviço temporariamente indisponível.");
      await db
        .update(appointments)
        .set({ status: input.status })
        .where(eq(appointments.id, input.id));

      return { success: true };
    }),

  /**
   * Cancels an appointment by token — public (patient self-cancel via email link).
   */
  cancelByToken: publicProcedure
    .input(z.object({ token: z.string().min(10) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Serviço temporariamente indisponível.");
      const rows = await db
        .select()
        .from(appointments)
        .where(eq(appointments.cancelToken, input.token))
        .limit(1);

      if (rows.length === 0) {
        throw new Error("Link de cancelamento inválido ou expirado.");
      }

      const appt = rows[0];
      if (appt.status === "cancelled") {
        return { success: true, alreadyCancelled: true };
      }

      await (db as NonNullable<typeof db>)
        .update(appointments)
        .set({ status: "cancelled" })
        .where(eq(appointments.id, appt.id));

      return { success: true, alreadyCancelled: false };
    }),
});
