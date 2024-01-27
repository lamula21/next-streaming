import { getTopYtLiveVideos } from "@/services/youtube-api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	// get token from header
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	// get query parmas
	const searchParams = req.nextUrl.searchParams
	const query = searchParams.get("q")

	if (!token || !query) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 })
	}

	const bearer = token.split(" ")[1] // get only the token

	try {
		const results = await getTopYtLiveVideos(bearer, encodeURIComponent(query))

		return NextResponse.json(
			{ data: results, platform: "youtube", keyword: query },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{
				message: "Out of quotas for accessing Youtube API. Contact developer.",
			},
			{ status: 401 }
		)
	}
}
