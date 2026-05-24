import { UserButton } from "@stackframe/stack";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { requireUser } from "@/lib/stack/require-user";

export default async function SettingsPage() {
	const user = await requireUser();
	const initials = (user.displayName ?? user.primaryEmail ?? "U").slice(0, 2).toUpperCase();

	return (
		<DashboardShell>
			<main className="grid gap-6">
				<div>
					<Badge variant="outline">Settings</Badge>
					<h1 className="mt-3 font-semibold text-3xl tracking-tight">Account settings</h1>
					<p className="mt-2 text-muted-foreground">
						Stack Auth owns account security and profile management.
					</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						<CardDescription>Basic identity data exposed safely from the authenticated user.</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-4">
							<Avatar>
								{user.profileImageUrl ? <AvatarImage alt="" src={user.profileImageUrl} /> : null}
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-medium">{user.displayName ?? "Unnamed user"}</p>
								<p className="text-muted-foreground text-sm">{user.primaryEmail ?? user.id}</p>
							</div>
						</div>
						<UserButton showUserInfo />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShieldCheck className="size-5 text-emerald-600" />
							Security
						</CardTitle>
						<CardDescription>Use Stack Auth for password, OAuth, MFA, and session settings.</CardDescription>
					</CardHeader>
					<CardContent>
						<Button asChild>
							<Link href={appConfig.accountSettingsPath}>
								Open Stack settings
								<ExternalLink className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			</main>
		</DashboardShell>
	);
}
