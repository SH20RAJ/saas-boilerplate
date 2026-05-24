import { redirect } from "next/navigation";

import { appConfig } from "@/config/app";

export async function requireUser() {
	const user = await import("./server").then((module) => module.getCurrentUser());

	if (!user) {
		redirect(appConfig.signInPath);
	}

	return user;
}
