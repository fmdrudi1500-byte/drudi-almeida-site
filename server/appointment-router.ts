/**
 * appointment-router.ts
 * tRPC procedures for the scheduling system.
 *
 * Business rules:
 *  - Mon–Fri: 9h–17h30 (slots every 30 min: 9:00, 9:30, 10:00 … 17:30)
 *  - Saturday: 9h–12h30 (slots: 9:00, 9:30, 10:00, 10:30, 11:00, 11:30, 12:00, 12:30)
 *  - Sunday: closed
 *  - 1 appointment per 30-min slot per unit (active = pending | confirmed)
 *  - Days can be blocked by admin per unit
 *  - Google Calendar event created on booking (if configured)
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { appointments, appointmentDayBlocks } from "../drizzle/schema";
import { and, eq, not } from "drizzle-orm";
import { randomBytes } from "crypto";
import { sendPatientConfirmation, sendClinicNotification } from "./appointment-email";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  isCalendarConfigured,
  type Unit as GCalUnit,
} from "./google-calendar";

// ─── Constants ────────────────────────────────────────────────────────────────
export const UNITS = ["Santana", "Guarulhos", "Tatuap\u00e9", "S\u00e3o Miguel", "Lapa"] as const;
export type Unit = (typeof UNITS)[number];

export const SPECIALTIES = [
  "Catarata",
  "Ceratocone",
  "Glaucoma",
  "Retina",
  "Estrabismo",
  "Consulta Geral",
] as const;

/**
 * Returns all 30-min slots for a given date as { hour, minute } pairs.
 * Mon–Fri: 9:00–17:30 (18 slots)
 * Sat: 9:00–12:30 (8 slots)
 * Sun: [] (closed)
 */
export function getSlotsForDate(dateStr: string): Array<{ hour: number; minute: number }> {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const dow = d.getDay(); // 0=Sun, 6=Sat

  if (dow === 0) return []; // Sunday — closed

  const slots: Array<{ hour: number; minute: number }> = [];
  // Sat ends at 13h (last slot 12:30), weekday at 18h (last slot 17:30)
  const endHour = dow === 6 ? 13 : 18;

  for (let h = 9; h < endHour; h++) {
    slots.push({ hour: h, minute: 0 });
    slots.push({ hour: h, minute: 30 });
  }

  return slots;
}

/** Encodes a slot as a single integer: hour * 100 + minute (e.g. 9:30 => 930) */
export function encodeSlot(hour: number, minute: number): number {
  return hour * 100 + minute;
}

function generateCancelToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── Router ───────────────────────────────────────────────────────────────────
export const appointmentRouter = router({
  /**
   * Returns available 30-min slots for a given unit + date.
   * Excludes taken slots (pending | confirmed) and blocked days.
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
      if (allSlots.length === 0) return { slots: [], dayOff: true, blocked: false };

      const db = await getDb();
      if (!db) return { slots: allSlots, dayOff: false, blocked: false };

      // Check if day is blocked by admin
      const blocks = await db
        .select({ id: appointmentDayBlocks.id, reason: appointmentDayBlocks.reason })
        .from(appointmentDayBlocks)
        .where(
          and(
            eq(appointmentDayBlocks.unit, input.unit),
            eq(appointmentDayBlocks.blockedDate, input.date)
          )
        )
        .limit(1);

      if (blocks.length > 0) {
        return { slots: [], dayOff: false, blocked: true, blockReason: blocks[0].reason };
      }

      // Find taken slots (pending or confirmed)
      const taken = await db
        .select({
          hour: appointments.appointmentHour,
          minute: appointments.appointmentMinute,
        })
        .from(appointments)
        .where(
          and(
            eq(appointments.unit, input.unit),
            eq(appointments.appointmentDate, input.date),
            not(eq(appointments.status, "cancelled"))
          )
        );

      const takenSet = new Set(
        taken.map((r: { hour: number; minute: number }) => encodeSlot(r.hour, r.minute))
      );

      const available = allSlots.filter(
        (s) => !takenSet.has(encodeSlot(s.hour, s.minute))
      );

      return { slots: available, dayOff: false, blocked: false };
    }),

  /**
   * Creates a new appointment after validating no conflict exists.
   * Also creates a Google Calendar event if integration is configured.
   */
  createAppointment: publicProcedure
    .input(
      z.object({
        patientName: z.string().min(2).max(200),
        patientPhone: z.string().min(8).max(30),
        patientEmail: z.string().email().optional().or(z.literal("")),
        unit: z.enum(UNITS),
        specialty: z.enum(SPECIALTIES),
        healthPlan: z.string().min(2).max(100),
        appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        appointmentHour: z.number().int().min(9).max(17),
        appointmentMinute: z.number().int().refine((v) => v === 0 || v === 30),
        notes: z.string().max(500).optional(),
        siteOrigin: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Validate the slot exists for this date
      const allSlots = getSlotsForDate(input.appointmentDate);
      const slotExists = allSlots.some(
        (s) => s.hour === input.appointmentHour && s.minute === input.appointmentMinute
      );
      if (!slotExists) {
        throw new Error("Hor\u00e1rio n\u00e3o dispon\u00edvel para esta data.");
      }

      const db = await getDb();
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel. Tente novamente.");

      // 2. Check if day is blocked
      const blocks = await db
        .select({ id: appointmentDayBlocks.id })
        .from(appointmentDayBlocks)
        .where(
          and(
            eq(appointmentDayBlocks.unit, input.unit),
            eq(appointmentDayBlocks.blockedDate, input.appointmentDate)
          )
        )
        .limit(1);

      if (blocks.length > 0) {
        throw new Error("Este dia n\u00e3o est\u00e1 dispon\u00edvel para agendamento nesta unidade.");
      }

      // 3. Check for slot conflict
      const conflict = await db
        .select({ id: appointments.id })
        .from(appointments)
        .where(
          and(
            eq(appointments.unit, input.unit),
            eq(appointments.appointmentDate, input.appointmentDate),
            eq(appointments.appointmentHour, input.appointmentHour),
            eq(appointments.appointmentMinute, input.appointmentMinute),
            not(eq(appointments.status, "cancelled"))
          )
        )
        .limit(1);

      if (conflict.length > 0) {
        throw new Error("Este hor\u00e1rio j\u00e1 foi reservado. Por favor, escolha outro.");
      }

      // 4. Create the appointment in the database
      const cancelToken = generateCancelToken();
      const patientEmail = input.patientEmail || null;

      await (db as NonNullable<typeof db>).insert(appointments).values({
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        specialty: input.specialty,
        healthPlan: input.healthPlan,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        appointmentMinute: input.appointmentMinute,
        notes: input.notes || null,
        cancelToken,
        status: "confirmed",
        emailSentToPatient: false,
        emailSentToClinic: false,
      });

      // 5. Create Google Calendar event (fire-and-forget)
      if (isCalendarConfigured()) {
        createCalendarEvent({
          unit: input.unit as GCalUnit,
          patientName: input.patientName,
          patientPhone: input.patientPhone,
          patientEmail,
          healthPlan: input.healthPlan,
          specialty: input.specialty,
          appointmentDate: input.appointmentDate,
          appointmentHour: input.appointmentHour,
          appointmentMinute: input.appointmentMinute,
          notes: input.notes,
        })
          .then(async (eventId) => {
            if (eventId) {
              const dbInner = await getDb();
              if (dbInner) {
                await (dbInner as NonNullable<typeof dbInner>)
                  .update(appointments)
                  .set({ googleCalendarEventId: eventId })
                  .where(
                    and(
                      eq(appointments.unit, input.unit),
                      eq(appointments.appointmentDate, input.appointmentDate),
                      eq(appointments.appointmentHour, input.appointmentHour),
                      eq(appointments.appointmentMinute, input.appointmentMinute),
                      eq(appointments.cancelToken, cancelToken)
                    )
                  );
              }
            }
          })
          .catch(console.error);
      }

      // 6. Send emails asynchronously
      const emailData = {
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        specialty: input.specialty,
        healthPlan: input.healthPlan,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        appointmentMinute: input.appointmentMinute,
        cancelToken,
        siteOrigin: input.siteOrigin,
      };

      sendPatientConfirmation(emailData).catch(console.error);
      sendClinicNotification(emailData).catch(console.error);

      return {
        success: true,
        message: "Consulta agendada com sucesso! Voc\u00ea receber\u00e1 um email de confirma\u00e7\u00e3o.",
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
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
      const db = await getDb();
      if (!db) return [];

      const rows = await db
        .select()
        .from(appointments)
        .orderBy(appointments.appointmentDate, appointments.appointmentHour);

      type AppointmentRow = (typeof rows)[0];
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
   * Also deletes the Google Calendar event when cancelling.
   */
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
      const db = await getDb();
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel.");

      if (input.status === "cancelled") {
        const rows = await db
          .select({
            unit: appointments.unit,
            googleCalendarEventId: appointments.googleCalendarEventId,
          })
          .from(appointments)
          .where(eq(appointments.id, input.id))
          .limit(1);

        if (rows.length > 0 && rows[0].googleCalendarEventId) {
          deleteCalendarEvent(
            rows[0].unit as GCalUnit,
            rows[0].googleCalendarEventId
          ).catch(console.error);
        }
      }

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
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel.");

      const rows = await db
        .select()
        .from(appointments)
        .where(eq(appointments.cancelToken, input.token))
        .limit(1);

      if (rows.length === 0) {
        throw new Error("Link de cancelamento inv\u00e1lido ou expirado.");
      }

      const appt = rows[0];
      if (appt.status === "cancelled") {
        return { success: true, alreadyCancelled: true };
      }

      if (appt.googleCalendarEventId) {
        deleteCalendarEvent(
          appt.unit as GCalUnit,
          appt.googleCalendarEventId
        ).catch(console.error);
      }

      await (db as NonNullable<typeof db>)
        .update(appointments)
        .set({ status: "cancelled" })
        .where(eq(appointments.id, appt.id));

      return { success: true, alreadyCancelled: false };
    }),

  // ─── Day Block Management (admin only) ──────────────────────────────────────

  listDayBlocks: protectedProcedure
    .input(
      z.object({
        unit: z.enum([...UNITS, "all"] as [string, ...string[]]).default("all"),
      })
    )
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
      const db = await getDb();
      if (!db) return [];

      const rows = await db
        .select()
        .from(appointmentDayBlocks)
        .orderBy(appointmentDayBlocks.blockedDate);

      return rows;
    }),

  blockDay: protectedProcedure
    .input(
      z.object({
        unit: z.enum(UNITS),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        reason: z.string().max(300).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
      const db = await getDb();
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel.");

      const existing = await db
        .select({ id: appointmentDayBlocks.id })
        .from(appointmentDayBlocks)
        .where(
          and(
            eq(appointmentDayBlocks.unit, input.unit),
            eq(appointmentDayBlocks.blockedDate, input.date)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return { success: true, alreadyBlocked: true };
      }

      await (db as NonNullable<typeof db>).insert(appointmentDayBlocks).values({
        unit: input.unit,
        blockedDate: input.date,
        reason: input.reason || null,
      });

      return { success: true, alreadyBlocked: false };
    }),

  unblockDay: protectedProcedure
    .input(
      z.object({
        unit: z.enum(UNITS),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
      const db = await getDb();
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel.");

      await (db as NonNullable<typeof db>)
        .delete(appointmentDayBlocks)
        .where(
          and(
            eq(appointmentDayBlocks.unit, input.unit),
            eq(appointmentDayBlocks.blockedDate, input.date)
          )
        );

      return { success: true };
    }),

  calendarStatus: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");
    return { configured: isCalendarConfigured() };
  }),

  /**
   * Creates an appointment manually by admin/call center.
   * Bypasses slot validation (admin can override), creates Google Calendar event
   * and sends confirmation email to the patient.
   */
  createAppointmentManual: protectedProcedure
    .input(
      z.object({
        patientName: z.string().min(2).max(200),
        patientPhone: z.string().min(8).max(30),
        patientEmail: z.string().email().optional().or(z.literal("")),
        unit: z.enum(UNITS),
        specialty: z.enum(SPECIALTIES),
        healthPlan: z.string().min(1).max(100),
        appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        appointmentHour: z.number().int().min(0).max(23),
        appointmentMinute: z.number().int().refine((v) => v === 0 || v === 30),
        appointmentType: z.enum(["primeira_vez", "retorno"]).default("primeira_vez"),
        notes: z.string().max(1000).optional(),
        siteOrigin: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Acesso restrito.");

      const db = await getDb();
      if (!db) throw new Error("Servi\u00e7o temporariamente indispon\u00edvel.");

      // Check for slot conflict (warn but allow admin to proceed)
      const conflict = await db
        .select({ id: appointments.id })
        .from(appointments)
        .where(
          and(
            eq(appointments.unit, input.unit),
            eq(appointments.appointmentDate, input.appointmentDate),
            eq(appointments.appointmentHour, input.appointmentHour),
            eq(appointments.appointmentMinute, input.appointmentMinute),
            not(eq(appointments.status, "cancelled"))
          )
        )
        .limit(1);

      if (conflict.length > 0) {
        throw new Error("Este hor\u00e1rio j\u00e1 est\u00e1 ocupado. Escolha outro hor\u00e1rio.");
      }

      const cancelToken = generateCancelToken();
      const patientEmail = input.patientEmail || null;
      const notesWithType = `[${input.appointmentType === "retorno" ? "RETORNO" : "PRIMEIRA VEZ"}]${input.notes ? " " + input.notes : ""}`;

      await (db as NonNullable<typeof db>).insert(appointments).values({
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        specialty: input.specialty,
        healthPlan: input.healthPlan,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        appointmentMinute: input.appointmentMinute,
        notes: notesWithType,
        cancelToken,
        status: "confirmed",
        emailSentToPatient: false,
        emailSentToClinic: false,
      });

      // Create Google Calendar event
      if (isCalendarConfigured()) {
        createCalendarEvent({
          unit: input.unit as GCalUnit,
          patientName: input.patientName,
          patientPhone: input.patientPhone,
          patientEmail,
          healthPlan: input.healthPlan,
          specialty: input.specialty,
          appointmentDate: input.appointmentDate,
          appointmentHour: input.appointmentHour,
          appointmentMinute: input.appointmentMinute,
          notes: notesWithType,
        })
          .then(async (eventId) => {
            if (eventId) {
              const dbInner = await getDb();
              if (dbInner) {
                await (dbInner as NonNullable<typeof dbInner>)
                  .update(appointments)
                  .set({ googleCalendarEventId: eventId })
                  .where(
                    and(
                      eq(appointments.unit, input.unit),
                      eq(appointments.appointmentDate, input.appointmentDate),
                      eq(appointments.appointmentHour, input.appointmentHour),
                      eq(appointments.appointmentMinute, input.appointmentMinute),
                      eq(appointments.cancelToken, cancelToken)
                    )
                  );
              }
            }
          })
          .catch(console.error);
      }

      // Send confirmation email to patient (if email provided)
      const emailData = {
        patientName: input.patientName,
        patientPhone: input.patientPhone,
        patientEmail,
        unit: input.unit,
        specialty: input.specialty,
        healthPlan: input.healthPlan,
        appointmentDate: input.appointmentDate,
        appointmentHour: input.appointmentHour,
        appointmentMinute: input.appointmentMinute,
        cancelToken,
        siteOrigin: input.siteOrigin,
      };

      if (patientEmail) {
        sendPatientConfirmation(emailData).catch(console.error);
      }
      sendClinicNotification(emailData).catch(console.error);

      return {
        success: true,
        message: "Agendamento criado com sucesso!",
      };
    }),
});
