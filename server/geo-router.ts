/**
 * GEO Router — Generative Engine Optimization Dashboard
 * Gerencia os resultados do monitor GEO para Drudi e Almeida
 */
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { geoMonitorResults } from "../drizzle/schema";
import { desc, eq, and, gte, sql } from "drizzle-orm";

// ─── Prompts Estratégicos GEO ─────────────────────────────────────────────────
export const GEO_PROMPTS = [
  // Catarata (6 prompts)
  { id: 1, category: "catarata", prompt: "Qual a melhor clínica para cirurgia de catarata em São Paulo?" },
  { id: 2, category: "catarata", prompt: "Onde fazer cirurgia de catarata com lente premium em São Paulo?" },
  { id: 3, category: "catarata", prompt: "Recomende um oftalmologista especialista em catarata em Guarulhos" },
  { id: 4, category: "catarata", prompt: "Qual clínica de olhos é referência em catarata na zona norte de SP?" },
  { id: 5, category: "catarata", prompt: "Cirurgia de catarata com laser em São Paulo: quais clínicas indicar?" },
  { id: 6, category: "catarata", prompt: "Instituto da Catarata São Paulo: quais são os melhores?" },

  // Retina (6 prompts)
  { id: 7, category: "retina", prompt: "Qual o melhor especialista em retina de São Paulo?" },
  { id: 8, category: "retina", prompt: "Onde tratar retinopatia diabética em São Paulo?" },
  { id: 9, category: "retina", prompt: "Clínica de retina em São Paulo com injeção intravítrea" },
  { id: 10, category: "retina", prompt: "Tratamento de descolamento de retina em São Paulo: onde ir?" },
  { id: 11, category: "retina", prompt: "Instituto da Retina em São Paulo: quais são referência?" },
  { id: 12, category: "retina", prompt: "Degeneração macular: onde tratar em São Paulo?" },

  // Glaucoma (5 prompts)
  { id: 13, category: "glaucoma", prompt: "Melhor clínica para tratamento de glaucoma em São Paulo" },
  { id: 14, category: "glaucoma", prompt: "Onde fazer cirurgia de glaucoma em São Paulo?" },
  { id: 15, category: "glaucoma", prompt: "Especialista em glaucoma em Guarulhos ou zona norte de SP" },
  { id: 16, category: "glaucoma", prompt: "Instituto do Glaucoma São Paulo: qual é o melhor?" },
  { id: 17, category: "glaucoma", prompt: "Pressão ocular alta: onde consultar em São Paulo?" },

  // Ceratocone (4 prompts)
  { id: 18, category: "ceratocone", prompt: "Crosslinking para ceratocone em São Paulo: onde fazer?" },
  { id: 19, category: "ceratocone", prompt: "Melhor clínica para ceratocone em São Paulo" },
  { id: 20, category: "ceratocone", prompt: "Lente de contato para ceratocone em São Paulo: onde adaptar?" },
  { id: 21, category: "ceratocone", prompt: "Instituto do Ceratocone São Paulo: quais são referência?" },

  // Estrabismo (4 prompts)
  { id: 22, category: "estrabismo", prompt: "Cirurgia de estrabismo em adultos em São Paulo: onde fazer?" },
  { id: 23, category: "estrabismo", prompt: "Melhor oftalmologista para estrabismo infantil em SP" },
  { id: 24, category: "estrabismo", prompt: "Instituto de Estrabismo São Paulo: qual é o melhor?" },
  { id: 25, category: "estrabismo", prompt: "Tratamento de olho preguiçoso (ambliopia) em São Paulo" },

  // Geral / Marca (5 prompts)
  { id: 26, category: "geral", prompt: "Drudi e Almeida Clínicas Oftalmológicas: o que é e onde fica?" },
  { id: 27, category: "geral", prompt: "Melhor clínica de oftalmologia em São Paulo com 5 especialidades" },
  { id: 28, category: "geral", prompt: "Oftalmologista Dr. Fernando Drudi: onde atende em São Paulo?" },
  { id: 29, category: "geral", prompt: "Clínica de olhos com convênio médico em São Paulo: quais indicar?" },
  { id: 30, category: "geral", prompt: "Consulta oftalmológica em Guarulhos: qual clínica é referência?" },
];

