/* ============================================================
   Careers Router — Drudi e Almeida
   Handles job application submissions (public) and
   admin management of applications (protected + admin).
   ============================================================ */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  createJobApplication,
  listJobApplications,
  updateJobApplicationStatus,
  getJobApplicationById,
} from "./db";
import { notifyOwner } from "./_core/notification";

// ─── Validation schemas ────────────────────────────────────────────────────

const submitSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(8).max(30),
  position: z.string().min(2).max(200),
  unit: z.string().max(100).optional(),
  experience: z.string().min(10).max(3000),
  education: z.string().max(300).optional(),
  motivation: z.string().max(3000).optional(),
  resumeUrl: z.string().url().optional(),
  resumeKey: z.string().optional(),
  resumeFileName: z.string().max(300).optional(),
});

const updateStatusSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["new", "reviewing", "interview", "rejected", "hired"]),
  adminNotes: z.string().max(2000).optional(),
});

// ─── Admin guard ────────────────────────────────────────────────────────────

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores." });
  }
  return next({ ctx });
});

// ─── Router ─────────────────────────────────────────────────────────────────

export const careersRouter = router({
  /** Public: submit a job application */
  submit: publicProcedure.input(submitSchema).mutation(async ({ input }) => {
    const id = await createJobApplication({
      name: input.name,
      email: input.email,
      phone: input.phone,
      position: input.position,
      unit: input.unit ?? "Qualquer unidade",
      experience: input.experience,
      education: input.education ?? null,
      motivation: input.motivation ?? null,
      resumeUrl: input.resumeUrl ?? null,
      resumeKey: input.resumeKey ?? null,
      resumeFileName: input.resumeFileName ?? null,
      status: "new",
    });

    // Notify clinic owner
    await notifyOwner({
      title: `Nova candidatura: ${input.position}`,
      content: `${input.name} (${input.email}) se candidatou para a vaga de ${input.position} na unidade ${input.unit ?? "Qualquer unidade"}.`,
    }).catch(() => {/* non-critical */});

    return { success: true, id };
  }),

  /** Admin: list all applications with optional status filter */
  list: adminProcedure
    .input(
      z.object({
        status: z.enum(["new", "reviewing", "interview", "rejected", "hired"]).optional(),
        limit: z.number().int().min(1).max(200).default(50),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      return listJobApplications({
        status: input.status,
        limit: input.limit,
        offset: input.offset,
      });
    }),

  /** Admin: get a single application by id */
  getById: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const app = await getJobApplicationById(input.id);
      if (!app) throw new TRPCError({ code: "NOT_FOUND", message: "Candidatura não encontrada." });
      return app;
    }),

  /** Admin: update application status and optional notes */
  updateStatus: adminProcedure
    .input(updateStatusSchema)
    .mutation(async ({ input }) => {
      await updateJobApplicationStatus(input.id, input.status, input.adminNotes);
      return { success: true };
    }),
});
