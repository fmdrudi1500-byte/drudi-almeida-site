import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog categories — e.g. "Catarata", "Ceratocone", "Saúde Ocular"
 */
export const blogCategories = mysqlTable("blog_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  color: varchar("color", { length: 20 }).default("#1a2e4a"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogCategory = typeof blogCategories.$inferSelect;
export type InsertBlogCategory = typeof blogCategories.$inferInsert;

/**
 * Blog posts — articles, videos, audio, mixed content
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 320 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageUrl: text("coverImageUrl"),
  coverImageKey: text("coverImageKey"),

  // SEO fields (auto-generated or manually set)
  seoTitle: varchar("seoTitle", { length: 300 }),
  seoDescription: text("seoDescription"),
  seoKeywords: text("seoKeywords"),

  // Content type: article, video, audio, gallery
  contentType: mysqlEnum("contentType", ["article", "video", "audio", "gallery"]).default("article").notNull(),

  // Status
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),

  // Category
  categoryId: int("categoryId"),

  // Tags stored as JSON string
  tags: text("tags"),

  // Author
  authorId: int("authorId").notNull(),
  authorName: varchar("authorName", { length: 200 }),

  // Reading time in minutes
  readingTimeMin: int("readingTimeMin").default(5),

  // View count
  viewCount: int("viewCount").default(0),

  // Featured post
  featured: boolean("featured").default(false),

  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Blog media — images, videos, audio, PDFs attached to posts
 */
export const blogMedia = mysqlTable("blog_media", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId"),
  url: text("url").notNull(),
  fileKey: text("fileKey").notNull(),
  fileName: varchar("fileName", { length: 300 }),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: int("fileSize"),
  mediaType: mysqlEnum("mediaType", ["image", "video", "audio", "document"]).notNull(),
  altText: text("altText"),
  caption: text("caption"),
  sortOrder: int("sortOrder").default(0),
  uploadedBy: int("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogMedia = typeof blogMedia.$inferSelect;
export type InsertBlogMedia = typeof blogMedia.$inferInsert;

/**
 * Blog comments — public comments on posts
 */
export const blogComments = mysqlTable("blog_comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  parentId: int("parentId"), // for threaded replies

  // Commenter info (no login required)
  authorName: varchar("authorName", { length: 200 }).notNull(),
  authorEmail: varchar("authorEmail", { length: 320 }),

  content: text("content").notNull(),

  // Moderation
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),

  // IP for spam prevention
  ipAddress: varchar("ipAddress", { length: 45 }),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = typeof blogComments.$inferInsert;
