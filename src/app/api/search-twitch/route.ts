import { TWITCH_ENDPOINT, TWITCH_SEARCH_ENDPOINT } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	// get token from header
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	// get query parmas
	const searchParams = req.nextUrl.searchParams
	const query = searchParams.get("q")

	if (!token) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 })
	}

	const bearer = token.split(" ")[1] // get only the token

	try {
		const userValidated = await (
			await fetch(TWITCH_ENDPOINT, {
				headers: {
					Authorization: token,
				},
			})
		).json()

		const { data } = await (
			await fetch(TWITCH_SEARCH_ENDPOINT + query, {
				headers: {
					"Authorization": `Bearer ${bearer}`,
					"Client-id": userValidated.client_id,
				},
			})
		).json()

		const filteredData = data.map((channel: any) => {
			return {
				channel_id: channel.broadcaster_login,
				channel_name: channel.display_name,
				title: channel.title,
				thumbnail: channel.thumbnail_url,
				game_name: channel.game_name,
				is_live: channel.is_live,
			}
		})

		return NextResponse.json(
			{ data: filteredData, platform: "twitch" },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ message: "Invalid Token" }, { status: 401 })
	}
}
