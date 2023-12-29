"use client"

import { Playlist } from "@/data/playlist"
import { cn } from "@/lib/utils"
import { BsTwitch, BsYoutube } from "react-icons/bs"
import { SidebarCard } from "./SidebarCard"
import { useSelector } from "react-redux"
import { StoreState } from "@/types/redux-types"
import { Logo } from "./Logo"
import { ScrollArea } from "./ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export function Sidebar({ className }: SidebarProps) {
	const tchannels = useSelector((state: StoreState) => state.counter.tchannels)
	const ychannels = useSelector((state: StoreState) => state.counter.ychannels)

	return (
		<aside className="fixed w-[50px] h-full lg:w-[200px] border-r ml-4 pt-6">
			<ScrollArea className="w-full h-full">
				<Logo />

				<div className={cn("pb-12", className)}>
					<div className="space-y-4 py-4">
						<div>
							<h2 className="flex mb-2 lg:px-4 text-lg font-semibold tracking-tight">
								<span className="hidden lg:block lg:mr-2">Twitch</span>
								<span className="text-purple-500">
									<BsTwitch />
								</span>
							</h2>
							<div className="space-y-2">
								{
									// TODO: check if tchannles can be undefined
									tchannels?.data !== undefined &&
										tchannels.data.map((channel) => (
											<SidebarCard
												key={channel.id}
												name={channel.display_name}
												chnId={channel.login}
												chnPlt={tchannels.platform}
												iconUrl={channel.profile_image_url}
												isLive={Boolean(channel.view_count > 0)}
											/>
										))
								}
							</div>
						</div>

						<div>
							<h2 className="flex mb-2 lg:px-4 text-lg font-semibold tracking-tight">
								<span className="hidden lg:block lg:mr-2">Youtube</span>
								<span className="text-red-500">
									<BsYoutube />
								</span>
							</h2>
							<div className="space-y-3">
								{
									// TODO: check if ychannles can be undefined
									ychannels?.data !== undefined &&
										ychannels.data.map((channel) => (
											<SidebarCard
												key={channel.channel_id}
												name={channel.channel_name}
												chnId={channel.video_id}
												chnPlt={ychannels.platform}
												iconUrl={channel.thumbnails}
												isLive={channel.is_live}
											/>
										))
								}
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</aside>
	)
}
