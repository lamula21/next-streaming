import { Session } from "next-auth"

export enum BroadcasterType {
	Affiliate = "affiliate",
	Empty = "",
	Partner = "partner",
}

export interface TChannel {
	id: string
	login: string
	display_name: string
	type: string
	broadcaster_type: BroadcasterType
	description: string
	profile_image_url: string
	offline_image_url: string
	view_count: number
	created_at: Date
}

export interface YChannel {
	channel_id: string
	channel_name: string
	channel_platform: string
	thumbnails: string
	video_id: string
	is_live: boolean
}

export interface StoreState {
	counter: {
		name: string
		chnId: string
		clientId: string
		platform: string

		tchannels: {
			data: TChannel[]
			platform: string
		}
		ychannels: {
			data: YChannel[]
			platform: string
		}

		twitchSession: Session
		youtubeSession: Session
		loginSession: Session

		selectPlt: string
		search: {}

		view: string
		screen: string

		tabMode: "Stream" | "Multiview"
	}
}
