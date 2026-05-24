import { Checkout } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { upsertUserFromStack } from "@/lib/billing/users";
import { getCheckoutPlan } from "@/lib/dodo/checkout";
import { getDodoPaymentsEnv } from "@/lib/env";
import { requireUser } from "@/lib/stack/require-user";

const checkoutRequestSchema = z.object({
	planKey: z.string().min(1),
});

export async function POST(request: NextRequest) {
	const user = await requireUser();
	const parseResult = checkoutRequestSchema.safeParse(await request.json().catch(() => null));

	if (!parseResult.success) {
		return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
	}

	const env = getDodoPaymentsEnv();
	const plan = getCheckoutPlan(parseResult.data.planKey);

	if (!plan) {
		return NextResponse.json({ error: "This plan does not require checkout." }, { status: 400 });
	}

	const appUser = await upsertUserFromStack(user);
	const handler = Checkout({
		bearerToken: env.DODO_PAYMENTS_API_KEY,
		returnUrl: env.DODO_PAYMENTS_RETURN_URL,
		environment: env.DODO_PAYMENTS_ENVIRONMENT,
		type: "session",
	});
	const checkoutRequest = new Request(request.url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			product_cart: [
				{
					product_id: plan.productId,
					quantity: 1,
				},
			],
			customer: user.primaryEmail
				? {
						email: user.primaryEmail,
						name: user.displayName ?? undefined,
					}
				: undefined,
			return_url: `${env.DODO_PAYMENTS_RETURN_URL}?success=true&plan=${plan.key}`,
			metadata: {
				userId: appUser.id,
				stackUserId: user.id,
				planKey: plan.key,
			},
		}),
	});

	return handler(checkoutRequest as NextRequest);
}
