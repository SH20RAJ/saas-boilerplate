import { describe, expect, it } from "vitest";

import { isSubscriptionCurrentlyActive, isSubscriptionStatusActive } from "./subscription-status";

const now = new Date("2026-05-27T12:00:00.000Z");

describe("subscription status helpers", () => {
	it("recognizes active statuses", () => {
		expect(isSubscriptionStatusActive("active")).toBe(true);
		expect(isSubscriptionStatusActive("renewed")).toBe(true);
		expect(isSubscriptionStatusActive("expired")).toBe(false);
	});

	it("treats active subscriptions without an end date as active", () => {
		expect(
			isSubscriptionCurrentlyActive(
				{
					status: "active",
					currentPeriodEnd: null,
					cancelAtPeriodEnd: false,
				},
				now,
			),
		).toBe(true);
	});

	it("does not grant access after the current period ends", () => {
		expect(
			isSubscriptionCurrentlyActive(
				{
					status: "active",
					currentPeriodEnd: "2026-05-26T12:00:00.000Z",
					cancelAtPeriodEnd: false,
				},
				now,
			),
		).toBe(false);
	});

	it("allows cancelled subscriptions through their paid period", () => {
		expect(
			isSubscriptionCurrentlyActive(
				{
					status: "cancelled",
					currentPeriodEnd: "2026-06-01T12:00:00.000Z",
					cancelAtPeriodEnd: true,
				},
				now,
			),
		).toBe(true);
	});
});
