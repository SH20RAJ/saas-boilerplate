import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "list",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chromium",
			use: { ...devices["Pixel 5"] },
		},
	],
	webServer: {
		command: `bun run dev --hostname 127.0.0.1 --port ${port}`,
		env: {
			...process.env,
			NEXT_PUBLIC_APP_URL: baseURL,
			NEXT_PUBLIC_STACK_PROJECT_ID:
				process.env.NEXT_PUBLIC_STACK_PROJECT_ID ?? "00000000-0000-4000-8000-000000000000",
			NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY:
				process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ?? "stack_publishable_client_key",
			STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY ?? "stack_secret_server_key",
			DODO_PAYMENTS_API_KEY: process.env.DODO_PAYMENTS_API_KEY ?? "dodo_api_key",
			DODO_PAYMENTS_WEBHOOK_KEY: process.env.DODO_PAYMENTS_WEBHOOK_KEY ?? "dodo_webhook_key",
			DODO_PAYMENTS_RETURN_URL: process.env.DODO_PAYMENTS_RETURN_URL ?? `${baseURL}/dashboard/billing`,
			DODO_PAYMENTS_ENVIRONMENT: process.env.DODO_PAYMENTS_ENVIRONMENT ?? "test_mode",
		},
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		url: baseURL,
	},
});
