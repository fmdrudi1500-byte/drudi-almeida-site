import { and, desc, eq, like, or, sql } from "drizzle-orm";
import {
  BlogCategory,
  BlogComment,
  BlogMedia,
  BlogPost,
  InsertBlogCategory,
  InsertBlogComment,
  InsertBlogMedia,
  InsertBlogPost,
  blogCategories,
  blogComments,
  blogMedia,
  blogPosts,
} from "../drizzle/schema";
import { getDb } from "./db";

// ── CATEGORIES ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<BlogCategory[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogCategories).orderBy(blogCategories.name);
}

export async function createCategory(data: InsertBlogCategory): Promise<BlogCategory> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(blogCategories).values(data);
  const result = await db.select().from(blogCategories).where(eq(blogCategories.slug, data.slug)).limit(1);
  return result[0];
}

export async function updateCategory(id: number, data: Partial<InsertBlogCategory>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(blogCategories).set(data).where(eq(blogCategories.id, id));
}

export async function deleteCategory(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(blogCategories).where(eq(blogCategories.id, id));
}

// ── POSTS ────────────────────────────────────────────────────────────────────

export async function getPublishedPosts(opts?: {
  limit?: number;
  offset?: number;
  categoryId?: number;
  search?: string;
  featured?: boolean;
}): Promise<{ posts: BlogPost[]; total: number }> {
  const db = await getDb();
  if (!db) return { posts: [], total: 0 };

  const conditions = [eq(blogPosts.status, "published")];
  if (opts?.categoryId) conditions.push(eq(blogPosts.categoryId, opts.categoryId));
  if (opts?.featured !== undefined) conditions.push(eq(blogPosts.featured, opts.featured));
  if (opts?.search) {
    conditions.push(
      or(
        like(blogPosts.title, `%${opts.search}%`),
        like(blogPosts.excerpt, `%${opts.search}%`),
        like(blogPosts.tags, `%${opts.search}%`)
      )!
    );
  }

  const where = and(...conditions);

  const [posts, countResult] = await Promise.all([
    db
      .select()
      .from(blogPosts)
      .where(where)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(opts?.limit ?? 10)
      .offset(opts?.offset ?? 0),
    db.select({ count: sql<number>`count(*)` }).from(blogPosts).where(where),
  ]);

  return { posts, total: Number(countResult[0]?.count ?? 0) };
}

export async function getAllPostsAdmin(opts?: {
  limit?: number;
  offset?: number;
  status?: "draft" | "published";
  search?: string;
}): Promise<{ posts: BlogPost[]; total: number }> {
  const db = await getDb();
  if (!db) return { posts: [], total: 0 };

  const conditions: ReturnType<typeof eq>[] = [];
  if (opts?.status) conditions.push(eq(blogPosts.status, opts.status));
  if (opts?.search) {
    conditions.push(
      or(like(blogPosts.title, `%${opts.search}%`), like(blogPosts.excerpt, `%${opts.search}%`))!
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [posts, countResult] = await Promise.all([
    db
      .select()
      .from(blogPosts)
      .where(where)
      .orderBy(desc(blogPosts.updatedAt))
      .limit(opts?.limit ?? 20)
      .offset(opts?.offset ?? 0),
    db.select({ count: sql<number>`count(*)` }).from(blogPosts).where(where),
  ]);

  return { posts, total: Number(countResult[0]?.count ?? 0) };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0];
}

export async function getPostById(id: number): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function createPost(data: InsertBlogPost): Promise<BlogPost> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(blogPosts).values(data);
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, data.slug)).limit(1);
  return result[0];
}

export async function updatePost(id: number, data: Partial<InsertBlogPost>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(blogPosts).set({ ...data, updatedAt: new Date() }).where(eq(blogPosts.id, id));
}

export async function deletePost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function incrementViewCount(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .update(blogPosts)
    .set({ viewCount: sql`${blogPosts.viewCount} + 1` })
    .where(eq(blogPosts.id, id));
}

