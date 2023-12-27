"use client"

import { StoreState, YChannel } from "@/types/redux-types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Skeleton } from "./ui/skeleton"
import { ThumbCard } from "./ThumbCard"
import { TwitchTopLiveStream } from "@/types/types"

export function TwitchTopStreams() {
	const [result, setResult] = useState<TwitchTopLiveStream>({
		data: [],
		platform: "",
	})
	const [isLoading, setIsLoading] = useState(true) // loading initially

	const session = useSelector(
		(state: StoreState) => state.counter.twitchSession
	)

	const getTwitchTopStreams = async () => {
		if (session) {
			setIsLoading(true)
			const response = await fetch("/api/get-twitch-top-streams", {
				next: { revalidate: 5 }, // data cached for 5 seconds
				headers: { Authorization: "OAuth " + session.accessToken },
			})

			setResult(await response.json())
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getTwitchTopStreams()
	}, [session])

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
								<div className="p-1" key={channel.id}>
									<ThumbCard
										name={channel.user_name}
										chnId={channel.user_login}
										title={channel.title}
										platform={result.platform}
										game={channel.game_name}
										thumbUrl={channel.thumbnail_url}
										viewCount={channel.viewer_count}
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
