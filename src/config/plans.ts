export type PlanKey = "free" | "pro_monthly" | "pro_yearly" | "lifetime";

export type Plan = {
	key: PlanKey;
	name: string;
	description: string;
	price: string;
	productEnvKey?: string;
	features: string[];
	limits: {
		projects: number | "unlimited";
		members: number | "unlimited";
	};
};

export const plans: Plan[] = [
	{
		key: "free",
		name: "Free",
		description: "A clean starting point for small projects.",
		price: "$0",
		features: ["Core dashboard", "Local development docs", "Community support"],
		limits: {
			projects: 1,
			members: 1,
		},
	},
	{
		key: "pro_monthly",
		name: "Pro Monthly",
		description: "Recurring billing for production SaaS teams.",
		price: "$19/mo",
		productEnvKey: "DODO_PRODUCT_ID_PRO_MONTHLY",
		features: ["Unlimited projects", "Billing portal", "Priority roadmap access"],
		limits: {
			projects: "unlimited",
			members: 5,
		},
	},
	{
		key: "pro_yearly",
		name: "Pro Yearly",
		description: "A discounted annual plan for committed customers.",
		price: "$190/yr",
		productEnvKey: "DODO_PRODUCT_ID_PRO_YEARLY",
		features: ["Everything in monthly", "Two months free", "Annual billing receipts"],
		limits: {
			projects: "unlimited",
			members: 10,
		},
	},
	{
		key: "lifetime",
		name: "Lifetime",
		description: "One payment for durable founder-friendly access.",
		price: "$299",
		productEnvKey: "DODO_PRODUCT_ID_LIFETIME",
		features: ["Lifetime entitlement", "All current Pro features", "Future minor updates"],
		limits: {
			projects: "unlimited",
			members: "unlimited",
		},
	},
];

export function getPlanByKey(key: string) {
	return plans.find((plan) => plan.key === key);
}
