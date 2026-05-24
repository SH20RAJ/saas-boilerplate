import { eq } from "drizzle-orm";

import { getDbAsync } from "@/db/client";
import { users } from "@/db/schema";

type StackUserProfile = {
	id: string;
	primaryEmail?: string | null;
	displayName?: string | null;
	profileImageUrl?: string | null;
};

export async function upsertUserFromStack(user: StackUserProfile) {
	const db = await getDbAsync();
	const now = new Date().toISOString();

	await db
		.insert(users)
		.values({
			id: crypto.randomUUID(),
			stackUserId: user.id,
			email: user.primaryEmail ?? "",
			name: user.displayName,
			image: user.profileImageUrl,
			createdAt: now,
			updatedAt: now,
		})
		.onConflictDoUpdate({
			target: users.stackUserId,
			set: {
				email: user.primaryEmail ?? "",
				name: user.displayName,
				image: user.profileImageUrl,
				updatedAt: now,
			},
		});

	const [record] = await db.select().from(users).where(eq(users.stackUserId, user.id)).limit(1);

	if (!record) {
		throw new Error("Unable to create application user profile.");
	}

	return record;
}
