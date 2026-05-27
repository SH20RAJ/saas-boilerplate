import { Activity, ArrowUpRight, CreditCard, UserRound } from "lucide-react";
import Link from "next/link";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserPlan, getUserSubscription } from "@/lib/billing/entitlement";
import { upsertUserFromStack } from "@/lib/billing/users";
import { requireUser } from "@/lib/stack/require-user";

const quickActions = [
	{ href: "/pricing", label: "Upgrade plan", icon: ArrowUpRight },
	{ href: "/dashboard/billing", label: "Manage billing", icon: CreditCard },
	{ href: "/dashboard/settings", label: "Account settings", icon: UserRound },
];

export default async function DashboardPage() {
	const user = await requireUser();
	const appUser = await upsertUserFromStack(user);
	const [plan, subscription] = await Promise.all([getUserPlan(appUser.id), getUserSubscription(appUser.id)]);
	const displayName = user.displayName ?? user.primaryEmail ?? "SaaS builder";

	return (
		<DashboardShell>
			<main className="grid gap-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<Badge variant="outline">Dashboard</Badge>
						<h1 className="mt-3 font-semibold text-3xl tracking-tight">Welcome, {displayName}</h1>
						<p className="mt-2 text-muted-foreground">
							Your app shell is ready for product-specific workflows.
						</p>
					</div>
					<Button asChild>
						<Link href="/pricing">
							View plans
							<ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Subscription</CardTitle>
							<CardDescription>Webhook-backed billing status</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="font-semibold text-2xl">{plan?.name ?? "Free"}</p>
							<p className="mt-2 text-muted-foreground text-sm">
								{subscription?.status
									? `Status: ${subscription.status}`
									: "Upgrade to unlock paid-plan behavior."}
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Identity</CardTitle>
							<CardDescription>Stack Auth user</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-2 text-sm">
							<p className="break-all">{user.id}</p>
							<p className="text-muted-foreground">{user.primaryEmail ?? "No primary email"}</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Activity</CardTitle>
							<CardDescription>Ready for app events</CardDescription>
						</CardHeader>
						<CardContent className="flex items-center gap-3">
							<Activity className="size-5 text-emerald-600" />
							<span className="text-sm">No product events yet</span>
						</CardContent>
					</Card>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Quick actions</CardTitle>
						<CardDescription>Common links for the starter app.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-3 sm:grid-cols-3">
						{quickActions.map((action) => {
							const Icon = action.icon;
							return (
								<Button asChild className="justify-start" key={action.href} variant="outline">
									<Link href={action.href}>
										<Icon className="size-4" />
										{action.label}
									</Link>
								</Button>
							);
						})}
					</CardContent>
				</Card>
			</main>
		</DashboardShell>
	);
}
