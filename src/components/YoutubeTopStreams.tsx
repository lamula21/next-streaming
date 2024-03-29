"use client"

import { StoreState } from "@/types/redux-types"
import { YoutubeTopLiveStream } from "@/types/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ThumbCard } from "./ThumbCard"
import { KEYWORD } from "@/lib/constants"
import { toast } from "sonner"
import { TopStreamsSkeleton } from "./skeleton/TwitchTopStreamSkeleton"
import { customEqual } from "@/lib/utils"

export function YoutubeTopStreams() {
	const [result, setResult] = useState<YoutubeTopLiveStream>({
		data: [],
		platform: "",
		keyword: "",
	})
	const [isLoading, setIsLoading] = useState(true) // loading initially

	// get youtube session
	const ytSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession,
		customEqual
	)

	const getYoutubeTopStreams = async () => {
		if (ytSession) {
			const response = await fetch(
				`/api/get-youtube-top-streams?keyword=${KEYWORD}`,
				{
					cache: "force-cache",
					headers: { Authorization: "OAuth " + ytSession.accessToken },
				}
			)

			if (response.status === 401) {
				toast.message(
					"Sorry! We ran out of Youtube API quota. Try it tomorrow",
					{
						description:
							"Quotas restart at 12:00 AM PST (Pacific Standard Time)",
					}
				)
			}

			if (response.ok) {
				setResult(await response.json())
				setIsLoading(false)
			}
		}
	}

	useEffect(() => {
		if (ytSession) {
			getYoutubeTopStreams()
		}
	}, [ytSession])

	return (
		<div className="flex flex-col mt-2 space-x-1">
			<div className="w-full ml-0 m-4">
				<h2 className="text-2xl font-semibold tracking-tight">
					Top Youtube Streaming
				</h2>

				<div className="text-xs mt-8">
					{isLoading && <TopStreamsSkeleton />}
					{!isLoading && (
						<div className="select-none gap-3 grid-cols-2 sm:grid sm:px-6 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6">
							{result.data.map((channel) => (
								<ThumbCard
									className="yt-shadow-pop-br-out xl:hover:yt-shadow-pop-br"
									key={`yt-${channel.channel_id}-${channel.video_id}`}
									name={channel.channel_name}
									chnId={channel.video_id}
									title={channel.video_name}
									platform={result.platform}
									game={result.keyword}
									thumbUrl={channel.thumbnail}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
