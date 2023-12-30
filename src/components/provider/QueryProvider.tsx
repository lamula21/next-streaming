"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface LayoutProps {
	children: ReactNode
}

const queryClient = new QueryClient()

export function QueryProvider({ children }: LayoutProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	)
}
