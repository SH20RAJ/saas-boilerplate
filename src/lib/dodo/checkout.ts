import { getPlanByKey, getPlanProductId } from "@/config/plans";

export function getCheckoutPlan(planKey: string, source: Record<string, string | undefined> = process.env) {
	const plan = getPlanByKey(planKey);

	if (!plan || plan.key === "free") {
		return null;
	}

	const productId = getPlanProductId(plan, source);

	if (!productId) {
		throw new Error(`${plan.productEnvKey} is required for checkout.`);
	}

	return {
		...plan,
		productId,
	};
}
