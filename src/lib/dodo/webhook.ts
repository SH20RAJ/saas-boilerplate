import { eq } from "drizzle-orm";

import { getPlanKeyByProductId } from "@/config/plans";
import { getDbAsync } from "@/db/client";
import { customers, payments, subscriptions, users, webhookEvents } from "@/db/schema";

type DodoCustomer = {
	customer_id?: string;
	email?: string;
	name?: string;
	metadata?: Record<string, unknown>;
};

type DodoWebhookData = {
	customer?: DodoCustomer;
	metadata?: Record<string, unknown>;
	payment_id?: string;
	subscription_id?: string | null;
	product_id?: string;
	status?: string | null;
	total_amount?: number;
	currency?: string;
	next_billing_date?: Date | string | null;
	previous_billing_date?: Date | string | null;
	expires_at?: Date | string | null;
	cancel_at_next_billing_date?: boolean;
};

export type DodoWebhookPayload = {
	type: string;
	timestamp?: Date | string;
	data?: DodoWebhookData;
};

export type DodoWebhookContext = {
	eventId: string;
	rawBody: string;
};

const subscriptionEvents = new Set([
	"subscription.active",
	"subscription.renewed",
	"subscription.cancelled",
	"subscription.expired",
	"subscription.failed",
	"subscription.on_hold",
	"subscription.updated",
	"subscription.plan_changed",
]);

const paymentEvents = new Set([
	"payment.succeeded",
	"payment.failed",
	"payment.processing",
	"payment.cancelled",
]);

export function getDodoEventType(event: DodoWebhookPayload) {
	return event.type ?? "unknown";
}

export function mapDodoSubscriptionStatus(type: string, providerStatus?: string | null) {
	if (type === "subscription.renewed") {
		return "active";
	}

	if (type === "subscription.on_hold") {
		return "past_due";
	}

	if (type === "subscription.failed") {
		return "failed";
	}

	if (type === "subscription.expired") {
		return "expired";
	}

	if (type === "subscription.cancelled") {
		return "cancelled";
	}

	return providerStatus ?? "active";
}

function asString(value: unknown) {
	return typeof value === "string" && value.length > 0 ? value : undefined;
}

function toIsoString(value: Date | string | null | undefined) {
	if (!value) {
		return null;
	}

	const date = value instanceof Date ? value : new Date(value);

	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseJsonFallback(rawBody: string, fallback: DodoWebhookPayload) {
	try {
		return JSON.parse(rawBody) as unknown;
	} catch {
		return fallback as unknown;
	}
}

function toHex(buffer: ArrayBuffer) {
	return Array.from(new Uint8Array(buffer))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

export async function createDodoWebhookEventId(headerEventId: string | null, rawBody: string) {
	if (headerEventId) {
		return headerEventId;
	}

	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawBody));
	return `dodo:${toHex(digest)}`;
}

async function getUserIdFromPayload(data: DodoWebhookData | undefined) {
	const metadata = data?.metadata ?? data?.customer?.metadata;
	const metadataUserId = asString(metadata?.userId);

	if (metadataUserId) {
		return metadataUserId;
	}

	const stackUserId = asString(metadata?.stackUserId);

	if (!stackUserId) {
		return null;
	}

	const db = await getDbAsync();
	const [user] = await db.select().from(users).where(eq(users.stackUserId, stackUserId)).limit(1);

	return user?.id ?? null;
}

async function upsertCustomerForPayload(userId: string, data: DodoWebhookData) {
	const customerId = data.customer?.customer_id;

	if (!customerId) {
		return null;
	}

	const db = await getDbAsync();
	const now = new Date().toISOString();

	await db
		.insert(customers)
		.values({
			id: crypto.randomUUID(),
			userId,
			dodoCustomerId: customerId,
			createdAt: now,
			updatedAt: now,
		})
		.onConflictDoUpdate({
			target: customers.dodoCustomerId,
			set: {
				userId,
				updatedAt: now,
			},
		});

	const [customer] = await db
		.select()
		.from(customers)
		.where(eq(customers.dodoCustomerId, customerId))
		.limit(1);
	return customer ?? null;
}

