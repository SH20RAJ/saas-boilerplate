import { Webhooks } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";

import { createDodoWebhookEventId, type DodoWebhookPayload, processDodoWebhook } from "@/lib/dodo/webhook";
import { getDodoPaymentsEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
	const env = getDodoPaymentsEnv();
	const rawBody = await request.clone().text();
	const eventId = await createDodoWebhookEventId(request.headers.get("webhook-id"), rawBody);

	const handler = Webhooks({
		webhookKey: env.DODO_PAYMENTS_WEBHOOK_KEY,
		onPayload: async (payload) => {
			await processDodoWebhook(payload as DodoWebhookPayload, {
				eventId,
				rawBody,
			});
		},
	});

	return handler(request);
}
