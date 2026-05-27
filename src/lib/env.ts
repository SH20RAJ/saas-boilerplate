export const publicEnvKeys = [
	"NEXT_PUBLIC_APP_URL",
	"NEXT_PUBLIC_STACK_PROJECT_ID",
	"NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY",
] as const;

export const serverEnvKeys = [
	"STACK_SECRET_SERVER_KEY",
	"DODO_PAYMENTS_API_KEY",
	"DODO_PAYMENTS_WEBHOOK_KEY",
	"DODO_PAYMENTS_RETURN_URL",
	"DODO_PAYMENTS_ENVIRONMENT",
] as const;

export const optionalEnvKeys = ["POSTHOG_KEY", "RESEND_API_KEY", "SENTRY_DSN"] as const;

export type DodoPaymentsEnvironment = "test_mode" | "live_mode";
export type EnvSource = Record<string, string | undefined>;

export class EnvValidationError extends Error {
	constructor(readonly issues: string[]) {
		super(`Invalid environment configuration: ${issues.join(", ")}`);
		this.name = "EnvValidationError";
	}
}

function readRequired(source: EnvSource, key: string, issues: string[]) {
	const value = source[key];

	if (!value) {
		issues.push(`${key} is required`);
		return "";
	}

	return value;
}

function parseDodoEnvironment(value: string, issues: string[]): DodoPaymentsEnvironment {
	if (value === "test_mode" || value === "live_mode") {
		return value;
	}

	issues.push("DODO_PAYMENTS_ENVIRONMENT must be test_mode or live_mode");
	return "test_mode";
}

function throwIfInvalid(issues: string[]) {
	if (issues.length > 0) {
		throw new EnvValidationError(issues);
	}
}

export function getPublicEnv(source: EnvSource = process.env) {
	const issues: string[] = [];
	const env = {
		NEXT_PUBLIC_APP_URL: readRequired(source, "NEXT_PUBLIC_APP_URL", issues),
		NEXT_PUBLIC_STACK_PROJECT_ID: readRequired(source, "NEXT_PUBLIC_STACK_PROJECT_ID", issues),
		NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: readRequired(
			source,
			"NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY",
			issues,
		),
	};

	throwIfInvalid(issues);
	return env;
}

export function getServerEnv(source: EnvSource = process.env) {
	const issues: string[] = [];
	const dodoEnvironment = readRequired(source, "DODO_PAYMENTS_ENVIRONMENT", issues);
	const env = {
		NEXT_PUBLIC_APP_URL: readRequired(source, "NEXT_PUBLIC_APP_URL", issues),
		NEXT_PUBLIC_STACK_PROJECT_ID: readRequired(source, "NEXT_PUBLIC_STACK_PROJECT_ID", issues),
		NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: readRequired(
			source,
			"NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY",
			issues,
		),
		STACK_SECRET_SERVER_KEY: readRequired(source, "STACK_SECRET_SERVER_KEY", issues),
		DODO_PAYMENTS_API_KEY: readRequired(source, "DODO_PAYMENTS_API_KEY", issues),
		DODO_PAYMENTS_WEBHOOK_KEY: readRequired(source, "DODO_PAYMENTS_WEBHOOK_KEY", issues),
		DODO_PAYMENTS_RETURN_URL: readRequired(source, "DODO_PAYMENTS_RETURN_URL", issues),
		DODO_PAYMENTS_ENVIRONMENT: parseDodoEnvironment(dodoEnvironment, issues),
		POSTHOG_KEY: source.POSTHOG_KEY,
		RESEND_API_KEY: source.RESEND_API_KEY,
		SENTRY_DSN: source.SENTRY_DSN,
	};

	throwIfInvalid(issues);
	return env;
}

export function getDodoPaymentsEnv(source: EnvSource = process.env) {
	const issues: string[] = [];
	const dodoEnvironment = readRequired(source, "DODO_PAYMENTS_ENVIRONMENT", issues);
	const env = {
		DODO_PAYMENTS_API_KEY: readRequired(source, "DODO_PAYMENTS_API_KEY", issues),
		DODO_PAYMENTS_WEBHOOK_KEY: readRequired(source, "DODO_PAYMENTS_WEBHOOK_KEY", issues),
		DODO_PAYMENTS_RETURN_URL: readRequired(source, "DODO_PAYMENTS_RETURN_URL", issues),
		DODO_PAYMENTS_ENVIRONMENT: parseDodoEnvironment(dodoEnvironment, issues),
	};

	throwIfInvalid(issues);
	return env;
}

export function getDodoProductIds(source: EnvSource = process.env) {
	return {
		proMonthly: source.DODO_PRODUCT_ID_PRO_MONTHLY,
		proYearly: source.DODO_PRODUCT_ID_PRO_YEARLY,
		lifetime: source.DODO_PRODUCT_ID_LIFETIME,
	};
}
