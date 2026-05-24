export type DodoWebhookEvent = {
	id?: string;
	type?: string;
	data?: unknown;
};

export function getDodoEventType(event: DodoWebhookEvent) {
	return event.type ?? "unknown";
}
