import { ArrowRight, CheckCircle2, Cloud, Code2, Database, ShieldCheck, WalletCards } from "lucide-react";
import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { siteConfig } from "@/config/site";

const features = [
	{
		icon: Cloud,
		title: "Workers native",
		copy: "OpenNext output, Wrangler scripts, D1 bindings, and Bun-first local flow.",
	},
	{
		icon: ShieldCheck,
		title: "Auth included",
		copy: "Stack Auth handler routes, protected dashboard pages, and account settings.",
	},
	{
		icon: WalletCards,
		title: "Dodo billing",
		copy: "Checkout, customer portal, verified webhooks, and subscription mirrors.",
	},
	{
		icon: Database,
		title: "D1 app state",
		copy: "Drizzle schema for users, customers, subscriptions, payments, and webhooks.",
	},
];

const stack = [
	"Next.js App Router",
	"TypeScript",
	"Bun",
	"Cloudflare Workers",
	"D1",
	"Drizzle",
	"Stack Auth",
	"Dodo",
];

export default function HomePage() {
	return (
		<PageShell>
			<main>
				<section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.08fr_0.92fr] lg:content-center">
					<div className="flex flex-col justify-center">
						<Badge className="w-fit" variant="outline">
							Open-source SaaS starter
						</Badge>
						<h1 className="mt-5 max-w-3xl font-semibold text-4xl text-foreground leading-tight sm:text-6xl">
							Build on Cloudflare Workers without rebuilding the SaaS basics.
						</h1>
						<p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-8">
							A clean App Router boilerplate with authentication, payments, database state, dashboard UI,
							testing, CI, and contributor docs wired into a single understandable codebase.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Button asChild size="lg">
								<Link href={appConfig.signUpPath}>
									Start building
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<a href={siteConfig.links.github} rel="noreferrer" target="_blank">
									<Code2 className="size-4" />
									View source
								</a>
							</Button>
						</div>
					</div>
					<Card className="self-center overflow-hidden">
						<CardHeader className="border-border border-b">
							<CardTitle>Production path</CardTitle>
							<CardDescription>Everything points at Workers, not a Node server fallback.</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-3 pt-5">
							{["bun install", "bun run validate", "bun run preview", "bun run deploy"].map((command) => (
								<div
									className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 font-mono text-sm"
									key={command}
								>
									<CheckCircle2 className="size-4 text-emerald-600" />
									{command}
								</div>
							))}
						</CardContent>
					</Card>
				</section>
				<section className="border-border border-t bg-muted/45">
					<div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
						{features.map((feature) => {
							const Icon = feature.icon;
							return (
								<Card key={feature.title}>
									<CardHeader>
										<Icon className="size-5 text-blue-700" />
										<CardTitle className="text-lg">{feature.title}</CardTitle>
										<CardDescription>{feature.copy}</CardDescription>
									</CardHeader>
								</Card>
							);
						})}
					</div>
				</section>
				<section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
					<h2 className="font-semibold text-2xl tracking-tight">Stack</h2>
					<div className="mt-5 flex flex-wrap gap-2">
						{stack.map((item) => (
							<Badge key={item} variant="secondary">
								{item}
							</Badge>
						))}
					</div>
				</section>
			</main>
		</PageShell>
	);
}
