import Image from "next/image";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full bg-muted", className)}
			{...props}
		/>
	);
}

type AvatarImageProps = Omit<React.ComponentProps<typeof Image>, "alt" | "fill"> & {
	alt?: string;
};

export function AvatarImage({ alt = "", className, sizes = "40px", ...props }: AvatarImageProps) {
	return (
		<Image
			alt={alt}
			className={cn("aspect-square object-cover", className)}
			fill
			sizes={sizes}
			unoptimized
			{...props}
		/>
	);
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex size-full items-center justify-center bg-muted font-medium text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
