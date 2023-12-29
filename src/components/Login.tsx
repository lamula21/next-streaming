"use client"

import { Moon, Sun, User } from "lucide-react"
import { PiPlugsConnectedBold } from "react-icons/pi"
import { TbPlugConnected } from "react-icons/tb"
import { useTheme } from "next-themes"
import { signIn, signOut, useSession } from "next-auth/react"
import { persistor } from "@/modules/store"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { StoreState } from "@/types/redux-types"
import { fetchTokenValidation } from "@/services/twitch-api"
import { toast } from "sonner"
import {
	resetStore,
	saveLoginSession,
	saveTwitchSession,
	saveYoutubeSession,
	twitchChannels,
	youtubeChannels,
} from "@/modules/slice"

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

export function Login() {
	const router = useRouter()

	const { setTheme } = useTheme()

	const { data: session, status } = useSession()

	console.log(session)

	const dispatch = useDispatch()
	const loginSession = useSelector(
		(state: StoreState) => state.counter.loginSession,
		shallowEqual
	)
	const twitchSession = useSelector(
		(state: StoreState) => state.counter.twitchSession,
		shallowEqual
	)
	const youtubeSession = useSelector(
		(state: StoreState) => state.counter.youtubeSession,
		shallowEqual
	)

	let isConnectedTwitch = twitchSession?.accessToken !== undefined
	let isConnectedYT = youtubeSession?.accessToken !== undefined

	// useCallback memoize a function to avoid unnecessary re-renders
	// Note: use useMemo() to memoize a value or a function value
	const handleSignOutWhenTokenExpired = () => {
		persistor.purge() // do not await
		dispatch(resetStore()) // Reset redux store

		signOut({
			redirect: false,
			callbackUrl: "/",
		})
		router.refresh()
		toast.error("Session expired, please sign in again")
	}

	const getTwitchChannels = async () => {
		const res = await fetch("/api/get-twitch-channels", {
			cache: "no-store",
			headers: {
				Authorization: `OAuth ${twitchSession.accessToken}`,
			},
		})

		// Token expired
		if (res.status === 401) {
			handleSignOutWhenTokenExpired()
		}

		if (res.ok) {
			const data = await res.json()
			console.log("PRObLEM HERE?")
			dispatch(twitchChannels(data)) // problem here?
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
				Authorization: `OAuth ${youtubeSession}`,
			},
		})

		if (res.status === 401) {
			// console.log("401")
			// toast.message("Sorry! We ran out of Youtube API quota. Try it tomorrow", {
			// 	description: "Quotas restart at 12:00 AM PST (Pacific Standard Time)",
			// })
		}

		if (res.ok) {
			const data = await res.json()
			dispatch(youtubeChannels(data))
		}
	}

	const validateSession = async () => {
		if (loginSession?.provider !== undefined) {
			console.log(loginSession)
			const response = await fetchTokenValidation(loginSession)

			if (!response.ok) {
				handleSignOutWhenTokenExpired()
			}
		}
	}

	// A mechanism to save Twitch and Youtube session separately
	useEffect(() => {
		// this runs one time after logging in
		if (loginSession?.accessToken === undefined) {
			if (session !== null) {
				dispatch(saveLoginSession(session))
			}
		}

		// connecting again, save platform session
		if (session?.provider === "twitch") {
			console.log(session)
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
		if (!twitchSession) return

		console.log(twitchSession)
		getTwitchChannels()
	}, [twitchSession])

	useEffect(() => {
		if (!youtubeSession) return

		getYoutubeChannels()
	}, [youtubeSession])

	if (loginSession) {
		return (
			<div>
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
								const username = session?.name
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
			</div>
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
						<DropdownMenuItem onClick={() => signIn()}>
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
