import NextAuth from "next-auth/next"
import TwitchProvider from "next-auth/providers/twitch"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET as string,
	providers: [
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID!,
			clientSecret: process.env.TWITCH_CLIENT_SECRET!,
			authorization: {
				params: { scope: "openid user:read:email user:read:follows" },
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					scope:
						"openid email profile https://www.googleapis.com/auth/youtube.readonly",
				},
			},
		}),
	],

	callbacks: {
		async session({ session, token }) {
			return { ...session, ...token }
		},

		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id
			}

			if (account) {
				token.accessToken = account.access_token
				token.provider = account.provider
			}

			return token
		},

		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url
			return baseUrl
		},
	},
})

export { handler as GET, handler as POST }
