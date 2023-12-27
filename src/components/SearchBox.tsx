"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
} from "./ui/select"
import { BsTwitch, BsYoutube } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { selectPlatform } from "@/modules/slice"
import { StoreState } from "@/types/redux-types"

export function SearchBox() {
	const [inputValue, setInputValue] = useState("")
	const platform = useSelector((state: StoreState) => state.counter.selectPlt)

	const dispatch = useDispatch()

	return (
		<div className="flex w-[40%] space-x-2">
			<Input
				className="max-w-lg"
				type="text"
				onChange={(e) => setInputValue(e.target.value)}
			/>

			<Button type="submit">Search</Button>

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
		</div>
	)
}
