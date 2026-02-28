CREATE TABLE `seo_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pagePath` varchar(200) NOT NULL,
	`pageLabel` varchar(100) NOT NULL,
	`title` varchar(60),
	`description` varchar(160),
	`keywords` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `seo_settings_pagePath_unique` UNIQUE(`pagePath`)
);
