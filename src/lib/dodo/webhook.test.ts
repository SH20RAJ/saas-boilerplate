import { describe, expect, it } from "vitest";

import { createDodoWebhookEventId, mapDodoSubscriptionStatus } from "./webhook";

describe("Dodo webhook helpers", () => {
	it("maps provider subscription events to app statuses", () => {
		expect(mapDodoSubscriptionStatus("subscription.renewed", "renewed")).toBe("active");
		expect(mapDodoSubscriptionStatus("subscription.cancelled", "active")).toBe("cancelled");
		expect(mapDodoSubscriptionStatus("subscription.failed", "failed")).toBe("failed");
		expect(mapDodoSubscriptionStatus("subscription.updated", "active")).toBe("active");
	});

	it("uses the provider webhook ID when present", async () => {
		await expect(createDodoWebhookEventId("evt_123", "{}")).resolves.toBe("evt_123");
	});

	it("falls back to a deterministic body hash when the provider ID is missing", async () => {
		const first = await createDodoWebhookEventId(null, '{"type":"payment.succeeded"}');
		const second = await createDodoWebhookEventId(null, '{"type":"payment.succeeded"}');

		expect(first).toMatch(/^dodo:[a-f0-9]{64}$/);
		expect(first).toBe(second);
	});
});
