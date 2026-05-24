"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { PlanKey } from "@/config/plans";

export function CheckoutButton({ planKey }: { planKey: PlanKey }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function startCheckout() {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ planKey }),
			});
			const payload = (await response.json().catch(() => null)) as {
				checkout_url?: string;
				error?: string;
			} | null;

			if (!response.ok || !payload?.checkout_url) {
				throw new Error(payload?.error ?? "Unable to start checkout.");
			}

			window.location.assign(payload.checkout_url);
		} catch (checkoutError) {
			setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="grid w-full gap-2">
			<Button className="w-full" disabled={isLoading} onClick={startCheckout} type="button">
				{isLoading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
				Choose plan
			</Button>
			{error ? <p className="text-red-600 text-sm">{error}</p> : null}
		</div>
	);
}
