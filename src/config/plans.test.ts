import { describe, expect, it } from "vitest";

import { getPlanByKey, getPlanKeyByProductId, getPlanProductId, plans } from "./plans";

describe("plan configuration", () => {
	it("includes a free plan and paid Dodo-backed plans", () => {
		expect(getPlanByKey("free")?.price).toBe("$0");
		expect(plans.filter((plan) => plan.productEnvKey)).toHaveLength(3);
	});

	it("maps plans to configured Dodo product IDs", () => {
		const source = {
			DODO_PRODUCT_ID_PRO_MONTHLY: "pdt_monthly",
			DODO_PRODUCT_ID_PRO_YEARLY: "pdt_yearly",
			DODO_PRODUCT_ID_LIFETIME: "pdt_lifetime",
		};

		const monthly = getPlanByKey("pro_monthly");

		expect(monthly ? getPlanProductId(monthly, source) : null).toBe("pdt_monthly");
		expect(getPlanKeyByProductId("pdt_yearly", source)).toBe("pro_yearly");
		expect(getPlanKeyByProductId("missing", source)).toBe("free");
	});
});
