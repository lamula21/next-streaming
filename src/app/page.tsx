import { Hero } from "@/components/Hero"
import { Logo } from "@/components/Logo"
import { Sidebar } from "@/components/Sidebar"
import { playlists } from "@/data/playlist"

export default function Home() {
	return (
		<main className="bg-background">
			<div className="flex">
				{/* Aside Nav */}
				<Sidebar className="block" playlists={playlists} />
				{/* Main */}
				<Hero />
			</div>

			<footer />
		</main>
	)
}
