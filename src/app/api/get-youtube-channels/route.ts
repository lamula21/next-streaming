import { NextRequest, NextResponse } from "next/server"
import { getAllYtVideos, getSubscribedYtChannels } from "@/services/youtube-api"

// Note:
// Activate Youtube API: https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=274663899217

export async function GET(req: NextRequest) {
	// get token from header
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	if (!token) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 })
	}

	try {
		const tokenBearer = token.split(" ")[1] // get only the token
		const ytchannels = await getSubscribedYtChannels(tokenBearer)
		const data = await getAllYtVideos(tokenBearer, ytchannels)

		return NextResponse.json({ data, platform: "youtube" }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{
				message: "Out of quotas for accessing Youtube API. Contact developer.",
			},
			{ status: 401 }
		)
	}
}
