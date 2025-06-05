"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthModal } from "@/components/auth-modal"
import { useRouter, usePathname } from "next/navigation"
import { Search, Bell, ChevronDown, User, LogOut, Settings, List, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/hooks/use-toast"

// Import the useTransition hook
import { useTransition } from "@/components/transition-provider"

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  // Add this inside the component
  const { startTransition } = useTransition()

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      // In a real app, this would check with your auth provider
      const isLoggedIn = localStorage.getItem("user") !== null
      setIsLoggedIn(isLoggedIn)

      // Set default user name if logged in but no name is set
      if (isLoggedIn && !localStorage.getItem("userName")) {
        localStorage.setItem("userName", "David Oludepo")
      }
    }

    checkLoginStatus()
    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"`,
      })
    }
  }

  const handleLogin = () => {
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    // Redirect to landing page
    router.push("/landing")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Determine if we're on the landing page
  const isLandingPage = pathname === "/landing"

  // Don't show header on landing page
  if (isLandingPage) return null

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-appbg shadow-md" : "bg-gradient-to-b from-appbg to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/redstream-logo.png"
                alt="REDSTREAM"
                width={150}
                height={50}
                className="h-[50px] w-auto" // Significantly increased logo size
              />
            </Link>

            {isLoggedIn && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/"
                  className={`text-sm font-semibold hover:text-brand ${pathname === "/" ? "text-brand font-bold" : "text-foreground"}`}
                  onClick={(e) => {
                    if (pathname !== "/") {
                      e.preventDefault()
                      startTransition("/")
                      setTimeout(() => {
                        router.push("/")
                      }, 300)
                    }
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/my-list"
                  className={`text-sm font-semibold hover:text-brand ${pathname === "/my-list" ? "text-brand font-bold" : "text-foreground"}`}
                  onClick={(e) => {
                    if (pathname !== "/my-list") {
                      e.preventDefault()
                      startTransition("/my-list")
                      setTimeout(() => {
                        router.push("/my-list")
                      }, 300)
                    }
                  }}
                >
                  My Watchlist
                </Link>
                <Link
                  href="/documentaries"
                  className={`text-sm font-semibold hover:text-brand ${pathname === "/documentaries" ? "text-brand font-bold" : "text-foreground"}`}
                  onClick={(e) => {
                    if (pathname !== "/documentaries") {
                      e.preventDefault()
                      startTransition("/documentaries")
                      setTimeout(() => {
                        router.push("/documentaries")
                      }, 300)
                    }
                  }}
                >
                  Documentaries
                </Link>

                <Link
                  href="/series"
                  className={`text-sm font-semibold hover:text-brand ${pathname === "/series" ? "text-brand font-bold" : "text-foreground"}`}
                  onClick={(e) => {
                    if (pathname !== "/series") {
                      e.preventDefault()
                      startTransition("/series")
                      setTimeout(() => {
                        router.push("/series")
                      }, 300)
                    }
                  }}
                >
                  Series
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm font-semibold hover:text-brand hover:bg-transparent"
                    >
                      Categories <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-appbg-light border-brand/20 w-48">
                    <DropdownMenuItem className="hover:text-brand font-medium">
                      <Link href="/genre/action" className="w-full">
                        Action
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-brand font-medium">
                      <Link href="/genre/comedy" className="w-full">
                        Comedy
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-brand font-medium">
                      <Link href="/genre/drama" className="w-full">
                        Drama
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-brand font-medium">
                      <Link href="/genre/thriller" className="w-full">
                        Thriller
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-brand font-medium">
                      <Link href="/genre/romance" className="w-full">
                        Romance
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  {isSearchOpen ? (
                    <form onSubmit={handleSearch} className="flex items-center">
                      <Input
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-40 md:w-60 h-9 bg-appbg-light"
                        autoFocus
                        onBlur={() => {
                          if (!searchQuery) setIsSearchOpen(false)
                        }}
                      />
                      <Button type="submit" size="sm" variant="ghost" className="ml-1">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="text-foreground hover:text-brand hover:bg-transparent"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-brand hover:bg-transparent"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <Button variant="ghost" size="icon" className="text-foreground hover:text-brand hover:bg-transparent">
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full flex items-center gap-3 px-3 py-2 hover:bg-brand/10"
                    >
                      <div className="h-9 w-9 rounded-full bg-brand flex items-center justify-center text-white overflow-hidden">
                        {localStorage.getItem("userProfileImage") ? (
                          <Image
                            src={localStorage.getItem("userProfileImage") || ""}
                            alt="Profile"
                            width={36}
                            height={36}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium leading-none">
                          {localStorage.getItem("userName") || "David Oludepo"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Premium Account</p>
                      </div>
                      <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-appbg-light border-brand/20 w-48">
                    <DropdownMenuItem className="hover:text-brand">
                      <List className="mr-2 h-4 w-4" />
                      <Link href="/my-list" className="w-full">
                        My Watchlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-brand">
                      <Settings className="mr-2 h-4 w-4" />
                      <Link href="/settings" className="w-full">
                        Settings & Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:text-brand" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLogin} className="text-foreground hover:text-brand">
                  Sign In
                </Button>
                <Button onClick={handleLogin} className="bg-brand hover:bg-brand-light">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Add spacer for fixed header */}
      <div className="h-14"></div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
