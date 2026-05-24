import { desc, eq } from "drizzle-orm";

import { getPlanByKey } from "@/config/plans";
import { getDbAsync } from "@/db/client";
import { subscriptions } from "@/db/schema";

const activeSubscriptionStatuses = new Set(["active", "renewed"]);

export async function getUserSubscription(userId: string) {
	const db = await getDbAsync();
	const [subscription] = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.userId, userId))
		.orderBy(desc(subscriptions.updatedAt))
		.limit(1);

	return subscription ?? null;
}

export async function hasActiveSubscription(userId: string) {
	const subscription = await getUserSubscription(userId);

	if (!subscription) {
		return false;
	}

	return activeSubscriptionStatuses.has(subscription.status);
}

export async function getUserPlan(userId: string) {
	const subscription = await getUserSubscription(userId);

	if (!subscription || !activeSubscriptionStatuses.has(subscription.status)) {
		return getPlanByKey("free");
	}

	return getPlanByKey(subscription.planKey) ?? getPlanByKey("free");
}

export async function requireActivePlan(userId: string) {
	const subscription = await getUserSubscription(userId);

	if (!subscription || !activeSubscriptionStatuses.has(subscription.status)) {
		throw new Error("An active subscription is required.");
	}

	return subscription;
}
