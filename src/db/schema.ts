import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const idColumn = () => text("id").primaryKey();
const createdAtColumn = () => text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`);
const updatedAtColumn = () => text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`);

export const users = sqliteTable(
	"users",
	{
		id: idColumn(),
		stackUserId: text("stack_user_id").notNull(),
		email: text("email").notNull(),
		name: text("name"),
		image: text("image"),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [
		uniqueIndex("users_stack_user_id_idx").on(table.stackUserId),
		index("users_email_idx").on(table.email),
	],
);

export const customers = sqliteTable(
	"customers",
	{
		id: idColumn(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		dodoCustomerId: text("dodo_customer_id"),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [
		index("customers_user_id_idx").on(table.userId),
		uniqueIndex("customers_dodo_customer_id_idx").on(table.dodoCustomerId),
	],
);

export const subscriptions = sqliteTable(
	"subscriptions",
	{
		id: idColumn(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		customerId: text("customer_id")
			.notNull()
			.references(() => customers.id, { onDelete: "cascade" }),
		dodoSubscriptionId: text("dodo_subscription_id"),
		productId: text("product_id").notNull(),
		planKey: text("plan_key").notNull(),
		status: text("status").notNull(),
		currentPeriodStart: text("current_period_start"),
		currentPeriodEnd: text("current_period_end"),
		cancelAtPeriodEnd: integer("cancel_at_period_end", { mode: "boolean" }).notNull().default(false),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [
		index("subscriptions_user_id_idx").on(table.userId),
		index("subscriptions_customer_id_idx").on(table.customerId),
		uniqueIndex("subscriptions_dodo_subscription_id_idx").on(table.dodoSubscriptionId),
	],
);

export const payments = sqliteTable(
	"payments",
	{
		id: idColumn(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		dodoPaymentId: text("dodo_payment_id"),
		amount: integer("amount").notNull(),
		currency: text("currency").notNull(),
		status: text("status").notNull(),
		rawEventJson: text("raw_event_json", { mode: "json" }).$type<unknown>().notNull(),
		createdAt: createdAtColumn(),
	},
	(table) => [
		index("payments_user_id_idx").on(table.userId),
		uniqueIndex("payments_dodo_payment_id_idx").on(table.dodoPaymentId),
	],
);

export const webhookEvents = sqliteTable(
	"webhook_events",
	{
		id: idColumn(),
		provider: text("provider").notNull(),
		eventId: text("event_id").notNull(),
		eventType: text("event_type").notNull(),
		processedAt: text("processed_at"),
		rawJson: text("raw_json", { mode: "json" }).$type<unknown>().notNull(),
		createdAt: createdAtColumn(),
	},
	(table) => [
		index("webhook_events_provider_idx").on(table.provider),
		uniqueIndex("webhook_events_event_id_idx").on(table.eventId),
	],
);

export const usersRelations = relations(users, ({ many }) => ({
	customers: many(customers),
	subscriptions: many(subscriptions),
	payments: many(payments),
}));

export const customersRelations = relations(customers, ({ many, one }) => ({
	user: one(users, {
		fields: [customers.userId],
		references: [users.id],
	}),
	subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
	user: one(users, {
		fields: [subscriptions.userId],
		references: [users.id],
	}),
	customer: one(customers, {
		fields: [subscriptions.customerId],
		references: [customers.id],
	}),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
	user: one(users, {
		fields: [payments.userId],
		references: [users.id],
	}),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type WebhookEvent = typeof webhookEvents.$inferSelect;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;
