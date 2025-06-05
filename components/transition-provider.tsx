"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import LoadingSpinner from "@/components/loading-spinner"

interface TransitionContextType {
  isLoading: boolean
  startTransition: (destination: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isLoading: false,
  startTransition: () => {},
})

export const useTransition = () => useContext(TransitionContext)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const pathname = usePathname()

  // Reset loading state when path changes
  useEffect(() => {
    setIsLoading(false)
  }, [pathname])

  const startTransition = (destination: string) => {
    // Extract page name from destination
    let pageName = "page"

    if (destination === "/") {
      pageName = "Home"
    } else if (destination.includes("/my-list")) {
      pageName = "My Watchlist"
    } else if (destination.includes("/documentaries")) {
      pageName = "Documentaries"
    } else if (destination.includes("/series")) {
      pageName = "Series"
    } else if (destination.includes("/cast")) {
      pageName = "Cast Details"
    } else if (destination.includes("/watch")) {
      pageName = destination.split("/").pop() || "Content"
    } else {
      // Try to extract the last part of the path
      const parts = destination.split("/").filter(Boolean)
      if (parts.length > 0) {
        pageName = parts[parts.length - 1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      }
    }

    setLoadingText(`Loading ${pageName}...`)
    setIsLoading(true)
  }

  return (
    <TransitionContext.Provider value={{ isLoading, startTransition }}>
      {children}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white text-lg">{loadingText}</p>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}
