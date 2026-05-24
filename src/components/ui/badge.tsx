import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2.5 py-1 font-medium text-xs", {
	variants: {
		variant: {
			default: "bg-foreground text-background",
			secondary: "bg-muted text-foreground",
			outline: "border border-border text-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export function Badge({
	className,
	variant,
	...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
