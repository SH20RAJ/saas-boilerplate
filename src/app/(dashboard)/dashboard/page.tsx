import { UserButton } from "@stackframe/stack";
import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { requireUser } from "@/lib/stack/require-user";

export default async function DashboardPage() {
	const user = await requireUser();
	const displayName = user.displayName ?? user.primaryEmail ?? "SaaS builder";

	return (
		<PageShell>
			<main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.18em]">Dashboard</p>
						<h1 className="mt-2 font-semibold text-3xl tracking-tight">Welcome, {displayName}</h1>
					</div>
					<div className="flex items-center gap-3">
						<Link className="rounded-md border border-border px-4 py-2 text-sm" href="/dashboard/billing">
							Billing
						</Link>
						<Link className="rounded-md border border-border px-4 py-2 text-sm" href="/dashboard/settings">
							Settings
						</Link>
						<UserButton />
					</div>
				</div>
				<section className="mt-8 rounded-lg border border-border bg-card p-5 text-card-foreground">
					<h2 className="font-medium">Signed-in user</h2>
					<dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
						<div>
							<dt className="text-muted-foreground">ID</dt>
							<dd className="mt-1 break-all">{user.id}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Email</dt>
							<dd className="mt-1">{user.primaryEmail ?? "No email"}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Name</dt>
							<dd className="mt-1">{user.displayName ?? "No display name"}</dd>
						</div>
					</dl>
				</section>
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
