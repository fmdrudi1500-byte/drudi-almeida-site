CREATE TABLE `job_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`position` varchar(200) NOT NULL,
	`unit` varchar(100),
	`experience` text NOT NULL,
	`education` varchar(300),
	`motivation` text,
	`resumeUrl` text,
	`resumeKey` text,
	`resumeFileName` varchar(300),
	`status` enum('new','reviewing','interview','rejected','hired') NOT NULL DEFAULT 'new',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_applications_id` PRIMARY KEY(`id`)
);
