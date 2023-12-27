"use client"
import { StoreState } from "@/types/redux-types"
import { TwitchTopLiveStream, YoutubeTopLiveStream } from "@/types/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ThumbCard } from "./ThumbCard"
import { Skeleton } from "./ui/skeleton"
import { KEYWORD } from "@/lib/constants"

export function YoutubeTopStreams() {
	// get youtube session
	const ytSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession
	)

	const [result, setResult] = useState<YoutubeTopLiveStream>({
		data: [],
		platform: "",
		keyword: "",
	})
	const [isLoading, setIsLoading] = useState(true) // loading initially

	const getYoutubeTopStreams = async () => {
		if (ytSession) {
			setIsLoading(true)
			const response = await fetch(
				`/api/get-youtube-top-streams?keyword=${KEYWORD}`,
				{
					next: { revalidate: 30 }, // data cached for 30 seconds
					headers: { Authorization: "OAuth " + ytSession.accessToken },
				}
			)

			setResult(await response.json())
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getYoutubeTopStreams()
	}, [ytSession])

	return (
		<div className="flex flex-col mt-2 space-x-1">
			<div className="w-full ml-0 m-4">
				<h2 className="text-2xl font-semibold tracking-tight">
					Top Twitch Streaming
				</h2>

				<div className="text-xs">
					{isLoading && <Skeleton className="h-12 w-36" />}
					{!isLoading && (
						<div className="select-none grid-cols-2 sm:grid sm:pl-16 lg:grid-cols-3 xl:grid-cols-4 xl:p-32 xl:pr-32 2xl:grid-cols-6">
							{result.data.map((channel) => (
								<div className="p-1">
									<ThumbCard
										name={channel.channel_name}
										chnId={channel.video_id}
										title={channel.video_name}
										platform={result.platform}
										game={result.keyword}
										thumbUrl={channel.thumbnail}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
