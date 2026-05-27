import { CustomerPortal } from "@dodopayments/nextjs";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getDbAsync } from "@/db/client";
import { customers } from "@/db/schema";
import { upsertUserFromStack } from "@/lib/billing/users";
import { getDodoPaymentsEnv } from "@/lib/env";
import { requireUser } from "@/lib/stack/require-user";

export async function GET(request: NextRequest) {
	const user = await requireUser();
	const appUser = await upsertUserFromStack(user);
	const db = await getDbAsync();
	const [customer] = await db.select().from(customers).where(eq(customers.userId, appUser.id)).limit(1);

	if (!customer?.dodoCustomerId) {
		return NextResponse.json({ error: "No Dodo customer exists for this account yet." }, { status: 404 });
	}

	const env = getDodoPaymentsEnv();
	const handler = CustomerPortal({
		bearerToken: env.DODO_PAYMENTS_API_KEY,
		environment: env.DODO_PAYMENTS_ENVIRONMENT,
	});
	const portalUrl = new URL(request.url);
	portalUrl.searchParams.set("customer_id", customer.dodoCustomerId);

	const response = await handler(new Request(portalUrl, { method: "GET" }) as NextRequest);
	const location = response.headers.get("location");

	if (!location) {
		return NextResponse.json({ error: "Unable to create a customer portal session." }, { status: 502 });
	}

	return NextResponse.json({ portalUrl: location });
}
