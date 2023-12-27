import React from "react"
import { Card, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useDispatch } from "react-redux"
import { selected } from "@/modules/slice"
import { cn } from "@/lib/utils"

interface SidebarCardProps {
	name: string
	chnId: string
	chnPlt: string
	iconUrl: string
	isLive?: boolean
}

export function SidebarCard({
	name,
	chnId,
	chnPlt,
	iconUrl,
	isLive = false,
}: SidebarCardProps) {
	const dispatch = useDispatch()

	const chnInfo = {
		name: name,
		id: chnId,
		platform: chnPlt,
	}

	return (
		<button
			className="w-full"
			onClick={() => {
				dispatch(selected(chnInfo))
			}} // set on store the selected channel
		>
			<Card className="border-0 shadow-none">
				<CardHeader className="flex flex-row items-center pt-1 pb-1 pl-0 gap-x-2">
					<div className="relative text-sm z-0">
						<Avatar className="w-[30px] h-[30px] z-0">
							<AvatarImage
								src={iconUrl}
								className={cn(!isLive ? "grayscale" : "")}
							/>
							<AvatarFallback>UN</AvatarFallback>
						</Avatar>
						{isLive && (
							<>
								<div
									className={cn(
										"absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full z-[15] animate-ping opacity-75",
										chnPlt === "twitch" ? "bg-purple-500" : "bg-red-500"
									)}
								/>
								<div
									className={cn(
										"absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full z-20",
										chnPlt === "twitch" ? "bg-purple-500" : "bg-red-500"
									)}
								/>
							</>
						)}
					</div>

					<div className="w-full text-left pr-3 hidden lg:block">
						<CardTitle className="text-sm truncate ">{name}</CardTitle>
					</div>
				</CardHeader>
			</Card>
		</button>
	)
}
