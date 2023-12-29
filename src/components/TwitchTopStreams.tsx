"use client"

import { StoreState } from "@/types/redux-types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ThumbCard } from "./ThumbCard"
import { TwitchTopLiveStream } from "@/types/types"
import { toast } from "sonner"
import { TopStreamsSkeleton } from "./skeleton/TwitchTopStreamSkeleton"
import { customEqual } from "@/lib/utils"

export function TwitchTopStreams() {
	const [result, setResult] = useState<TwitchTopLiveStream>({
		data: [],
		platform: "",
	})
	const [isLoading, setIsLoading] = useState(true) // loading initially

	const session = useSelector(
		(state: StoreState) => state.counter.twitchSession,
		customEqual
	)

	const getTwitchTopStreams = async () => {
		if (session) {
			const response = await fetch("/api/get-twitch-top-streams", {
				next: { revalidate: 60 }, // data cached for 30 seconds
				headers: { Authorization: "OAuth " + session.accessToken },
			})

			if (response.status === 401) {
				toast.message("Your twitch session has expired", {
					description: "Please sign in again",
				})
			}

			if (response.ok) {
				setResult(await response.json())
				setIsLoading(false)
			}
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

				<div className="text-xs mt-8">
					{isLoading && <TopStreamsSkeleton />}
					{!isLoading && (
						<div className="select-none gap-3 grid-cols-2 sm:grid sm:px-6 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6">
							{result.data.map((channel) => (
								<div className="" key={channel.id}>
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
