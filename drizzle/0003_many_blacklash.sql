CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientName` varchar(200) NOT NULL,
	`patientPhone` varchar(30) NOT NULL,
	`patientEmail` varchar(320),
	`unit` enum('Santana','Guarulhos','Tatuapé','São Miguel','Lapa') NOT NULL,
	`appointmentDate` varchar(10) NOT NULL,
	`appointmentHour` int NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`cancelToken` varchar(64) NOT NULL,
	`emailSentToPatient` boolean DEFAULT false,
	`emailSentToClinic` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`),
	CONSTRAINT `appointments_cancelToken_unique` UNIQUE(`cancelToken`)
);
