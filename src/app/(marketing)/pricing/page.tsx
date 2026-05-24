import { Check } from "lucide-react";
import Link from "next/link";

import { CheckoutButton } from "@/components/billing/checkout-button";
import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { plans } from "@/config/plans";
import { stackServerApp } from "@/lib/stack/server";

export default async function PricingPage() {
	const user = await stackServerApp.getUser();

	return (
		<PageShell>
			<main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
				<div className="max-w-2xl">
					<Badge variant="outline">Pricing</Badge>
					<h1 className="mt-4 font-semibold text-4xl tracking-tight">Simple plans, wired to real billing.</h1>
					<p className="mt-4 text-muted-foreground">
						Product IDs stay on the server. Customers choose a plan key; Dodo checkout receives the mapped
						product.
					</p>
				</div>
				<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{plans.map((plan) => (
						<Card className={plan.key === "pro_yearly" ? "border-blue-700" : undefined} key={plan.key}>
							<CardHeader>
								<div className="flex items-center justify-between gap-3">
									<CardTitle>{plan.name}</CardTitle>
									{plan.key === "pro_yearly" ? <Badge>Popular</Badge> : null}
								</div>
								<CardDescription className="min-h-10">{plan.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-3xl">{plan.price}</p>
								<ul className="mt-6 grid gap-2 text-sm">
									{plan.features.map((feature) => (
										<li className="flex gap-2" key={feature}>
											<Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								{plan.key === "free" ? (
									<Button asChild className="w-full" variant="outline">
										<Link href={appConfig.signUpPath}>Get started</Link>
									</Button>
								) : user ? (
									<CheckoutButton planKey={plan.key} />
								) : (
									<Button asChild className="w-full">
										<Link href={`${appConfig.signInPath}?plan=${plan.key}`}>Sign in to choose</Link>
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</main>
		</PageShell>
	);
}
