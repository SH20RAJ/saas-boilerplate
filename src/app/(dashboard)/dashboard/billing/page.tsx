import { PageShell } from "@/components/shared/page-shell";
import { plans } from "@/config/plans";
import { requireUser } from "@/lib/stack/require-user";

export default async function BillingPage() {
	await requireUser();

	return (
		<PageShell>
			<main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
				<h1 className="font-semibold text-3xl tracking-tight">Billing</h1>
				<p className="mt-3 text-muted-foreground">Manage subscriptions through Dodo Payments.</p>
				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					{plans
						.filter((plan) => plan.key !== "free")
						.map((plan) => (
							<section className="rounded-lg border border-border bg-card p-5" key={plan.key}>
								<h2 className="font-semibold">{plan.name}</h2>
								<p className="mt-2 text-muted-foreground text-sm">{plan.description}</p>
								<p className="mt-4 font-semibold text-2xl">{plan.price}</p>
							</section>
						))}
				</div>
			</main>
		</PageShell>
	);
}
