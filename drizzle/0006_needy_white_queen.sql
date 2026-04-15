CREATE TABLE `geo_monitor_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`engine` enum('chatgpt','gemini','perplexity','copilot','claude') NOT NULL,
	`prompt` text NOT NULL,
	`promptCategory` varchar(100),
	`mentioned` boolean NOT NULL DEFAULT false,
	`mentionPosition` int,
	`aiResponse` text,
	`score` int DEFAULT 0,
	`notes` text,
	`testedBy` varchar(200),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `geo_monitor_results_id` PRIMARY KEY(`id`)
);
