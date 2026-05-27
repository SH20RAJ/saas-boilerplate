import {
	ArrowRight,
	CheckCircle2,
	Cloud,
	Code2,
	CreditCard,
	Database,
	GitBranch,
	LockKeyhole,
	ShieldCheck,
	Sparkles,
	Terminal,
	Webhook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { siteConfig } from "@/config/site";

const workflowCommands = ["bun install", "bun run validate", "bun run preview", "bun run deploy"];

const features = [
	{
		icon: Cloud,
		title: "Workers-first deployment",
		copy: "OpenNext output, Wrangler scripts, generated bindings, and D1 defaults are wired for Cloudflare Workers.",
	},
	{
		icon: LockKeyhole,
		title: "Stack Auth App Router flow",
		copy: "Handler routes, protected dashboard pages, account settings, and server helpers are already in place.",
	},
	{
		icon: CreditCard,
		title: "Dodo billing state",
		copy: "Checkout, customer portal, webhook verification, payment records, and subscription mirrors are separated cleanly.",
	},
	{
		icon: Database,
		title: "Drizzle on D1",
		copy: "A small SaaS schema tracks users, customers, subscriptions, payments, and webhook idempotency.",
	},
];

const outcomes = [
	{ label: "Auth", value: "Stack" },
	{ label: "Billing", value: "Dodo" },
	{ label: "Data", value: "D1" },
	{ label: "Runtime", value: "Workers" },
];

const stack = [
	"Next.js App Router",
	"TypeScript",
	"Bun",
	"Cloudflare Workers",
	"OpenNext",
	"Drizzle",
	"Tailwind",
	"Biome",
	"Vitest",
	"Playwright",
];

export default function HomePage() {
	return (
		<PageShell>
			<main>
				<section className="relative isolate min-h-[76svh] overflow-hidden bg-neutral-950 text-white">
					<Image
						alt=""
						className="absolute inset-0 -z-20 size-full object-cover object-center"
						fill
						priority
						src="/images/landing-hero.png"
					/>
					<div className="absolute inset-0 -z-10 bg-black/60" />
					<div className="mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
						<Badge className="w-fit border-white/25 bg-white/10 text-white" variant="outline">
							Open-source SaaS starter
						</Badge>
						<h1 className="mt-5 max-w-3xl font-semibold text-5xl leading-tight sm:text-7xl">
							SaaS Boilerplate
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-white/80 leading-8">
							A production-minded Next.js starter for founders who want Cloudflare Workers, auth, billing,
							database state, tests, and contributor docs without paying for a black-box template.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Button asChild className="bg-white text-neutral-950 hover:bg-white/90" size="lg">
								<Link href={appConfig.signUpPath}>
									Start building
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button
								asChild
								className="border-white/30 bg-white/10 text-white hover:bg-white/20"
								size="lg"
								variant="outline"
							>
								<a href={siteConfig.links.github} rel="noreferrer" target="_blank">
									<Code2 className="size-4" />
									View source
								</a>
							</Button>
						</div>
						<div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-4">
							{outcomes.map((outcome) => (
								<div className="border-white/20 border-t pt-3" key={outcome.label}>
									<p className="text-white/60 text-xs uppercase">{outcome.label}</p>
									<p className="mt-1 font-medium text-sm text-white">{outcome.value}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="border-border border-b bg-background">
					<div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
						<div>
							<Badge variant="secondary">Working path</Badge>
							<h2 className="mt-3 font-semibold text-2xl tracking-tight">
								From clone to deploy, the happy path stays short.
							</h2>
						</div>
						<div className="grid gap-2 sm:grid-cols-2">
							{workflowCommands.map((command) => (
								<div
									className="flex min-h-12 items-center gap-3 rounded-md border border-border bg-muted/55 px-3 font-mono text-sm"
									key={command}
								>
									<CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
									<span className="truncate">{command}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="bg-muted/35">
					<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
						<div className="max-w-2xl">
							<Badge variant="outline">Included architecture</Badge>
							<h2 className="mt-4 font-semibold text-3xl tracking-tight">
								Small modules, real SaaS primitives, readable defaults.
							</h2>
						</div>
						<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							{features.map((feature) => {
								const Icon = feature.icon;
								return (
									<Card key={feature.title}>
										<CardHeader>
											<div className="flex size-10 items-center justify-center rounded-md bg-background text-foreground">
												<Icon className="size-5" />
											</div>
											<CardTitle className="text-lg">{feature.title}</CardTitle>
											<CardDescription>{feature.copy}</CardDescription>
										</CardHeader>
									</Card>
								);
							})}
						</div>
					</div>
				</section>

				<section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
					<div>
						<Badge variant="secondary">Contributor ready</Badge>
						<h2 className="mt-4 font-semibold text-3xl tracking-tight">
							The boring parts are visible, testable, and replaceable.
						</h2>
						<p className="mt-4 text-muted-foreground leading-7">
							No hidden platform assumptions: environment validation, webhook idempotency, database
							migrations, docs, CI, and route handlers are all regular source files.
						</p>
						<Button asChild className="mt-6" variant="outline">
							<Link href="/pricing">
								Compare plans
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						{[
							{
								icon: Terminal,
								title: "Bun scripts",
								copy: "One command validates format, lint, types, and tests.",
							},
							{
								icon: Webhook,
								title: "Webhook mirror",
								copy: "Billing access comes from verified server events.",
							},
							{
								icon: ShieldCheck,
								title: "Security posture",
								copy: "Protected routes, safe errors, and baseline headers.",
							},
							{
								icon: GitBranch,
								title: "Open-source flow",
								copy: "Templates, docs, license, and dependency updates included.",
							},
						].map((item) => {
							const Icon = item.icon;
							return (
								<div className="rounded-lg border border-border bg-background p-5" key={item.title}>
									<Icon className="size-5 text-emerald-700" />
									<h3 className="mt-4 font-semibold">{item.title}</h3>
									<p className="mt-2 text-muted-foreground text-sm leading-6">{item.copy}</p>
								</div>
							);
						})}
					</div>
				</section>

				<section className="border-border border-t bg-neutral-950 text-white">
					<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<div className="flex items-center gap-2 text-emerald-300 text-sm">
									<Sparkles className="size-4" />
									Built to be forked, audited, and shipped.
								</div>
								<h2 className="mt-3 font-semibold text-3xl tracking-tight">
									A serious baseline for your next SaaS.
								</h2>
							</div>
							<div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
								{stack.map((item) => (
									<Badge className="bg-white/10 text-white" key={item} variant="secondary">
										{item}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</PageShell>
	);
}