async function handleSubscriptionEvent(payload: DodoWebhookPayload) {
	const data = payload.data;
	const userId = await getUserIdFromPayload(data);

	if (!data?.subscription_id || !data.product_id || !userId) {
		return;
	}

	const customer = await upsertCustomerForPayload(userId, data);

	if (!customer) {
		return;
	}

	const db = await getDbAsync();
	const now = new Date().toISOString();
	const planKey = asString(data.metadata?.planKey) ?? getPlanKeyByProductId(data.product_id);

	await db
		.insert(subscriptions)
		.values({
			id: crypto.randomUUID(),
			userId,
			customerId: customer.id,
			dodoSubscriptionId: data.subscription_id,
			productId: data.product_id,
			planKey,
			status: mapDodoSubscriptionStatus(payload.type, data.status),
			currentPeriodStart: toIsoString(data.previous_billing_date),
			currentPeriodEnd: toIsoString(data.next_billing_date ?? data.expires_at),
			cancelAtPeriodEnd: data.cancel_at_next_billing_date ?? false,
			createdAt: now,
			updatedAt: now,
		})
		.onConflictDoUpdate({
			target: subscriptions.dodoSubscriptionId,
			set: {
				userId,
				customerId: customer.id,
				productId: data.product_id,
				planKey,
				status: mapDodoSubscriptionStatus(payload.type, data.status),
				currentPeriodStart: toIsoString(data.previous_billing_date),
				currentPeriodEnd: toIsoString(data.next_billing_date ?? data.expires_at),
				cancelAtPeriodEnd: data.cancel_at_next_billing_date ?? false,
				updatedAt: now,
			},
		});
}

async function handlePaymentEvent(payload: DodoWebhookPayload) {
	const data = payload.data;

	if (!data?.payment_id) {
		return;
	}

	const userId = await getUserIdFromPayload(data);
	const db = await getDbAsync();

	await db
		.insert(payments)
		.values({
			id: crypto.randomUUID(),
			userId,
			dodoPaymentId: data.payment_id,
			amount: data.total_amount ?? 0,
			currency: data.currency ?? "USD",
			status: data.status ?? payload.type.replace("payment.", ""),
			rawEventJson: payload,
			createdAt: new Date().toISOString(),
		})
		.onConflictDoUpdate({
			target: payments.dodoPaymentId,
			set: {
				userId,
				amount: data.total_amount ?? 0,
				currency: data.currency ?? "USD",
				status: data.status ?? payload.type.replace("payment.", ""),
				rawEventJson: payload,
			},
		});
}

function isUniqueConstraintError(error: unknown) {
	return error instanceof Error && error.message.toLowerCase().includes("unique");
}

export async function processDodoWebhook(payload: DodoWebhookPayload, context: DodoWebhookContext) {
	const db = await getDbAsync();
	const eventType = getDodoEventType(payload);

	try {
		await db.insert(webhookEvents).values({
			id: crypto.randomUUID(),
			provider: "dodo",
			eventId: context.eventId,
			eventType,
			rawJson: parseJsonFallback(context.rawBody, payload),
			createdAt: new Date().toISOString(),
		});
	} catch (error) {
		if (isUniqueConstraintError(error)) {
			return { duplicate: true };
		}

		throw error;
	}

	if (subscriptionEvents.has(eventType)) {
		await handleSubscriptionEvent(payload);
	}

	if (paymentEvents.has(eventType)) {
		await handlePaymentEvent(payload);
	}

	await db
		.update(webhookEvents)
		.set({ processedAt: new Date().toISOString() })
		.where(eq(webhookEvents.eventId, context.eventId));

	return { duplicate: false };
}
