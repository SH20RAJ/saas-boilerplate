CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`dodo_customer_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `customers_user_id_idx` ON `customers` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `customers_dodo_customer_id_idx` ON `customers` (`dodo_customer_id`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`dodo_payment_id` text,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`status` text NOT NULL,
	`raw_event_json` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `payments_user_id_idx` ON `payments` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payments_dodo_payment_id_idx` ON `payments` (`dodo_payment_id`);--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`dodo_subscription_id` text,
	`product_id` text NOT NULL,
	`plan_key` text NOT NULL,
	`status` text NOT NULL,
	`current_period_start` text,
	`current_period_end` text,
	`cancel_at_period_end` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subscriptions_user_id_idx` ON `subscriptions` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_customer_id_idx` ON `subscriptions` (`customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_dodo_subscription_id_idx` ON `subscriptions` (`dodo_subscription_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`stack_user_id` text NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`image` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_stack_user_id_idx` ON `users` (`stack_user_id`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`event_id` text NOT NULL,
	`event_type` text NOT NULL,
	`processed_at` text,
	`raw_json` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `webhook_events_provider_idx` ON `webhook_events` (`provider`);--> statement-breakpoint
CREATE UNIQUE INDEX `webhook_events_event_id_idx` ON `webhook_events` (`event_id`);