import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import {
  createCategory,
  createComment,
  createMedia,
  createPost,
  deleteCategory,
  deleteComment,
  deleteMedia,
  deletePost,
  getAllCategories,
  getAllCommentsAdmin,
  getAllMedia,
  getAllPostsAdmin,
  getApprovedComments,
  getMediaByPost,
  getPendingCommentsCount,
  getPostById,
  getPostBySlug,
  getPublishedPosts,
  incrementViewCount,
  updateCategory,
  updateCommentStatus,
  updatePost,
} from "./blog-db";
import { nanoid } from "nanoid";

// Helper: admin-only guard
function requireAdmin(role: string) {
  if (role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem realizar esta ação." });
  }
}

// Helper: generate SEO fields from title + content using LLM
async function generateSEO(title: string, content: string, excerpt?: string | null) {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em SEO para clínicas oftalmológicas. Gere campos SEO em português brasileiro.",
        },
        {
          role: "user",
          content: `Gere campos SEO para este artigo médico:
Título: ${title}
Resumo: ${excerpt ?? ""}
Conteúdo (primeiros 500 chars): ${content.substring(0, 500)}

Responda APENAS com JSON no formato:
{
  "seoTitle": "título SEO otimizado (máx 60 chars)",
  "seoDescription": "meta description (máx 160 chars)",
  "seoKeywords": "palavra1, palavra2, palavra3 (5-8 palavras-chave)"
}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "seo_fields",
          strict: true,
          schema: {
            type: "object",
            properties: {
              seoTitle: { type: "string" },
              seoDescription: { type: "string" },
              seoKeywords: { type: "string" },
            },
            required: ["seoTitle", "seoDescription", "seoKeywords"],
            additionalProperties: false,
          },
        },
      },
    });
    const raw = response.choices?.[0]?.message?.content;
    if (raw && typeof raw === "string") return JSON.parse(raw) as { seoTitle: string; seoDescription: string; seoKeywords: string };
  } catch (e) {
    console.warn("[SEO] Auto-generation failed:", e);
  }
  return null;
}

// Helper: generate slug from title
function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

// Helper: estimate reading time
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const blogRouter = router({
  // ── PUBLIC ENDPOINTS ──────────────────────────────────────────────────────

  /** List published posts with pagination, filtering, search */
  listPublished: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(9),
        offset: z.number().min(0).default(0),
        categoryId: z.number().optional(),
        search: z.string().optional(),
        featured: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      return getPublishedPosts(input);
    }),

  /** Get single published post by slug + increment view count */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);
      if (!post || post.status !== "published") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Artigo não encontrado." });
      }
      await incrementViewCount(post.id);
      const [media, comments, categories] = await Promise.all([
        getMediaByPost(post.id),
        getApprovedComments(post.id),
        getAllCategories(),
      ]);
      const category = post.categoryId ? categories.find((c) => c.id === post.categoryId) : null;
      return { post, media, comments, category };
    }),

  /** List all categories */
  listCategories: publicProcedure.query(async () => {
    return getAllCategories();
  }),

  /** Submit a public comment (goes to pending) */
  submitComment: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        parentId: z.number().optional(),
        authorName: z.string().min(2).max(200),
        authorEmail: z.string().email().optional(),
        content: z.string().min(5).max(2000),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getPostById(input.postId);
      if (!post || post.status !== "published") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Artigo não encontrado." });
      }
      const ipAddress = (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0] ?? "unknown";
      const comment = await createComment({
        postId: input.postId,
        parentId: input.parentId,
        authorName: input.authorName,
        authorEmail: input.authorEmail,
        content: input.content,
        status: "pending",
        ipAddress,
      });
      return { success: true, comment };
    }),

  // ── ADMIN ENDPOINTS ───────────────────────────────────────────────────────

  /** Admin: list all posts */
  adminListPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        status: z.enum(["draft", "published"]).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      return getAllPostsAdmin(input);
    }),

  /** Admin: get single post by id (for editing) */
  adminGetPost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      const post = await getPostById(input.id);
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      const media = await getMediaByPost(post.id);
      return { post, media };
    }),

  /** Admin: create post */
  adminCreatePost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(300),
        excerpt: z.string().max(500).optional(),
        content: z.string().min(10),
        coverImageUrl: z.string().optional(),
        coverImageKey: z.string().optional(),
        contentType: z.enum(["article", "video", "audio", "gallery"]).default("article"),
        status: z.enum(["draft", "published"]).default("draft"),
        categoryId: z.number().optional(),
        tags: z.string().optional(),
        featured: z.boolean().default(false),
        seoTitle: z.string().max(300).optional(),
        seoDescription: z.string().optional(),
        seoKeywords: z.string().optional(),
        autoSeo: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);

      const slug = slugify(input.title) + "-" + nanoid(6);
      const readingTimeMin = estimateReadingTime(input.content);

      // Auto-generate SEO if requested and not manually set
      let seoTitle = input.seoTitle;
      let seoDescription = input.seoDescription;
      let seoKeywords = input.seoKeywords;

      if (input.autoSeo && (!seoTitle || !seoDescription)) {
        const seo = await generateSEO(input.title, input.content, input.excerpt);
        if (seo) {
          seoTitle = seoTitle || seo.seoTitle;
          seoDescription = seoDescription || seo.seoDescription;
          seoKeywords = seoKeywords || seo.seoKeywords;
        }
      }

      const post = await createPost({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        coverImageUrl: input.coverImageUrl,
        coverImageKey: input.coverImageKey,
        contentType: input.contentType,
        status: input.status,
        categoryId: input.categoryId,
        tags: input.tags,
        featured: input.featured,
        seoTitle,
        seoDescription,
        seoKeywords,
        readingTimeMin,
        authorId: ctx.user.id,
        authorName: ctx.user.name ?? "Drudi e Almeida",
        publishedAt: input.status === "published" ? new Date() : undefined,
      });

      return { success: true, post };
    }),

  /** Admin: update post */
  adminUpdatePost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(3).max(300).optional(),
        excerpt: z.string().max(500).optional(),
        content: z.string().min(10).optional(),
        coverImageUrl: z.string().optional().nullable(),
        coverImageKey: z.string().optional().nullable(),
        contentType: z.enum(["article", "video", "audio", "gallery"]).optional(),
        status: z.enum(["draft", "published"]).optional(),
        categoryId: z.number().optional().nullable(),
        tags: z.string().optional(),
        featured: z.boolean().optional(),
        seoTitle: z.string().max(300).optional(),
        seoDescription: z.string().optional(),
        seoKeywords: z.string().optional(),
        autoSeo: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);

      const { id, autoSeo, ...updates } = input;
      const existing = await getPostById(id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });

      // Auto-generate SEO if requested
      if (autoSeo && updates.content) {
        const seo = await generateSEO(
          updates.title ?? existing.title,
          updates.content,
          updates.excerpt ?? existing.excerpt
        );
        if (seo) {
          updates.seoTitle = updates.seoTitle || seo.seoTitle;
          updates.seoDescription = updates.seoDescription || seo.seoDescription;
          updates.seoKeywords = updates.seoKeywords || seo.seoKeywords;
        }
      }

      // Set publishedAt when publishing for the first time
      const publishedAt =
        updates.status === "published" && existing.status !== "published"
          ? new Date()
          : undefined;

      const readingTimeMin = updates.content ? estimateReadingTime(updates.content) : undefined;

      await updatePost(id, { ...updates, ...(publishedAt ? { publishedAt } : {}), ...(readingTimeMin ? { readingTimeMin } : {}) });
      return { success: true };
    }),

  /** Admin: delete post */
  adminDeletePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      await deletePost(input.id);
      return { success: true };
    }),

  /** Admin: upload media file (base64 encoded) */
  adminUploadMedia: protectedProcedure
    .input(
      z.object({
        postId: z.number().optional(),
        fileName: z.string(),
        mimeType: z.string(),
        base64Data: z.string(),
        mediaType: z.enum(["image", "video", "audio", "document"]),
        altText: z.string().optional(),
        caption: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);

      const buffer = Buffer.from(input.base64Data, "base64");
      const ext = input.fileName.split(".").pop() ?? "bin";
      const fileKey = `blog-media/${ctx.user.id}/${nanoid(12)}.${ext}`;

      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      const media = await createMedia({
        postId: input.postId,
        url,
        fileKey,
        fileName: input.fileName,
        mimeType: input.mimeType,
        fileSize: buffer.length,
        mediaType: input.mediaType,
        altText: input.altText,
        caption: input.caption,
        uploadedBy: ctx.user.id,
      });

      return { success: true, media };
    }),

  /** Admin: delete media */
  adminDeleteMedia: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      await deleteMedia(input.id);
      return { success: true };
    }),

  /** Admin: list all media */
  adminListMedia: protectedProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      return getAllMedia(input);
    }),

  // ── CATEGORIES ADMIN ──────────────────────────────────────────────────────

  adminCreateCategory: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100),
        slug: z.string().min(2).max(120),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      const category = await createCategory(input);
      return { success: true, category };
    }),

  adminUpdateCategory: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(2).max(100).optional(),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      const { id, ...data } = input;
      await updateCategory(id, data);
      return { success: true };
    }),

  adminDeleteCategory: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      await deleteCategory(input.id);
      return { success: true };
    }),

  // ── COMMENTS ADMIN ────────────────────────────────────────────────────────

  adminListComments: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected"]).optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      return getAllCommentsAdmin(input);
    }),

  adminUpdateCommentStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      await updateCommentStatus(input.id, input.status);
      return { success: true };
    }),

  adminDeleteComment: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      await deleteComment(input.id);
      return { success: true };
    }),

  adminPendingCount: protectedProcedure.query(async ({ ctx }) => {
    requireAdmin(ctx.user.role);
    return getPendingCommentsCount();
  }),

  /** Admin: regenerate SEO for a post */
  adminRegenerateSEO: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.user.role);
      const post = await getPostById(input.id);
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      const seo = await generateSEO(post.title, post.content, post.excerpt);
      if (seo) {
        await updatePost(input.id, seo);
      }
      return { success: true, seo };
    }),
});
