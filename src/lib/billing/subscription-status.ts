export type SubscriptionState = {
	status: string;
	currentPeriodEnd: string | null;
	cancelAtPeriodEnd: boolean;
};

const activeSubscriptionStatuses = new Set(["active", "renewed"]);

function parseDate(value: string | null) {
	if (!value) {
		return null;
	}

	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

export function isSubscriptionStatusActive(status: string) {
	return activeSubscriptionStatuses.has(status);
}

export function isSubscriptionCurrentlyActive(subscription: SubscriptionState | null, now = new Date()) {
	if (!subscription) {
		return false;
	}

	const periodEnd = parseDate(subscription.currentPeriodEnd);

	if (periodEnd && periodEnd <= now) {
		return false;
	}

	if (isSubscriptionStatusActive(subscription.status)) {
		return true;
	}

	return subscription.status === "cancelled" && subscription.cancelAtPeriodEnd && Boolean(periodEnd);
}
