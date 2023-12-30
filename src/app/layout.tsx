import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Providers } from "@/modules/provider"
import { AuthProviderWrapper } from "@/modules/ProviderWrapper"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { QueryProvider } from "@/components/provider/QueryProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Trevo Tv - Stream Platform",
	description: "The ultimate stream platform for Twitch and Youtube",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<QueryProvider>
					<AuthProviderWrapper>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Providers>{children}</Providers>
						</ThemeProvider>
					</AuthProviderWrapper>
				</QueryProvider>
				<Toaster position="bottom-right" richColors />
				<TailwindIndicator />
			</body>
		</html>
	)
}
