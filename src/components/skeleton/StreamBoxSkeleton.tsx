import { Skeleton } from "../ui/skeleton"

export function StreamBoxSkeleton() {
	return (
		<Skeleton className="aspect-video w-full h-full bg-transparent border-2 border-dashed animate-in fade-in duration-1000">
			<span className="text-2xl lg:text-4xl max-w-5xl">
				Connect to Twitch or Youtube to Start Streaming
			</span>
		</Skeleton>
	)
}
