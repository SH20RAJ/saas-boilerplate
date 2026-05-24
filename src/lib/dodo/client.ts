export type DodoEnvironment = "test_mode" | "live_mode";

export function getDodoEnvironment(value: string | undefined): DodoEnvironment {
	return value === "live_mode" ? "live_mode" : "test_mode";
}
