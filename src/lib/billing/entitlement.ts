import { desc, eq } from "drizzle-orm";

import { getPlanByKey } from "@/config/plans";
import { getDbAsync } from "@/db/client";
import { subscriptions } from "@/db/schema";
import { isSubscriptionCurrentlyActive } from "./subscription-status";

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

	return isSubscriptionCurrentlyActive(subscription);
}

export async function getUserPlan(userId: string) {
	const subscription = await getUserSubscription(userId);

	if (!isSubscriptionCurrentlyActive(subscription)) {
		return getPlanByKey("free");
	}

	return getPlanByKey(subscription.planKey) ?? getPlanByKey("free");
}

export async function requireActivePlan(userId: string) {
	const subscription = await getUserSubscription(userId);

	if (!isSubscriptionCurrentlyActive(subscription)) {
		throw new Error("An active subscription is required.");
	}

	return subscription;
}
