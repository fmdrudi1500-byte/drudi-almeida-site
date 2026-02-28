/* ============================================================
   Sitemap & robots.txt — Drudi e Almeida
   Generates dynamic sitemap.xml and serves robots.txt
   ============================================================ */
import type { Express } from "express";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "https://drudialmeida.com.br";

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/sobre", priority: "0.8", changefreq: "monthly" },
  { path: "/tecnologia", priority: "0.7", changefreq: "monthly" },
  { path: "/convenios", priority: "0.7", changefreq: "monthly" },
  { path: "/contato", priority: "0.8", changefreq: "monthly" },
  { path: "/agendamento", priority: "0.9", changefreq: "weekly" },
  { path: "/instituto/catarata", priority: "0.9", changefreq: "monthly" },
  { path: "/instituto/ceratocone", priority: "0.9", changefreq: "monthly" },
  { path: "/instituto/glaucoma", priority: "0.9", changefreq: "monthly" },
  { path: "/instituto/retina", priority: "0.9", changefreq: "monthly" },
  { path: "/instituto/estrabismo", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
];

function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

function buildSitemapXml(urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }>): string {
  const urlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ""}${u.priority ? `\n    <priority>${u.priority}</priority>` : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

export function registerSitemapRoutes(app: Express) {
  // ── sitemap.xml ──────────────────────────────────────────────
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const today = formatDate(new Date());

      // Build static URL entries
      const staticUrls = staticPages.map((p) => ({
        loc: `${BASE_URL}${p.path}`,
        lastmod: today,
        changefreq: p.changefreq,
        priority: p.priority,
      }));

      // Fetch published blog posts dynamically
      let blogUrls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }> = [];
      try {
        const db = await getDb();
        if (!db) throw new Error("No DB");
        const posts = await db
          .select({
            slug: blogPosts.slug,
            updatedAt: blogPosts.updatedAt,
          })
          .from(blogPosts)
          .where(eq(blogPosts.status, "published"));

        blogUrls = posts.map((p: { slug: string; updatedAt: Date | string | number | null }) => ({
          loc: `${BASE_URL}/blog/${p.slug}`,
          lastmod: p.updatedAt ? formatDate(p.updatedAt) : today,
          changefreq: "weekly",
          priority: "0.7",
        }));
      } catch {
        // If DB query fails, continue without blog posts
      }

      const xml = buildSitemapXml([...staticUrls, ...blogUrls]);

      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600"); // Cache 1 hour
      res.send(xml);
    } catch (err) {
      console.error("[Sitemap] Error generating sitemap:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // ── robots.txt ───────────────────────────────────────────────
  app.get("/robots.txt", (_req, res) => {
    const robotsTxt = `# Drudi e Almeida Clínicas Oftalmológicas
# https://drudialmeida.com.br

User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /404

# Allow major search engine bots explicitly
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Allow AI crawlers for AI-powered search visibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

    res.set("Content-Type", "text/plain; charset=utf-8");
    res.set("Cache-Control", "public, max-age=86400"); // Cache 24 hours
    res.send(robotsTxt);
  });
}