// ── MEDIA ────────────────────────────────────────────────────────────────────

export async function getMediaByPost(postId: number): Promise<BlogMedia[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogMedia)
    .where(eq(blogMedia.postId, postId))
    .orderBy(blogMedia.sortOrder);
}

export async function createMedia(data: InsertBlogMedia): Promise<BlogMedia> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(blogMedia).values(data);
  const result = await db.select().from(blogMedia).where(eq(blogMedia.fileKey, data.fileKey)).limit(1);
  return result[0];
}

export async function deleteMedia(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(blogMedia).where(eq(blogMedia.id, id));
}

export async function getAllMedia(opts?: { limit?: number; offset?: number }): Promise<BlogMedia[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogMedia)
    .orderBy(desc(blogMedia.createdAt))
    .limit(opts?.limit ?? 50)
    .offset(opts?.offset ?? 0);
}

// ── COMMENTS ─────────────────────────────────────────────────────────────────

export async function getApprovedComments(postId: number): Promise<BlogComment[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogComments)
    .where(and(eq(blogComments.postId, postId), eq(blogComments.status, "approved")))
    .orderBy(blogComments.createdAt);
}

export async function getAllCommentsAdmin(opts?: {
  status?: "pending" | "approved" | "rejected";
  limit?: number;
  offset?: number;
}): Promise<{ comments: BlogComment[]; total: number }> {
  const db = await getDb();
  if (!db) return { comments: [], total: 0 };

  const where = opts?.status ? eq(blogComments.status, opts.status) : undefined;

  const [comments, countResult] = await Promise.all([
    db
      .select()
      .from(blogComments)
      .where(where)
      .orderBy(desc(blogComments.createdAt))
      .limit(opts?.limit ?? 20)
      .offset(opts?.offset ?? 0),
    db.select({ count: sql<number>`count(*)` }).from(blogComments).where(where),
  ]);

  return { comments, total: Number(countResult[0]?.count ?? 0) };
}

export async function createComment(data: InsertBlogComment): Promise<BlogComment> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(blogComments).values(data);
  const result = await db
    .select()
    .from(blogComments)
    .where(and(eq(blogComments.postId, data.postId), eq(blogComments.authorName, data.authorName)))
    .orderBy(desc(blogComments.createdAt))
    .limit(1);
  return result[0];
}

export async function updateCommentStatus(
  id: number,
  status: "pending" | "approved" | "rejected"
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(blogComments).set({ status }).where(eq(blogComments.id, id));
}

export async function deleteComment(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(blogComments).where(eq(blogComments.id, id));
}

export async function getPendingCommentsCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogComments)
    .where(eq(blogComments.status, "pending"));
  return Number(result[0]?.count ?? 0);
}

/** Get related posts: same category, excluding current post, max 3 */
export async function getRelatedPosts(currentPostId: number, categoryId: number | null, limit = 3): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = [
    eq(blogPosts.status, "published"),
    sql`${blogPosts.id} != ${currentPostId}`,
  ];

  if (categoryId) {
    conditions.push(eq(blogPosts.categoryId, categoryId));
  }

  const posts = await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit);

  // If not enough same-category posts, fill with any other published posts
  if (posts.length < limit) {
    const existingIds = [currentPostId, ...posts.map((p) => p.id)];
    const fallback = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          sql`${blogPosts.id} NOT IN (${sql.join(existingIds.map((id) => sql`${id}`), sql`, `)})`
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit - posts.length);
    posts.push(...fallback);
  }

  return posts;
}

// ── INTERNAL LINKS INJECTION ─────────────────────────────────────────────────

/**
 * Fetches all published posts (id, title, slug, tags) and builds a keyword → slug map.
 * Used to inject internal links into article HTML content.
 */
export async function getAllPostsForLinking(): Promise<Array<{ id: number; title: string; slug: string; tags: string | null }>> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ id: blogPosts.id, title: blogPosts.title, slug: blogPosts.slug, tags: blogPosts.tags })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

