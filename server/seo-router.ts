import { z } from "zod";
import { router, publicProcedure, protectedProcedure, cachedPublicProcedure } from "./_core/trpc";
import {
  getAllSeoSettings,
  getSeoSettingByPath,
  upsertSeoSetting,
  MANAGED_PAGES,
} from "./seo-db";
import {
  submitSitemapToGSC,
  getSitemapStatus,
  listSitemaps,
} from "./google-search-console";

export const seoRouter = router({
  // Public: get SEO settings for a specific page (used by frontend to override hardcoded values)
  getByPath: cachedPublicProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ input }) => {
      return getSeoSettingByPath(input.path);
    }),

  // Admin: list all pages with their current SEO settings
  listAll: protectedProcedure.query(async () => {
    const settings = await getAllSeoSettings();
    // Merge with MANAGED_PAGES so all pages appear even if not yet in DB
    return MANAGED_PAGES.map((page) => {
      const saved = settings.find((s) => s.pagePath === page.path);
      return {
        pagePath: page.path,
        pageLabel: page.label,
        title: saved?.title ?? null,
        description: saved?.description ?? null,
        keywords: saved?.keywords ?? null,
        updatedAt: saved?.updatedAt ?? null,
      };
    });
  }),

  // Admin: save SEO settings for a page
  save: protectedProcedure
    .input(
      z.object({
        pagePath: z.string(),
        pageLabel: z.string(),
        title: z.string().max(60).nullable(),
        description: z.string().max(160).nullable(),
        keywords: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      return upsertSeoSetting(input);
    }),

  // Admin: submit sitemap to Google Search Console
  submitSitemap: protectedProcedure.mutation(async () => {
    return submitSitemapToGSC();
  }),

  // Admin: get current sitemap status from Google Search Console
  getSitemapStatus: protectedProcedure.query(async () => {
    return getSitemapStatus();
  }),

  // Admin: list all sitemaps registered in Google Search Console
  listSitemaps: protectedProcedure.query(async () => {
    return listSitemaps();
  }),
});
