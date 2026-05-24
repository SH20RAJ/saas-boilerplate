import Link from "next/link";

import { appConfig } from "@/config/app";
import { siteConfig } from "@/config/site";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
	return (
		<header className="border-border/80 border-b bg-background/95">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link className="font-semibold text-foreground text-sm sm:text-base" href="/">
					{siteConfig.name}
				</Link>
				<nav className="flex items-center gap-4 text-muted-foreground text-sm">
					{navItems.map((item) => (
						<Link className="transition hover:text-foreground" href={item.href} key={item.href}>
							{item.label}
						</Link>
					))}
				</nav>
				<Link
					className="hidden rounded-md bg-foreground px-3 py-2 font-medium text-background text-sm transition hover:opacity-90 sm:inline-flex"
					href={appConfig.signInPath}
				>
					Sign in
				</Link>
			</div>
		</header>
	);
}
