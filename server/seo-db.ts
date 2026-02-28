import { getDb } from "./db";
import { seoSettings } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// All pages that can have SEO settings managed via the admin panel
export const MANAGED_PAGES = [
  { path: "/", label: "Página Inicial" },
  { path: "/sobre", label: "Sobre Nós" },
  { path: "/instituto/catarata", label: "Instituto da Catarata" },
  { path: "/instituto/ceratocone", label: "Instituto do Ceratocone" },
  { path: "/instituto/glaucoma", label: "Instituto do Glaucoma" },
  { path: "/instituto/retina", label: "Instituto da Retina" },
  { path: "/instituto/estrabismo", label: "Instituto de Estrabismo" },
  { path: "/tecnologia", label: "Tecnologia" },
  { path: "/convenios", label: "Convênios" },
  { path: "/blog", label: "Blog" },
  { path: "/contato", label: "Contato" },
];

export async function getAllSeoSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seoSettings);
}

export async function getSeoSettingByPath(pagePath: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(seoSettings)
    .where(eq(seoSettings.pagePath, pagePath))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertSeoSetting(data: {
  pagePath: string;
  pageLabel: string;
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const existing = await getSeoSettingByPath(data.pagePath);
  if (existing) {
    await db
      .update(seoSettings)
      .set({
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        keywords: data.keywords ?? existing.keywords,
        pageLabel: data.pageLabel,
      })
      .where(eq(seoSettings.pagePath, data.pagePath));
  } else {
    await db.insert(seoSettings).values({
      pagePath: data.pagePath,
      pageLabel: data.pageLabel,
      title: data.title,
      description: data.description,
      keywords: data.keywords,
    });
  }
  return getSeoSettingByPath(data.pagePath);
}