/**
 * Injects internal hyperlinks into HTML article content.
 *
 * Strategy:
 * - For each published post (excluding the current one), extract 2-4 keyword phrases
 *   from the title (e.g. "catarata", "ceratocone", "glaucoma").
 * - Scan the HTML content for the first occurrence of each phrase (case-insensitive,
 *   outside of existing <a> tags) and wrap it with a link to /blog/<slug>.
 * - Limit to max 5 injected links per article to avoid over-optimisation.
 */
export function injectInternalLinks(
  html: string,
  currentSlug: string,
  allPosts: Array<{ id: number; title: string; slug: string; tags: string | null }>
): string {
  // Helper: normalize text for deduplication (remove accents, lowercase, alphanumeric only)
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").trim();

  // Build keyword pairs: { keywordNorm (for dedup), keywordOriginal (for matching), url, slug }
  const pairs: Array<{ keywordNorm: string; keywordOriginal: string; url: string; slug: string }> = [];

  const stopwords = new Set([
    "como", "para", "sobre", "quando", "quais", "qual", "onde", "quem",
    "tipos", "causas", "sinais", "riscos", "guia", "completo", "tudo",
    "saude", "ocular", "visao", "olhos", "tratamento", "sintomas",
  ]);

  for (const post of allPosts) {
    if (post.slug === currentSlug) continue;

    const url = `/blog/${post.slug}`;

    // Extract keywords from title — keep original word (with accents) for matching
    const titleWordPairs = post.title
      .replace(/[^\w\s\u00C0-\u024F]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 5)
      .filter((w) => !stopwords.has(normalize(w)))
      .map((w) => ({ norm: normalize(w), original: w }));

    for (const { norm, original } of titleWordPairs.slice(0, 2)) {
      pairs.push({ keywordNorm: norm, keywordOriginal: original, url, slug: post.slug });
    }

    // Also add tags if available
    if (post.tags) {
      let tagsArr: string[] = [];
      try {
        tagsArr = JSON.parse(post.tags);
      } catch {
        tagsArr = post.tags.split(",").map((t) => t.trim());
      }
      for (const tag of tagsArr.slice(0, 2)) {
        const norm = normalize(tag);
        if (norm.length >= 5 && !stopwords.has(norm)) {
          // Use the original tag text (with accents) for matching
          pairs.push({ keywordNorm: norm, keywordOriginal: tag.trim(), url, slug: post.slug });
        }
      }
    }
  }

  // Sort by keyword length descending (match longer phrases first)
  pairs.sort((a, b) => b.keywordOriginal.length - a.keywordOriginal.length);

  // Deduplicate by normalized keyword: keep only first entry per keyword
  const seen = new Set<string>();
  const uniquePairs = pairs.filter((p) => {
    if (seen.has(p.keywordNorm)) return false;
    seen.add(p.keywordNorm);
    return true;
  });

  let result = html;
  let injectedCount = 0;
  const MAX_LINKS = 5;
  const usedSlugs = new Set<string>();

  for (const { keywordOriginal, url, slug } of uniquePairs) {
    if (injectedCount >= MAX_LINKS) break;
    if (usedSlugs.has(slug)) continue; // one link per target article

    // Escape special regex chars in the original keyword (may contain accented letters)
    const escaped = keywordOriginal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match keyword case-insensitively, NOT inside an existing anchor tag
    const regex = new RegExp(
      `(?<!<[^>]*)\\b(${escaped})\\b(?![^<]*>)(?![^<]*<\\/a>)`,
      "i"
    );

    const newHtml = result.replace(regex, (match) => {
      return `<a href="${url}" class="internal-link" title="Saiba mais sobre ${match}">${match}</a>`;
    });

    if (newHtml !== result) {
      result = newHtml;
      injectedCount++;
      usedSlugs.add(slug);
    }
  }

  return result;
}
