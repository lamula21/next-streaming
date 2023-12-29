import { Main } from "@/components/Main"
import { Sidebar } from "@/components/Sidebar"
import { playlists } from "@/data/playlist"

export default function Home() {
	return (
		<main className="bg-background">
			<div className="flex">
				{/* Aside Nav */}
				<Sidebar className="block" playlists={playlists} />
				{/* Main */}
				<Main />
			</div>

			<footer />
		</main>
	)
}
