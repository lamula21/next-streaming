import { getTopYtLiveVideos } from "@/services/youtube-api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	// headers
	const requestHeaders = new Headers(req.headers)
	const token = requestHeaders.get("Authorization")

	// query params
	const searchParams = req.nextUrl.searchParams
	const keyword = searchParams.get("keyword")

	if (!token || !keyword) {
		return NextResponse.json(
			{ message: "Token or keyword not provided" },
			{ status: 401 }
		)
	}

	const tokenBearer = token.split(" ")[1] // get only the token

	try {
		const liveVideos = await getTopYtLiveVideos(tokenBearer, keyword)

		return NextResponse.json(
			{ data: liveVideos, platform: "youtube", keyword: keyword },
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
