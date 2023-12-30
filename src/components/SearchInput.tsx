"use client"

import { useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import { useSelector } from "react-redux"
import { useOnClickOutside } from "@/hooks/useClickOutside"
import { searchStream } from "@/services/twitch-api"
import { StoreState } from "@/types/redux-types"
import { useCallback, useRef, useState } from "react"

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command"
import { ChannelCard } from "./ChannelCard"

export function SearchInput() {
	const [input, setInput] = useState("")
	const commandRef = useRef<HTMLDivElement>(null)

	const twitchSession = useSelector(
		(state: StoreState) => state.counter.twitchSession
	)
	const ytSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession
	)
	const selectedPlatform = useSelector(
		(state: StoreState) => state.counter.selectPlt
	)

	const currentSession =
		selectedPlatform === "twitch" ? twitchSession : ytSession

	useOnClickOutside(commandRef, () => {
		setInput("")
	})

	const {
		data: results,
		isFetching: isLoading,
		refetch,
	} = useQuery({
		queryKey: ["search-query"],
		enabled: false,
		queryFn: async () => {
			return await searchStream(input, currentSession, selectedPlatform)
		},
	})

	const request = debounce(() => {
		refetch()
	}, 350)

	const memoRequest = useCallback(() => {
		request()
	}, [])

	return (
		<>
			<Command
				ref={commandRef}
				className="h-10 relative rounded-lg rounded-bl-none rounded-br-none  z-50 overflow-visible max-w-lg"
			>
				<CommandInput
					isLoading={isLoading}
					onValueChange={(text) => {
						setInput(text)
						memoRequest()
					}}
					value={input}
					className="h-[38px] outline-none border-none focus:border-none focus:outline-none ring-0 "
					placeholder="Search channels..."
				/>

				{input.length > 0 && (
					<CommandList className="absolute border border-t-0  bg-background w-full   top-full shadow rounded-b-md">
						{(results?.data?.length ?? 0) > 0 ? (
							<CommandGroup heading="Top Partners">
								{results.data?.map((channel: any) => (
									<CommandItem
										key={channel.channel_id}
										value={channel.channel_name}
									>
										<ChannelCard
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
			</Command>
		</>
	)
}
