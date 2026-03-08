CREATE TABLE `appointment_day_blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`unit` enum('Santana','Guarulhos','Tatuapé','São Miguel','Lapa') NOT NULL,
	`blockedDate` varchar(10) NOT NULL,
	`reason` varchar(300),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `appointment_day_blocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appointments` ADD `specialty` varchar(100);--> statement-breakpoint
ALTER TABLE `appointments` ADD `healthPlan` varchar(100);--> statement-breakpoint
ALTER TABLE `appointments` ADD `appointmentMinute` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `appointments` ADD `googleCalendarEventId` varchar(200);