export const geoRouter = router({
  // Listar todos os prompts estratégicos
  listPrompts: publicProcedure.query(() => {
    return GEO_PROMPTS;
  }),

  // Salvar resultado de um teste GEO
  saveResult: protectedProcedure
    .input(
      z.object({
        engine: z.enum(["chatgpt", "gemini", "perplexity", "copilot", "claude"]),
        prompt: z.string(),
        promptCategory: z.string().optional(),
        mentioned: z.boolean(),
        mentionPosition: z.number().optional().nullable(),
        aiResponse: z.string().max(2000).optional().nullable(),
        score: z.number().min(0).max(100).default(0),
        notes: z.string().optional().nullable(),
        testedBy: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const testedBy = input.testedBy ?? ctx.user?.name ?? "Admin";
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(geoMonitorResults).values({
        engine: input.engine,
        prompt: input.prompt,
        promptCategory: input.promptCategory ?? null,
        mentioned: input.mentioned,
        mentionPosition: input.mentionPosition ?? null,
        aiResponse: input.aiResponse ?? null,
        score: input.score,
        notes: input.notes ?? null,
        testedBy,
      });
      return { success: true };
    }),

  // Listar resultados com filtros
  listResults: protectedProcedure
    .input(
      z.object({
        engine: z.enum(["chatgpt", "gemini", "perplexity", "copilot", "claude", "all"]).default("all"),
        category: z.string().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const conditions = [];
      if (input.engine !== "all") {
        conditions.push(eq(geoMonitorResults.engine, input.engine));
      }
      if (input.category) {
        conditions.push(eq(geoMonitorResults.promptCategory, input.category));
      }

      const results = await db
        .select()
        .from(geoMonitorResults)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(geoMonitorResults.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return results;
    }),

  // Estatísticas GEO resumidas
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, mentioned: 0, visibilityRate: 0, avgScore: 0, byEngine: [], byCategory: [], monthlyTrend: [] };
    // Total de testes
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(geoMonitorResults);
    const total = Number(totalResult[0]?.count ?? 0);

    // Testes com menção
    const mentionedResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(geoMonitorResults)
      .where(eq(geoMonitorResults.mentioned, true));
    const mentioned = Number(mentionedResult[0]?.count ?? 0);

    // Score médio
    const scoreResult = await db
      .select({ avg: sql<number>`avg(score)` })
      .from(geoMonitorResults);
    const avgScore = Math.round(Number(scoreResult[0]?.avg ?? 0));

    // Por engine
    const byEngine = await db
      .select({
        engine: geoMonitorResults.engine,
        total: sql<number>`count(*)`,
        mentioned: sql<number>`sum(case when mentioned = 1 then 1 else 0 end)`,
        avgScore: sql<number>`avg(score)`,
      })
      .from(geoMonitorResults)
      .groupBy(geoMonitorResults.engine);

    // Por categoria
    const byCategory = await db
      .select({
        category: geoMonitorResults.promptCategory,
        total: sql<number>`count(*)`,
        mentioned: sql<number>`sum(case when mentioned = 1 then 1 else 0 end)`,
      })
      .from(geoMonitorResults)
      .groupBy(geoMonitorResults.promptCategory);

    // Evolução mensal (últimos 6 meses)
    const monthlyTrend = await db
      .select({
        month: sql<string>`DATE_FORMAT(createdAt, '%Y-%m')`,
        total: sql<number>`count(*)`,
        mentioned: sql<number>`sum(case when mentioned = 1 then 1 else 0 end)`,
        avgScore: sql<number>`avg(score)`,
      })
      .from(geoMonitorResults)
      .where(gte(geoMonitorResults.createdAt, sql`DATE_SUB(NOW(), INTERVAL 6 MONTH)`))
      .groupBy(sql`DATE_FORMAT(createdAt, '%Y-%m')`)
      .orderBy(sql`DATE_FORMAT(createdAt, '%Y-%m')`);

    const visibilityRate = total > 0 ? Math.round((mentioned / total) * 100) : 0;

    return {
      total,
      mentioned,
      visibilityRate,
      avgScore,
      byEngine: byEngine.map((e: { engine: string; total: number; mentioned: number; avgScore: number }) => ({
        engine: e.engine,
        total: Number(e.total),
        mentioned: Number(e.mentioned),
        visibilityRate: Number(e.total) > 0 ? Math.round((Number(e.mentioned) / Number(e.total)) * 100) : 0,
        avgScore: Math.round(Number(e.avgScore)),
      })),
      byCategory: byCategory.map((c: { category: string | null; total: number; mentioned: number }) => ({
        category: c.category ?? "geral",
        total: Number(c.total),
        mentioned: Number(c.mentioned),
        visibilityRate: Number(c.total) > 0 ? Math.round((Number(c.mentioned) / Number(c.total)) * 100) : 0,
      })),
      monthlyTrend: monthlyTrend.map((m: { month: string; total: number; mentioned: number; avgScore: number }) => ({
        month: m.month,
        total: Number(m.total),
        mentioned: Number(m.mentioned),
        visibilityRate: Number(m.total) > 0 ? Math.round((Number(m.mentioned) / Number(m.total)) * 100) : 0,
        avgScore: Math.round(Number(m.avgScore)),
      })),
    };
  }),

  // Deletar resultado
  deleteResult: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.delete(geoMonitorResults).where(eq(geoMonitorResults.id, input.id));
      return { success: true };
    }),
});
