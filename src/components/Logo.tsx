import Image from "next/image"
import Link from "next/link"

export function Logo() {
	return (
		<div className="flex flex-row pr-2 items-end gap-3 mb-4">
			<Link href="/">
				<Image
					src="/logo.png"
					alt="StreamHub Logo"
					className=""
					width={48}
					height={48}
				/>
			</Link>

			<div className="hidden lg:flex flex-col text-xl font-black">
				<span>Trevo</span>
				<span>Tv</span>
			</div>
		</div>
	)
}
