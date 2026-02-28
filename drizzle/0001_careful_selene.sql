CREATE TABLE `blog_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`description` text,
	`color` varchar(20) DEFAULT '#1a2e4a',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `blog_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`parentId` int,
	`authorName` varchar(200) NOT NULL,
	`authorEmail` varchar(320),
	`content` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int,
	`url` text NOT NULL,
	`fileKey` text NOT NULL,
	`fileName` varchar(300),
	`mimeType` varchar(100),
	`fileSize` int,
	`mediaType` enum('image','video','audio','document') NOT NULL,
	`altText` text,
	`caption` text,
	`sortOrder` int DEFAULT 0,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(300) NOT NULL,
	`slug` varchar(320) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImageUrl` text,
	`coverImageKey` text,
	`seoTitle` varchar(300),
	`seoDescription` text,
	`seoKeywords` text,
	`contentType` enum('article','video','audio','gallery') NOT NULL DEFAULT 'article',
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`categoryId` int,
	`tags` text,
	`authorId` int NOT NULL,
	`authorName` varchar(200),
	`readingTimeMin` int DEFAULT 5,
	`viewCount` int DEFAULT 0,
	`featured` boolean DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
