import { validateToken } from "@/services/client-api"
import { getTwitchTopStreamers } from "@/services/twitch-api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	if (!token) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 })
	}

	const tokenBearer = token.split(" ")[1] // get only the token

	const validated = await validateToken("twitch", requestHeaders)

	const { data: topStreamersList } = await getTwitchTopStreamers(
		tokenBearer,
		validated.client_id
	)

	const replacedString = JSON.stringify(topStreamersList)
		.replace(/\{width\}/g, "320")
		.replace(/\{height\}/g, "180")

	const data = JSON.parse(replacedString)

	return NextResponse.json({ data, platform: "twitch" }, { status: 200 })
}
