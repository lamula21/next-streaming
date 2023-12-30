"use client"

import { useCallback, useEffect, useState } from "react"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInputModal,
	CommandItem,
	CommandList,
} from "./ui/command"

import { Button } from "./ui/button"
import { debounce } from "lodash"
import { searchStream } from "@/services/twitch-api"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { StoreState } from "@/types/redux-types"
import { ChannelCardModal } from "./ChannelCardModal"

export function SearchInputModal() {
	const [open, setOpen] = useState(false)

	const [input, setInput] = useState("")

	const twitchSession = useSelector(
		(state: StoreState) => state.counter.twitchSession
	)
	const ytSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession
	)
	const platform = useSelector((state: StoreState) => state.counter.platform)

	const currentSession = platform === "twitch" ? twitchSession : ytSession

	const {
		data: results,
		isFetching: isLoading,
		refetch,
	} = useQuery({
		queryKey: ["search-query"],
		enabled: false,
		queryFn: async () => {
			return await searchStream(input, currentSession, platform)
		},
	})

	const request = debounce(() => {
		refetch()
	}, 350)

	const memoRequest = useCallback(() => {
		request()
	}, [])

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	return (
		<>
			<Button
				variant="outline"
				className="text-sm text-muted-foreground bg-background flex gap-2"
				onClick={() => setOpen(true)}
			>
				Search{" "}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>J
				</kbd>
			</Button>

			<CommandDialog
				open={open}
				onOpenChange={(isOpen) => {
					setOpen(isOpen)
					if (!isOpen) setInput("")
				}}
			>
				<CommandInputModal
					onValueChange={(text) => {
						setInput(text)
						memoRequest()
					}}
					value={input}
					className="h-[38px] outline-none border-none focus:border-none focus:outline-none ring-0 "
					placeholder="Search channels..."
				/>
				{input.length > 0 && (
					<CommandList className="">
						{(results?.data?.length ?? 0) > 0 ? (
							<CommandGroup heading="Top Partners">
								{results.data?.map((channel: any) => (
									<CommandItem
										key={`modal-${channel.channel_id}`}
										value={channel.channel_name}
									>
										<ChannelCardModal
											channelName={channel.channel_name}
											channelId={channel.channel_id}
											thumbnail={channel.thumbnail}
											isLive={channel.is_live}
											platform={results.platform}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						) : (
							<CommandEmpty>No results found.</CommandEmpty>
						)}
					</CommandList>
				)}
			</CommandDialog>
		</>
	)
}
