"use client"

import { selected } from "@/modules/slice"
import { useDispatch } from "react-redux"

interface ChannelCardProps {
	channelName: string
	channelId: string
	thumbnail: string
	platform: string
	isLive: boolean
}

export function ChannelCard({
	channelName,
	thumbnail,
	channelId,
	platform,
	isLive,
}: ChannelCardProps) {
	const dispatch = useDispatch()

	const chnInfo = {
		name: channelName,
		id: channelId, // video id
		platform: platform,
	}

	return (
		<button
			onClick={() => dispatch(selected(chnInfo))}
			className="flex gap-2 w-full items-center"
		>
			<img src={thumbnail} alt="" className="w-8 h-8 rounded-full" />

			<div className="flex flex-row items-start text-left lg:justify-between w-full">
				<h1 className="text-left">{channelName}</h1>

				{isLive && (
					<span className="hidden lg:block bg-red-600 rounded-sm px-2 p-1">
						Live
					</span>
				)}

				{!isLive && (
					<span className="hidden lg:block bg-gray-600/40  rounded-sm px-2 p-1 truncate">
						Disconnected
					</span>
				)}
			</div>
		</button>
	)
}
