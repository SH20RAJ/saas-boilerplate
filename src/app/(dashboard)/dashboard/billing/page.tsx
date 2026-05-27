import { CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";

import { CheckoutButton } from "@/components/billing/checkout-button";
import { CustomerPortalButton } from "@/components/billing/customer-portal-button";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/config/plans";
import { getUserPlan, getUserSubscription } from "@/lib/billing/entitlement";
import { upsertUserFromStack } from "@/lib/billing/users";
import { requireUser } from "@/lib/stack/require-user";

export default async function BillingPage() {
	const user = await requireUser();
	const appUser = await upsertUserFromStack(user);
	const [currentPlan, subscription] = await Promise.all([
		getUserPlan(appUser.id),
		getUserSubscription(appUser.id),
	]);
	const paidPlans = plans.filter((plan) => plan.key !== "free");

	return (
		<DashboardShell>
			<main className="grid gap-6">
				<div>
					<Badge variant="outline">Billing</Badge>
					<h1 className="mt-3 font-semibold text-3xl tracking-tight">Subscription and payments</h1>
					<p className="mt-2 text-muted-foreground">
						Dodo webhooks update the database state used for access.
					</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCard className="size-5" />
							Current plan
						</CardTitle>
						<CardDescription>Plan access is read from webhook-backed database state.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-semibold text-2xl">{currentPlan?.name ?? "Free"}</p>
								<p className="text-muted-foreground text-sm">
									{subscription?.currentPeriodEnd
										? `Renews or ends on ${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
												new Date(subscription.currentPeriodEnd),
											)}`
										: "Upgrade after configuring Dodo product IDs."}
								</p>
							</div>
							<CustomerPortalButton />
						</div>
					</CardContent>
				</Card>
				<div className="grid gap-4 md:grid-cols-3">
					{paidPlans.map((plan) => (
						<Card key={plan.key}>
							<CardHeader>
								<CardTitle>{plan.name}</CardTitle>
								<CardDescription>{plan.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-3xl">{plan.price}</p>
								<ul className="mt-5 grid gap-2 text-sm">
									{plan.features.map((feature) => (
										<li className="flex gap-2" key={feature}>
											<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
											{feature}
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<CheckoutButton planKey={plan.key} />
							</CardFooter>
						</Card>
					))}
				</div>
				<Button asChild className="w-fit" variant="outline">
					<Link href="/pricing">Compare all plans</Link>
				</Button>
			</main>
		</DashboardShell>
	);
}
