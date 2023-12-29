import { Main } from "@/components/Main"
import { Sidebar } from "@/components/Sidebar"

export default function Home() {
	return (
		<main className="bg-background">
			<div className="flex">
				{/* Aside Nav */}
				<Sidebar className="block" />
				{/* Main */}
				<Main />
			</div>

			<footer />
		</main>
	)
}
