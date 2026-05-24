import { Code2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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
				<div className="hidden items-center gap-2 sm:flex">
					<Button asChild size="icon" variant="ghost">
						<a aria-label="GitHub repository" href={siteConfig.links.github} rel="noreferrer" target="_blank">
							<Code2 className="size-4" />
						</a>
					</Button>
					<Button asChild size="sm">
						<Link href={appConfig.signInPath}>Sign in</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
