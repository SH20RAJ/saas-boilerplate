import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";
import { appConfig } from "@/config/app";
import { requireUser } from "@/lib/stack/require-user";

export default async function SettingsPage() {
	const user = await requireUser();

	return (
		<PageShell>
			<main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
				<h1 className="font-semibold text-3xl tracking-tight">Settings</h1>
				<p className="mt-3 text-muted-foreground">
					Signed in as {user.primaryEmail ?? user.displayName ?? user.id}.
				</p>
				<Link
					className="mt-8 inline-flex h-10 items-center rounded-md bg-foreground px-4 font-medium text-background text-sm"
					href={appConfig.accountSettingsPath}
				>
					Open account settings
				</Link>
			</main>
		</PageShell>
	);
}
