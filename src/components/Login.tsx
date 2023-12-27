"use client"

import { Moon, Sun, User } from "lucide-react"
import { PiPlugsConnectedBold } from "react-icons/pi"
import { TbPlugConnected } from "react-icons/tb"
import { useTheme } from "next-themes"
import { signIn, signOut, useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import {
	resetStore,
	saveLoginSession,
	saveTwitchSession,
	saveYoutubeSession,
	twitchChannels,
	youtubeChannels,
} from "@/modules/slice"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { persistor } from "@/modules/store"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuPortal,
	DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StoreState } from "@/types/redux-types"
import { fetchTokenValidation } from "@/services/twitch-api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Login() {
	const router = useRouter()
	const { data: userName } = useSession()

	const { setTheme } = useTheme()
	const { data: session, status } = useSession()
	const dispatch = useDispatch()

	const loginSession = useSelector(
		(state: StoreState) => state.counter.loginSession
	)
	const twitchSession = useSelector(
		(state: StoreState) => state.counter.twitchSession
	)
	const youtubeSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession
	)

	let isConnectedTwitch = twitchSession?.accessToken !== undefined
	let isConnectedYT = youtubeSession?.accessToken !== undefined

	const handleSignIn = async () => {
		await signIn()
	}

	const getTwitchChannels = async () => {
		if (!twitchSession) {
			return
		}

		const res = await fetch("/api/get-twitch-channels", {
			cache: "no-store",
			headers: {
				Authorization: `OAuth ${twitchSession.accessToken}`,
			},
		})

		if (res.status === 401) {
			// token expired
			toast.error("Session expired, please sign in again")
			persistor.purge()
			// signOut({
			// 	redirect: false,
			// })
		}

		if (res.ok) {
			const data = await res.json()
			dispatch(twitchChannels(data))
		}
	}

	const getYoutubeChannels = async () => {
		if (!youtubeSession) {
			return
		}

		const res = await fetch("/api/get-youtube-channels", {
			next: {
				revalidate: 60 * 60, // 1 hour
			},
			headers: {
				Authorization: `OAuth ${youtubeSession.accessToken}`,
			},
		})

		if (res.ok) {
			const data = await res.json()
			dispatch(youtubeChannels(data))
		}
	}

	const validateSession = async () => {
		if (loginSession?.provider !== undefined) {
			const response = await fetchTokenValidation(loginSession)

			if (!response.ok) {
				toast.error("Session expired, please sign in again")
				persistor.purge()
				// signOut({
				// 	redirect: false,
				// })
			}
		}
	}

	// A mechanism to save session when connection is lost
	useEffect(() => {
		// this runs one time after logging in
		if (loginSession?.user?.name === undefined) {
			if (session !== null) {
				dispatch(saveLoginSession(session))
			}
		}

		// connecting again, save platform session
		if (session?.provider === "twitch") {
			dispatch(saveTwitchSession(session))
		} else if (session?.provider === "google") {
			dispatch(saveYoutubeSession(session))
		}
	}, [session])

	// validate session when mounted
	useEffect(() => {
		validateSession()
	}, [])

	useEffect(() => {
		// optimize queries
		if (!twitchSession) {
			return
		}

		getTwitchChannels()
	}, [twitchSession])

	useEffect(() => {
		// optimize queries
		if (!youtubeSession) {
			return
		}
		getYoutubeChannels()
	}, [youtubeSession])

	if (loginSession) {
		return (
			<>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src={loginSession?.user?.image} />
								<AvatarFallback>UN</AvatarFallback>
							</Avatar>
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						{status === "authenticated" && (
							<>
								<DropdownMenuLabel>{loginSession.user?.name}</DropdownMenuLabel>

								<DropdownMenuSeparator />
							</>
						)}

						<DropdownMenuItem onClick={() => signIn("twitch")}>
							<span>Connect Twitch</span>
							<span
								className={cn(
									"ml-2",
									isConnectedTwitch ? "text-purple-500" : ""
								)}
							>
								{isConnectedTwitch && <PiPlugsConnectedBold />}
								{!isConnectedTwitch && <TbPlugConnected />}
							</span>
						</DropdownMenuItem>

						<DropdownMenuItem onClick={() => signIn("google")}>
							<span>Connect Youtube</span>
							<span className={cn("ml-2", isConnectedYT ? "text-red-500" : "")}>
								{isConnectedYT && <PiPlugsConnectedBold />}
								{!isConnectedYT && <TbPlugConnected />}
							</span>
						</DropdownMenuItem>

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>

							<DropdownMenuPortal>
								<DropdownMenuSubContent className="min-w-[5rem]">
									<DropdownMenuItem onClick={() => setTheme("dark")}>
										<Moon className="mr-2 h-4 w-4" />
										<span>Dark</span>
									</DropdownMenuItem>

									<DropdownMenuItem onClick={() => setTheme("light")}>
										<Sun className="mr-2 h-4 w-4" />
										<span>Light</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>

						<DropdownMenuSeparator />

						<DropdownMenuItem
							onClick={() => {
								// fixed bug: NEXTAUTH_URL & NEXTAUTH_SECRET env was not set
								const username = userName?.name
								persistor.purge() // do not await
								dispatch(resetStore()) // Reset redux store

								signOut({
									redirect: false,
									callbackUrl: "/",
								})

								toast.message(
									`We're sorry to see you go ${username}. Come back soon ok? 👋`
								)
								router.refresh()
							}}
						>
							<span>Sign Out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<div className=" max-w-[60%] fixed bottom-10 left-0 right-0">
					{/* <code>{JSON.stringify(youtubeSession, null, 2)}</code> */}
					{/* <code>{JSON.stringify(twitchSession, null, 2)}</code> */}
					<br />
					<br />
				</div>
			</>
		)
	} else {
		return (
			<>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src="" />
								<AvatarFallback>
									<User />
								</AvatarFallback>
							</Avatar>
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => handleSignIn()}>
							<span>Sign In</span>
						</DropdownMenuItem>

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>

							<DropdownMenuPortal>
								<DropdownMenuSubContent className="min-w-[5rem]">
									<DropdownMenuItem onClick={() => setTheme("dark")}>
										<Moon className="mr-2 h-4 w-4" />
										<span>Dark</span>
									</DropdownMenuItem>

									<DropdownMenuItem onClick={() => setTheme("light")}>
										<Sun className="mr-2 h-4 w-4" />
										<span>Light</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			</>
		)
	}
}
