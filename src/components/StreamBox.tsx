import { TWITCH_WATCH_ENDPOINT, YOUTUBE_WATCH_ENDPOINT } from "@/lib/constants"
import ReactPlayer from "react-player"
import { TwitchChat } from "react-twitch-embed"
import { YoutubeChat } from "./YoutubeChat"
import { cn } from "@/lib/utils"

type StreamBoxProps = {
	streamId: string
	platform: string
	chat?: boolean
}

export function StreamBox({
	streamId,
	platform,
	chat = false,
}: StreamBoxProps) {
	return (
		<>
			{platform === "twitch" && (
				<div className="w-full h-full shadow-2xl shadow-indigo-500/50">
					<div className="grid grid-cols-4 h-full">
						<div
							className={cn(
								"relative pt-[56.25%]",
								chat ? "col-span-4 md:col-span-3" : "col-span-4"
							)}
						>
							<ReactPlayer
								className="absolute top-0 left-0"
								width="100%"
								height="100%"
								playing
								controls
								url={TWITCH_WATCH_ENDPOINT + streamId}
							/>
						</div>

						{chat && (
							<div className="hidden md:block">
								<TwitchChat channel={streamId} width="100%" height="100%" />
							</div>
						)}
					</div>
				</div>
			)}

			{platform === "youtube" && (
				<div className="w-full h-full shadow-2xl shadow-red-600/40">
					<div className="grid grid-cols-4 h-full">
						<div
							className={cn(
								"relative pt-[56.25%] ",
								chat ? "col-span-4 md:col-span-3" : "col-span-4"
							)}
						>
							<ReactPlayer
								className="absolute top-0 left-0 "
								width="100%"
								height="100%"
								playing
								controls
								url={YOUTUBE_WATCH_ENDPOINT + streamId}
							/>
						</div>

						{chat && (
							<div className="hidden md:block">
								<YoutubeChat id={streamId} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
