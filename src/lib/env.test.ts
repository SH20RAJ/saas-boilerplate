import { describe, expect, it } from "vitest";

import { EnvValidationError, getDodoPaymentsEnv, getPublicEnv, getServerEnv } from "./env";

const validEnv = {
	NEXT_PUBLIC_APP_URL: "http://localhost:3000",
	NEXT_PUBLIC_STACK_PROJECT_ID: "00000000-0000-4000-8000-000000000000",
	NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: "stack_publishable_client_key",
	STACK_SECRET_SERVER_KEY: "stack_secret_server_key",
	DODO_PAYMENTS_API_KEY: "dodo_api_key",
	DODO_PAYMENTS_WEBHOOK_KEY: "dodo_webhook_key",
	DODO_PAYMENTS_RETURN_URL: "http://localhost:3000/dashboard/billing",
	DODO_PAYMENTS_ENVIRONMENT: "test_mode",
};

describe("environment validation", () => {
	it("returns typed public environment values", () => {
		expect(getPublicEnv(validEnv)).toEqual({
			NEXT_PUBLIC_APP_URL: validEnv.NEXT_PUBLIC_APP_URL,
			NEXT_PUBLIC_STACK_PROJECT_ID: validEnv.NEXT_PUBLIC_STACK_PROJECT_ID,
			NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: validEnv.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
		});
	});

	it("returns typed server environment values", () => {
		expect(getServerEnv(validEnv).DODO_PAYMENTS_ENVIRONMENT).toBe("test_mode");
	});

	it("rejects invalid Dodo environments", () => {
		expect(() =>
			getDodoPaymentsEnv({
				...validEnv,
				DODO_PAYMENTS_ENVIRONMENT: "sandbox",
			}),
		).toThrow(EnvValidationError);
	});

	it("reports all missing required values", () => {
		try {
			getServerEnv({});
			throw new Error("Expected validation to fail");
		} catch (error) {
			expect(error).toBeInstanceOf(EnvValidationError);
			expect((error as EnvValidationError).issues).toContain("NEXT_PUBLIC_APP_URL is required");
			expect((error as EnvValidationError).issues).toContain("DODO_PAYMENTS_API_KEY is required");
		}
	});
});
