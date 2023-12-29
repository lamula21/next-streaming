import { type ClassValue, clsx } from "clsx"
import { Session } from "next-auth"
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

/**
 * useSelector re-renders when any state hash changed.
 * The customEqual function compares the previous and current state.
 * If customEqual returns true, useSelector will not cause a re-render
 * @param prevSession
 * @param currSession
 * @returns boolean
 */
export const customEqual = (prevSession: Session, currSession: Session) =>
	prevSession?.accessToken === currSession?.accessToken
