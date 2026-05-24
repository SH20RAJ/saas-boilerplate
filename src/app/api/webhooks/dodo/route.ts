import { Webhooks } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";

import { type DodoWebhookPayload, processDodoWebhook } from "@/lib/dodo/webhook";
import { getDodoPaymentsEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
	const env = getDodoPaymentsEnv();
	const eventId = request.headers.get("webhook-id") ?? "";
	const rawBody = await request.clone().text();

	const handler = Webhooks({
		webhookKey: env.DODO_PAYMENTS_WEBHOOK_KEY,
		onPayload: async (payload) => {
			await processDodoWebhook(payload as DodoWebhookPayload, {
				eventId: eventId || `${payload.type}:${payload.timestamp.toISOString()}`,
				rawBody,
			});
		},
	});

	return handler(request);
}
