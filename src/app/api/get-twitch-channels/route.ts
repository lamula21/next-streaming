import { validateToken } from "@/services/client-api"
import { NextRequest, NextResponse } from "next/server"
import {
	getTwFollowedChannels,
	getFollowers,
	getTwFollowedChannelsInLive,
} from "@/services/twitch-api"
import { updateViewCounts } from "@/lib/utils"

// TODO: maybe get followed channels from client payload instead?
export async function GET(req: NextRequest) {
	// get token from header
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	if (!token) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 })
	}

	let channel_list = ""
	let user_login_list = ""

	try {
		const { user_id, client_id } = await validateToken("twitch", requestHeaders)

		if (!user_id || !client_id) {
			return NextResponse.json(
				{ message: "Token has expired" },
				{ status: 401 }
			)
		}

		const tokenBearer = token.split(" ")[1] // get only the token

		const { data: followersData } = await getFollowers(
			user_id,
			client_id,
			tokenBearer
		)

		followersData.map((value: any, index: any) => {
			if (index === 0) {
				channel_list += "?login=" + value.broadcaster_login
				user_login_list += "?user_login=" + value.broadcaster_login
			} else {
				channel_list += "&login=" + value.broadcaster_login
				user_login_list += "&user_login=" + value.broadcaster_login
			}
		})

		const { data: followed_channels } = await getTwFollowedChannels(
			channel_list,
			tokenBearer,
			client_id
		)

		const { data: followed_channels_in_live } =
			await getTwFollowedChannelsInLive(user_login_list, tokenBearer, client_id)

		const updated_followed_channels = updateViewCounts(
			followed_channels,
			followed_channels_in_live
		)

		return NextResponse.json(
			{ data: updated_followed_channels, platform: "twitch" },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 })
	}
}
