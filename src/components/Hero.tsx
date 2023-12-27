"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Login } from "./Login"
import { SearchBox } from "./SearchBox"
import { StreamConfig } from "./StreamConfig"
import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "@/types/redux-types"
import { StreamBox } from "./StreamBox"
import { StreamScreen } from "./StreamScreen"
import { saveTabMode, selectScreen, selectView } from "@/modules/slice"
import { TwitchTopStreams } from "./TwitchTopStreams"
import { YoutubeTopStreams } from "./YoutubeTopStreams"

export function Hero() {
	const dispatch = useDispatch()
	const channelId = useSelector((state: StoreState) => state.counter.chnId)
	const channelPlatform = useSelector(
		(state: StoreState) => state.counter.platform
	)
	const tabMode = useSelector((state: StoreState) => state.counter.tabMode)

	return (
		<main className="w-full ml-[64px] lg:ml-[216px] py-6 pr-6 ">
			<div className="flex flex-col space-y-4">
				<nav className="flex justify-center">
					<div className="grow flex justify-center">
						<SearchBox />
						<StreamConfig />
					</div>

					<Login />
				</nav>

				<section id="main" className="h-full px-4 m-6 lg:px-8">
					<Tabs
						// defaultValue="Stream"
						value={tabMode} // persist between re-renders
						className="h-full space-y-6"
						onValueChange={(value) => {
							// when change tabs, set to default:
							dispatch(saveTabMode(value))
							dispatch(selectView("single"))
							dispatch(selectScreen("1"))
						}}
					>
						{/* TAB OPTIONS */}
						<div className="space-between flex items-center">
							<TabsList>
								<TabsTrigger className="relative" value="Stream">
									Stream
								</TabsTrigger>

								<TabsTrigger value="MultiView">Multi-view</TabsTrigger>
							</TabsList>
						</div>

						{/* STREAM OPTIONS */}
						<TabsContent
							className="border-none p-0 outline-none"
							value="Stream"
						>
							<div className="flex flex-col pb-4 items-center">
								{/* search result */}

								{/* stream box */}

								<div className="flex justify-center w-full m-2">
									{channelId === "" && <></>}
									{channelId !== "" && (
										<StreamBox
											streamId={channelId}
											platform={channelPlatform}
											chat
										/>
									)}
								</div>
							</div>

							<TwitchTopStreams />
							<YoutubeTopStreams />
						</TabsContent>

						{/* MULTIVIEW OPTIONS */}
						<TabsContent
							className="border-none p-0 outline-none"
							value="MultiView"
						>
							<div className="flex flex-col pb-4 items-center">
								<StreamScreen />
							</div>
						</TabsContent>
					</Tabs>
				</section>
			</div>
		</main>
	)
}
