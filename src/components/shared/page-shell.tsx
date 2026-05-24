import type { ReactNode } from "react";

import { SiteHeader } from "./site-header";

export function PageShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<SiteHeader />
			{children}
		</div>
	);
}
