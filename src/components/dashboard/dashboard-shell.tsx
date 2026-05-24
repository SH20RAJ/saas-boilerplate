import { UserButton } from "@stackframe/stack";
import { BarChart3, CreditCard, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const dashboardNav = [
	{ href: "/dashboard", label: "Overview", icon: LayoutDashboard },
	{ href: "/dashboard/billing", label: "Billing", icon: CreditCard },
	{ href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="border-border border-b">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
					<Link className="flex items-center gap-2 font-semibold" href="/">
						<BarChart3 className="size-5" />
						{siteConfig.name}
					</Link>
					<UserButton />
				</div>
			</header>
			<div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
				<aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-7rem)]">
					<nav className="flex gap-2 overflow-x-auto lg:grid lg:overflow-visible">
						{dashboardNav.map((item) => {
							const Icon = item.icon;
							return (
								<Button asChild className="justify-start" key={item.href} variant="ghost">
									<Link href={item.href}>
										<Icon className="size-4" />
										{item.label}
									</Link>
								</Button>
							);
						})}
					</nav>
				</aside>
				{children}
			</div>
		</div>
	);
}
