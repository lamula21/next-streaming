import { selected } from "@/modules/slice"
import { StoreState } from "@/types/redux-types"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

interface ThumbCardProps {
	name: string
	viewCount?: number
	thumbUrl: string
	title: string
	game?: string
	platform: string
	chnId: string
}

export function ThumbCard({
	name,
	viewCount,
	thumbUrl,
	title,
	game,
	platform,
	chnId,
}: ThumbCardProps) {
	const dispatch = useDispatch()

	const streamerName = useSelector((state: StoreState) => state.counter.name)
	const twitchSession = useSelector(
		(state: StoreState) => state.counter.twitchSession
	)

	const chnInfo = {
		name: name, // channel name
		id: chnId, // video id
		platform: platform,
	}

	return (
		<button className="w-full" onClick={() => dispatch(selected(chnInfo))}>
			<div className="flex flex-col xl:hover:scale-105 transition-transform duration-200">
				<div className="relative ">
					<Image src={thumbUrl} alt="thumbnail" width={320} height={180} />

					<div className="absolute top-2 left-2 px-1 rounded bg-red-500">
						<p className="text-white text-xs font-bold">Live</p>
					</div>

					{viewCount && (
						<div className="absolute bottom-2 left-2 px-1 rounded bg-gray-900/70">
							<p className="text-white text-xs font-bold">
								{viewCount} viewers
							</p>
						</div>
					)}
				</div>

				<div>
					<div className="py-[2px] pt-2">
						<p className="text-left text-white text-sm font-bold truncate">
							{title}
						</p>
					</div>

					<p className="text-left text-gray-400 text-xs font-bold truncate">
						{name}
					</p>

					<p className="text-left text-gray-400 text-xs font-bold truncate">
						{game}
					</p>
				</div>
			</div>
		</button>
	)
}
