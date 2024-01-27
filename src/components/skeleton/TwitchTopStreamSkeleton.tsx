import { Skeleton } from "../ui/skeleton"

export function TopStreamsSkeleton() {
	return (
		<div className="mt-8 select-none gap-3 grid-cols-2 sm:grid sm:px-6 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6">
			<div className="aspect-video">
				<div className="flex flex-col gap-1">
					<Skeleton className="aspect-video animate-pulse" />
					<Skeleton className="w-[80%] h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
				</div>
			</div>

			<div className="aspect-video">
				<div className="flex flex-col gap-1">
					<Skeleton className="aspect-video animate-pulse" />
					<Skeleton className="w-[80%] h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
				</div>
			</div>

			<div className="aspect-video">
				<div className="flex flex-col gap-1">
					<Skeleton className="aspect-video animate-pulse" />
					<Skeleton className="w-[80%] h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
					<Skeleton className="w-20 h-4 animate-pulse" />
				</div>
			</div>

			<div className="aspect-video">
				<div className="flex flex-col gap-1">
					<Skeleton className="animate-pulse aspect-video" />
					<Skeleton className="animate-pulse w-[80%] h-4" />
					<Skeleton className="animate-pulse w-20 h-4" />
					<Skeleton className="animate-pulse w-20 h-4" />
				</div>
			</div>

			<div className="aspect-video">
				<div className="flex flex-col gap-1">
					<Skeleton className="animate-pulse aspect-video" />
					<Skeleton className="animate-pulse w-[80%] h-4" />
					<Skeleton className="animate-pulse w-20 h-4" />
					<Skeleton className="animate-pulse w-20 h-4" />
				</div>
			</div>
		</div>
	)
}
