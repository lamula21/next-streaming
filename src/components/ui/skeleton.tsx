import { cn } from "@/lib/utils"

function Skeleton({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"rounded-md bg-muted flex justify-center items-center",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export { Skeleton }
