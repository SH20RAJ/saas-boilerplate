"use client";

import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CustomerPortalButton() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function openPortal() {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/customer-portal");
			const payload = (await response.json().catch(() => null)) as {
				error?: string;
				portalUrl?: string;
			} | null;

			if (!response.ok) {
				throw new Error(payload?.error ?? "Unable to open customer portal.");
			}

			if (!payload?.portalUrl) {
				throw new Error("Unable to open customer portal.");
			}

			window.location.assign(payload.portalUrl);
		} catch (portalError) {
			setError(portalError instanceof Error ? portalError.message : "Unable to open customer portal.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="grid gap-2">
			<Button disabled={isLoading} onClick={openPortal} type="button" variant="outline">
				{isLoading ? <Loader2 className="size-4 animate-spin" /> : <ExternalLink className="size-4" />}
				Manage subscription
			</Button>
			{error ? <p className="text-red-600 text-sm">{error}</p> : null}
		</div>
	);
}
