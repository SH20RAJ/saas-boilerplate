import { stackServerApp } from "./server";

export async function requireUser() {
	return stackServerApp.getUser({ or: "redirect" });
}
