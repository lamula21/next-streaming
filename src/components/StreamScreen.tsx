import { StoreState } from "@/types/redux-types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StreamBox } from "./StreamBox"

export default function StreamScreen() {
	const name = useSelector((state: StoreState) => state.counter.name)
	const view = useSelector((state: StoreState) => state.counter.view)
	const screen = useSelector((state: StoreState) => state.counter.screen)
	const channelId = useSelector((state: StoreState) => state.counter.chnId)
	const platform = useSelector((state: StoreState) => state.counter.platform)

	// maybe useReducer?
	const [screen1Info, setScreen1Info] = useState({ id: "", platform: "" })
	const [screen2Info, setScreen2Info] = useState({ id: "", platform: "" })
	const [screen3Info, setScreen3Info] = useState({ id: "", platform: "" })
	const [screen4Info, setScreen4Info] = useState({ id: "", platform: "" })

	// when change channel, save to state
	useEffect(() => {
		if (screen === "1") {
			setScreen1Info({ id: channelId, platform: platform })
		} else if (screen === "2") {
			setScreen2Info({ id: channelId, platform: platform })
		} else if (screen === "3") {
			setScreen3Info({ id: channelId, platform: platform })
		} else if (screen === "4") {
			setScreen4Info({ id: channelId, platform: platform })
		}
	}, [channelId])

	return (
		<div className="w-full h-full">
			{view === "single" && (
				<div className="aspect-video max-w-[98%]">
					<StreamBox
						streamId={screen1Info.id}
						platform={screen1Info.platform}
						chat
					/>
				</div>
			)}

			{view === "double" && (
				<div className="grid grid-cols-2 gap-2 max-w-[98%]">
					<div className="aspect-video">
						<StreamBox
							streamId={screen1Info.id}
							platform={screen1Info.platform}
						/>
					</div>
					<div className="aspect-video">
						<StreamBox
							streamId={screen2Info.id}
							platform={screen2Info.platform}
						/>
					</div>
				</div>
			)}

			{view === "triple" && (
				<div className="h-max">
					<div className="mx-auto max-w-[1600px] py-24 sm:px-2 sm:py-4 lg:px-4">
						<div className="mx-auto max-w-2xl px-4 lg:max-w-none">
							<div
								key="1"
								className="grid grid-cols-1 items-center lg:grid-cols-1"
							>
								<StreamBox
									streamId={screen1Info.id}
									platform={screen1Info.platform}
									chat
								/>
							</div>

							<div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-2">
								<div key="2" className="sm:flex lg:block">
									<StreamBox
										streamId={screen2Info.id}
										platform={screen2Info.platform}
									/>
								</div>

								<div key="3" className="sm:flex lg:block">
									<StreamBox
										streamId={screen3Info.id}
										platform={screen3Info.platform}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{view === "quad" && (
				<div className="grid grid-rows-2 max-w-[98%]">
					<div className="grid grid-cols-2 gap-2 mb-2">
						<div className="aspect-video">
							<StreamBox
								streamId={screen1Info.id}
								platform={screen1Info.platform}
							/>
						</div>

						<div className="aspect-video">
							<StreamBox
								streamId={screen2Info.id}
								platform={screen2Info.platform}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<div className="aspect-video">
							<StreamBox
								streamId={screen3Info.id}
								platform={screen3Info.platform}
							/>
						</div>

						<div className="aspect-video">
							<StreamBox
								streamId={screen4Info.id}
								platform={screen4Info.platform}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
