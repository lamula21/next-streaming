"use client"

import { useDispatch, useSelector } from "react-redux"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { selectScreen, selectView } from "@/modules/slice"
import { StoreState } from "@/types/redux-types"
import { cn } from "@/lib/utils"

export function StreamConfig() {
	const view = useSelector((state: StoreState) => state.counter.view)
	const screen = useSelector((state: StoreState) => state.counter.screen)
	const tabMode = useSelector((state: StoreState) => state.counter.tabMode)
	const dispatch = useDispatch()

	return (
		<div className="flex">
			<div className="ml-2">
				<Select
					// defaultValue={view} // persist only  when refresh page
					value={view} // persist btw re-renders
					onValueChange={(value) => dispatch(selectView(value))}
				>
					<SelectTrigger
						className={cn(
							"w-[90px]",
							tabMode === "Stream" ? "pointer-events-none" : ""
						)}
						disabled={tabMode === "Stream"}
					>
						<SelectValue placeholder="View" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="single">Single</SelectItem>
						<SelectItem value="double">Double</SelectItem>
						<SelectItem value="triple">Triple</SelectItem>
						<SelectItem value="quad">Quad</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="ml-2">
				<Select
					// defaultValue={screen}
					value={screen}
					onValueChange={(value) => dispatch(selectScreen(value))}
				>
					<SelectTrigger
						className={cn(
							"w-[105px]",
							tabMode === "Stream" ? "pointer-events-none" : ""
						)}
						disabled={tabMode === "Stream"}
					>
						<SelectValue placeholder="Screen" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="1">Screen 1</SelectItem>
						<SelectItem value="2">Screen 2</SelectItem>
						<SelectItem value="3">Screen 3</SelectItem>
						<SelectItem value="4">Screen 4</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
