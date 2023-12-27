import Link from "next/link"

export function Logo() {
	return (
		<div className="flex flex-row pr-2 items-end gap-3">
			<Link href="/">
				<img src="/logo.png" alt="StreamHub Logo" className="w-14" />
			</Link>

			<div className="hidden lg:flex flex-col text-xl font-black">
				<span>Watch</span>
				<span>Tv</span>
			</div>
		</div>
	)
}
