import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { appConfig } from "@/config/app";
import { plans } from "@/config/plans";

export default function PricingPage() {
	return (
		<PageShell>
			<main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
				<div className="max-w-2xl">
					<h1 className="font-semibold text-4xl tracking-tight">Simple pricing, wired for Dodo.</h1>
					<p className="mt-4 text-muted-foreground">
						Plans are configured centrally so checkout, entitlements, and marketing copy stay in sync.
					</p>
				</div>
				<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{plans.map((plan) => (
						<section
							className="rounded-lg border border-border bg-card p-5 text-card-foreground"
							key={plan.key}
						>
							<h2 className="font-semibold text-xl">{plan.name}</h2>
							<p className="mt-2 min-h-12 text-muted-foreground text-sm">{plan.description}</p>
							<p className="mt-6 font-semibold text-3xl">{plan.price}</p>
							<ul className="mt-6 space-y-2 text-sm">
								{plan.features.map((feature) => (
									<li key={feature}>{feature}</li>
								))}
							</ul>
							<Link
								className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-foreground px-4 font-medium text-background text-sm transition hover:opacity-90"
								href={plan.key === "free" ? appConfig.signUpPath : `${appConfig.signInPath}?plan=${plan.key}`}
							>
								{plan.key === "free" ? "Get started" : "Choose plan"}
							</Link>
						</section>
					))}
				</div>
			</main>
		</PageShell>
	);
}
