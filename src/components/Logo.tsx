import Image from "next/image"
import Link from "next/link"
import { SandBoxLogo } from "./icons"

export function Logo() {
	return (
		<div className="flex flex-row pr-2 items-end gap-3 mb-4">
			<Link href="/">
				<SandBoxLogo className="w-14 h-14 fill-white " />
			</Link>

			<div className="hidden lg:flex flex-col text-xl font-black">
				<span>SandBox</span>
				<span>.tv</span>
			</div>
		</div>
	)
}
