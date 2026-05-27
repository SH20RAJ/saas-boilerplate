import { expect, test } from "@playwright/test";

test("landing page loads the refreshed SaaS hero", async ({ page }) => {
	await page.goto("/");

	await expect(page.getByRole("heading", { name: "SaaS Boilerplate" })).toBeVisible();
	await expect(page.getByRole("link", { name: /Start building/ })).toBeVisible();
	await expect(page.getByText("Workers-first deployment")).toBeVisible();
});

test("pricing page loads the billing plans", async ({ page }) => {
	await page.goto("/pricing");

	await expect(page.getByRole("heading", { name: /Simple plans/ })).toBeVisible();
	await expect(page.getByText("Pro Yearly")).toBeVisible();
	await expect(page.getByText("$190/yr")).toBeVisible();
});
