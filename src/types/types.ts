export interface TwitchTopLiveStream {
	data: TwitchLiveStream[]
	platform: string
}

export interface TwitchLiveStream {
	id: string
	user_id: string
	user_login: string
	user_name: string
	game_id: string
	game_name: string
	type: string
	title: string
	viewer_count: number
	started_at: Date
	language: string
	thumbnail_url: string
	tag_ids: any[]
	tags: string[]
	is_mature: boolean
}

export interface YoutubeTopLiveStream {
	data: YoutubeLiveStream[]
	platform: string
	keyword: string
}

export interface YoutubeLiveStream {
	channel_id: string
	channel_name: string
	video_name: string
	thumbnail: string
	video_id: string
	is_live: true
}
