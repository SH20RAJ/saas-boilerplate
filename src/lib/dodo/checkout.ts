import { getPlanByKey } from "@/config/plans";

export function getCheckoutPlan(planKey: string) {
	const plan = getPlanByKey(planKey);

	if (!plan || plan.key === "free") {
		return null;
	}

	return plan;
}
