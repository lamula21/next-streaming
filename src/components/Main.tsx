import { StreamArea } from "./StreamArea"
import { Navbar } from "./Navbar"

export function Main() {
	return (
		<main className="w-full ml-[64px] lg:ml-[216px] py-6 pr-6 ">
			<div className="flex flex-col space-y-4">
				<Navbar />
				<StreamArea />
			</div>
		</main>
	)
}
