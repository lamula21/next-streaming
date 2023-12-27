import { TWITCH_ENDPOINT, GOOGLE_ENDPOINT } from "@/lib/constants"

export const validateToken = async (platform: any, requestHeaders: any) => {
	const url = platform === "twitch" ? TWITCH_ENDPOINT : GOOGLE_ENDPOINT

	const response = await fetch(url, {
		headers: {
			Authorization: requestHeaders.get("Authorization"),
		},
	})

	return await response.json()
}
