import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		home: "/",
		handler: "/handler",
		afterSignIn: "/dashboard",
		afterSignUp: "/dashboard",
		afterSignOut: "/",
	},
});

export async function getCurrentUser() {
	return stackServerApp.getUser();
}
