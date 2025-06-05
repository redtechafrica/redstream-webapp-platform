import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TransitionProvider } from "@/components/transition-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "REDSTREAM - African Stories, Global Stage",
  description: "Stream exclusive original content and curated classics from across Africa and beyond.",
}

export const viewport: Viewport = {
  themeColor: "#8f5f43",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TransitionProvider>
            {children}
            <Toaster />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
