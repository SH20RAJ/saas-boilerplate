import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";

import * as schema from "./schema";

export const getDb = cache(() => {
	const { env } = getCloudflareContext();

	if (!env.DB) {
		throw new Error("Cloudflare D1 binding DB is not configured.");
	}

	return drizzle(env.DB, { schema });
});

export const getDbAsync = cache(async () => {
	const { env } = await getCloudflareContext({ async: true });

	if (!env.DB) {
		throw new Error("Cloudflare D1 binding DB is not configured.");
	}

	return drizzle(env.DB, { schema });
});

export type Db = ReturnType<typeof getDb>;
