import { TWITCH_ENDPOINT, GOOGLE_ENDPOINT } from "@/lib/constants"
import { Session } from "next-auth"

export const validateToken = async (platform: any, requestHeaders: any) => {
	const url = platform === "twitch" ? TWITCH_ENDPOINT : GOOGLE_ENDPOINT

	const response = await fetch(url, {
		headers: {
			Authorization: requestHeaders.get("Authorization"),
		},
	})

	return await response.json()
}

export async function searchStream(
	query: string,
	session: Session,
	platform: string
) {
	if (!session) return

	if (query.length === 0) return []

	const response = await fetch(`/api/search-${platform}?q=${query}`, {
		headers: {
			Authorization: `OAuth ${session?.accessToken}`,
		},
	})

	return await response.json()
}
