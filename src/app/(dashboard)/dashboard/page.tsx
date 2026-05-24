import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";

export default function DashboardPage() {
	return (
		<PageShell>
			<main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.18em]">Dashboard</p>
						<h1 className="mt-2 font-semibold text-3xl tracking-tight">Your SaaS control room</h1>
					</div>
					<div className="flex gap-3">
						<Link className="rounded-md border border-border px-4 py-2 text-sm" href="/dashboard/billing">
							Billing
						</Link>
						<Link className="rounded-md border border-border px-4 py-2 text-sm" href="/dashboard/settings">
							Settings
						</Link>
					</div>
				</div>
				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{["Subscription", "Usage", "Next steps"].map((label) => (
						<section className="rounded-lg border border-border bg-card p-5 text-card-foreground" key={label}>
							<h2 className="font-medium">{label}</h2>
							<p className="mt-2 text-muted-foreground text-sm">
								This panel is ready for auth, billing, and product-specific data.
							</p>
						</section>
					))}
				</div>
			</main>
		</PageShell>
	);
}
