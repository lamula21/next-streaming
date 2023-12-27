import {
	YOUTUBE_SEARCH_LIVE_VIDEO_ENDPOINT,
	YOUTUBE_SUBSCRIPTION_ENDPOINT,
	YOUTUBE_VIDEO_ENDPOINT,
} from "@/lib/constants"

/**
 * Fetches on the server the channels from the Youtube API
 * @param tokenBearer The token to use for the request
 * @returns The json response containing the channels
 */
export async function getSubscribedYtChannels(tokenBearer: string) {
	const response = await fetch(YOUTUBE_SUBSCRIPTION_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${tokenBearer}`,
		},
	})

	return await response.json()
}

/**
 * Fetches on the server the videos from the Youtube API
 * @param tokenBearer The token to use for the request
 * @param channel The channel to fetch the videos from
 * @returns The json response containing single video
 */
export async function getYtLiveVideo(tokenBearer: string, channel: any) {
	// search live video on YT API is very expensive
	const response = await fetch(
		YOUTUBE_VIDEO_ENDPOINT +
			"&channelId=" +
			channel.snippet.resourceId.channelId,
		{
			headers: {
				Authorization: `Bearer ${tokenBearer}`,
			},
		}
	)

	return await response.json()
}

/**
 * Fetches on the server all the videos from the Youtube API
 * @param tokenBearer The token to use for the request
 * @param ytchannels The channels to fetch the videos from
 * @returns The json response containing all videos
 */
export async function getAllYtVideos(tokenBearer: string, ytchannels: any) {
	// Promise.allSettled used here?
	// Promise.all send requests in parallel, improving performance
	const data = Promise.all(
		ytchannels.items.map(async (channel: any) => {
			const data = await getYtLiveVideo(tokenBearer, channel)

			return data.items.length === 0
				? {
						channel_id: channel.snippet.resourceId.channelId,
						channel_name: channel.snippet.title,
						channel_platform: "youtube",
						thumbnails: channel.snippet.thumbnails.medium.url,
						video_id: "",
						is_live: false,
				  }
				: {
						channel_id: channel.snippet.resourceId.channelId,
						channel_name: channel.snippet.title,
						channel_platform: "youtube",
						thumbnails: channel.snippet.thumbnails.medium.url,
						video_id: data.items[0].id.videoId,
						is_live: true,
				  }
		})
	)

	return data
}

// --------

export async function getTopYtLiveVideos(tokenBearer: string, keyword: string) {
	const data = await (
		await fetch(YOUTUBE_SEARCH_LIVE_VIDEO_ENDPOINT + keyword, {
			headers: {
				Authorization: `Bearer ${tokenBearer}`,
			},
		})
	).json()

	let topVideos = data.items.map((video: any) => {
		return {
			channel_id: video.snippet.channelId,
			channel_name: video.snippet.channelTitle,
			video_name: video.snippet.title,
			thumbnail: video.snippet.thumbnails.medium.url,
			video_id: video.id.videoId,
			is_live: true,
		}
	})

	return topVideos
}
