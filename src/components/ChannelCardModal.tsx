"use client"

import { selected } from "@/modules/slice"
import { useDispatch } from "react-redux"

interface ChannelCardModalProps {
	channelName: string
	channelId: string
	thumbnail: string
	platform: string
	isLive: boolean
}

export function ChannelCardModal({
	channelName,
	thumbnail,
	channelId,
	platform,
	isLive,
}: ChannelCardModalProps) {
	const dispatch = useDispatch()

	const chnInfo = {
		name: channelName, // channel name
		id: channelId, // video id
		platform: platform,
	}

	return (
		<button
			onClick={() => dispatch(selected(chnInfo))}
			className="flex w-full items-center gap-4"
		>
			<img src={thumbnail} alt="" className="w-8 h-8 rounded-full" />

			<div className="w-full h-full flex flex-row items-center justify-between">
				<h1>{channelName}</h1>
				{isLive && <span className="bg-red-600 rounded-sm px-2 p-1">Live</span>}
				{!isLive && (
					<span className=" bg-gray-600/40  rounded-sm px-2 p-1 truncate">
						Disconnected
					</span>
				)}
			</div>
		</button>
	)
}
