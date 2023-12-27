import { validateToken } from "@/services/client-api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const requestHeaders = new Headers(req.headers)
	const { searchParams } = req.nextUrl // Query params
	const platform = searchParams.get("platform")

	// May not be necessary
	if (!platform) {
		return NextResponse.json(
			{ message: "No platform found" },
			{
				status: 400,
			}
		)
	}

	const data = validateToken(platform, requestHeaders)

	return NextResponse.json(data, { status: 200 })
}
