import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function updateViewCounts(channels: any, liveChannels: any) {
	const updatedChannels = channels.map((channel: any) => {
		const stream = liveChannels.find((live: any) => live.user_id === channel.id)

		if (stream) {
			channel.view_count = stream.viewer_count
		}

		return channel
	})

	return updatedChannels
}
