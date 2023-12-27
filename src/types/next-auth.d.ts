import NextAuth from "next-auth"

// Fixes error in Login.tsx `session.provider`
declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			name: string
			email: string
			image: string
		}
		expires: string
		name: string
		email: string
		picture: string
		sub: string
		id: string
		accessToken: string
		provider: string
		iat: number
		exp: number
		jti: string
	}
}
