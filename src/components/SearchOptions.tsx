"use client"

import { BsTwitch, BsYoutube } from "react-icons/bs"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { useDispatch } from "react-redux"
import { selectPlatform } from "@/modules/slice"

export function SearchOptions() {
	const dispatch = useDispatch()

	return (
		<Select
			defaultValue="twitch"
			onValueChange={(value) => dispatch(selectPlatform(value))}
		>
			<SelectTrigger className="w-[100px]">
				<SelectValue placeholder="Select Platform" />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					<SelectItem className="text-xl" value="twitch">
						<BsTwitch />
					</SelectItem>
					<SelectItem className="text-xl" value="youtube">
						<BsYoutube />
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
