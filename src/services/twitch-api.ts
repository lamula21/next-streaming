import {
	TWITCH_CHANNEL_ENDPOINT,
	TWITCH_GET_FOLLOW_ENDPOINT,
	TWITCH_LIVE_STREAM_ENDPOINT,
} from "@/lib/constants"
import { Session } from "next-auth"

/**
 * Fetches on the server the token validation from the Twitch API
 * @param loginSession The session to validate
 * @returns The response from the Twitch API
 * @see https://dev.twitch.tv/docs/authentication#validating-requests
 */
export async function fetchTokenValidation(loginSession: Session) {
	const res = await fetch(
		`/api/validate-session?platform=${loginSession.provider}`,
		{
			cache: "no-cache",
			headers: {
				Authorization: "OAuth " + loginSession?.accessToken,
			},
		}
	)
	return res
}

/**
 * Fetches on the server the followers from the Twitch API
 * @param user_id The user ID to fetch the followers of
 * @param client_id The client ID to use for the request
 * @param tokenBearer The token to use for the request
 * @returns The json response containing the followers
 * @see https://dev.twitch.tv/docs/api/reference#get-users-follows
 */
export async function getFollowers(
	user_id: string,
	client_id: string,
	tokenBearer: string
) {
	const response = await fetch(TWITCH_GET_FOLLOW_ENDPOINT + user_id, {
		headers: {
			"Authorization": `Bearer ${tokenBearer}`,
			"Client-Id": client_id,
		},
	})

	return await response.json()
}

/**
 * Fetches on the server the channels from the Twitch API
 * @param channel_list The list of channels to fetch
 * @param tokenBearer The token to use for the request
 * @param client_id The client ID to use for the request
 * @returns The json response containing the channels
 * @see https://dev.twitch.tv/docs/api/reference#get-users
 */
export async function getTwFollowedChannels(
	channel_list: string,
	tokenBearer: string,
	client_id: string
) {
	const response = await fetch(TWITCH_CHANNEL_ENDPOINT + channel_list, {
		headers: {
			"Authorization": `Bearer ${tokenBearer}`,
			"Client-Id": client_id,
		},
	})

	return await response.json()
}

export async function getTwitchTopStreamers(
	tokenBearer: string,
	clientId: string
) {
	const res = await fetch(TWITCH_LIVE_STREAM_ENDPOINT, {
		headers: {
			"Authorization": "Bearer " + tokenBearer,
			"Client-id": clientId,
		},
	})

	return await res.json()
}

export async function getTwFollowedChannelsInLive(
	channel_list: string,
	tokenBearer: string,
	client_id: string
) {
	// maybe use new URL instead of string concatenation
	const response = await fetch(
		`https://api.twitch.tv/helix/streams${channel_list}`,
		{
			headers: {
				"Authorization": "Bearer " + tokenBearer,
				"Client-id": client_id,
			},
		}
	)

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
