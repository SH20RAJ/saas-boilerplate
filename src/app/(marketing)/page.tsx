import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { appConfig } from "@/config/app";

const features = [
	"Cloudflare Workers deployment with OpenNext",
	"Stack Auth, Dodo Payments, D1, and Drizzle ready",
	"Contributor-friendly docs, CI, and tests",
];

export default function HomePage() {
	return (
		<PageShell>
			<main>
				<section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
					<div className="flex flex-col justify-center">
						<p className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-[0.18em]">
							Open-source SaaS starter
						</p>
						<h1 className="max-w-3xl font-semibold text-4xl text-foreground leading-tight sm:text-6xl">
							Build on Cloudflare Workers without giving up the SaaS basics.
						</h1>
						<p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-8">
							A clean Next.js App Router boilerplate with the pieces founders keep rewriting: auth, billing,
							database state, dashboard UI, docs, tests, and deploys.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 font-medium text-background text-sm transition hover:opacity-90"
								href={appConfig.signUpPath}
							>
								Start building
							</Link>
							<Link
								className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 font-medium text-sm transition hover:bg-muted"
								href="/pricing"
							>
								View pricing
							</Link>
						</div>
					</div>
					<div className="grid content-center gap-3">
						{features.map((feature) => (
							<div className="rounded-lg border border-border bg-card p-5 text-card-foreground" key={feature}>
								{feature}
							</div>
						))}
					</div>
				</section>
			</main>
		</PageShell>
	);
}
