import { EMBED_DOMAIN } from "@/lib/constants"
import React from "react"

type YoutubeChatProps = {
	id: string
}

export function YoutubeChat({ id }: YoutubeChatProps) {
	const endpoint = `https://www.youtube.com/live_chat?v=${id}&embed_domain=${EMBED_DOMAIN}`

	return (
		<>
			<iframe
				src={endpoint}
				width="100%"
				height="100%"
				frameBorder={0}
			></iframe>
		</>
	)
}
