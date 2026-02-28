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
