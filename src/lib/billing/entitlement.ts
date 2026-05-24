export type BillingStatus = "free" | "active" | "inactive";

export function hasActiveSubscription(status: BillingStatus | null | undefined) {
	return status === "active";
}
