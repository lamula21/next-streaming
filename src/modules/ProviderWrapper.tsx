"use client"

import { SessionProvider } from "next-auth/react"

interface ProviderWrapperProps {
	// React.ReactNode for typing children prop
	// This component accepts JSX as input
	children: React.ReactNode
}

export function AuthProviderWrapper({ children }: ProviderWrapperProps) {
	return <SessionProvider>{children}</SessionProvider>
}
