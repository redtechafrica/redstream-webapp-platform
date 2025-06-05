"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Award,
  Clock,
  Film,
  Users,
  Sparkles,
  Star,
  Gamepad,
  Popcorn,
  Tv,
  History,
  Play,
} from "lucide-react"
import FeaturedCarousel from "@/components/featured-carousel"
import ContentRow from "@/components/content-row"
import SiteHeader from "@/components/site-header"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Image from "next/image"

// Additional content rows for the home page
const contentCategories = [
  { title: "Trending Now", icon: <TrendingUp className="h-5 w-5 text-brand" />, type: "trending" },
  { title: "Award Winners", icon: <Award className="h-5 w-5 text-brand" />, type: "award" },
  { title: "New Releases", icon: <Clock className="h-5 w-5 text-brand" />, type: "new" },
  { title: "Kids & Family", icon: <Users className="h-5 w-5 text-brand" />, type: "family" },
  { title: "Action & Adventure", icon: <Film className="h-5 w-5 text-brand" />, type: "action" },
  { title: "Series", icon: <Tv className="h-5 w-5 text-brand" />, type: "series" },
  { title: "REDSTREAM Originals", icon: <Sparkles className="h-5 w-5 text-brand" />, type: "originals" },
]

// Additional content sections for the bottom of the page
const additionalSections = [
  {
    title: "Top 10 in Africa Today",
    icon: <Star className="h-5 w-5 text-brand" />,
    type: "trending", // Changed from "top10" to "trending"
    description: "The most-watched content across the continent right now",
  },
  {
    title: "Gaming Universe",
    icon: <Gamepad className="h-5 w-5 text-brand" />,
    type: "action", // Changed from "gaming" to "action"
    description: "Shows and movies inspired by your favorite video games",
  },
  {
    title: "Weekend Bingeworthy",
    icon: <Popcorn className="h-5 w-5 text-brand" />,
    type: "series", // Changed from "binge" to "series"
    description: "Perfect series to watch from start to finish this weekend",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [continueWatching, setContinueWatching] = useState<any[]>([])
  const [hasContinueWatching, setHasContinueWatching] = useState(false)

  // Check authentication and handle redirection
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check if user has previously logged in (browser recognition)
      const user = localStorage.getItem("user")
      const lastVisit = localStorage.getItem("lastVisit")
      const currentTime = new Date().getTime()

      // If user was logged in within the last 30 days, auto-login
      if (!user && lastVisit && currentTime - Number.parseInt(lastVisit) < 30 * 24 * 60 * 60 * 1000) {
        // Auto-login returning user
        localStorage.setItem("user", JSON.stringify({ autoLogin: true }))
      }

      // Update last visit timestamp
      localStorage.setItem("lastVisit", currentTime.toString())

      // For debugging - remove in production
      console.log("User in localStorage:", user)

      if (!user) {
        // User is not authenticated, redirect to landing page
        router.push("/landing")
      } else {
        // User is authenticated, stay on home page
        setIsLoading(false)

        // Get continue watching data
        const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]")
        if (watchHistory.length > 0) {
          setContinueWatching(watchHistory)
          setHasContinueWatching(true)
        }
      }

      // Clear any transition state when landing on the home page
      localStorage.removeItem("isTransitioning")
    }
  }, [router])

  // Show loading or return the home page content
  if (isLoading) {
    return (
      <div className="min-h-screen bg-appbg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your personalized experience...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-appbg text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-16">
        <FeaturedCarousel />
      </section>

      {/* Continue Watching Section (only shows if user has watch history) */}
      {hasContinueWatching && (
        <motion.section
          className="py-6 container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-2 flex items-center">
            <History className="h-5 w-5 text-brand mr-2" />
            <h2 className="text-2xl font-semibold">Continue Watching</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {continueWatching.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-[280px]">
                <div className="relative">
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg?height=400&width=600"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                      <h3 className="text-white font-medium text-sm md:text-base">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
                        {item.progress && (
                          <div className="w-full h-1 bg-gray-600 rounded-full mt-2">
                            <div className="h-full bg-brand rounded-full" style={{ width: `${item.progress}%` }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center"
                      onClick={() => router.push(`/watch/${item.id}`)}
                    >
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Content Rows */}
      {contentCategories.map((category, index) => (
        <motion.section
          key={category.type}
          className="py-6 container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <ContentRow title={category.title} icon={category.icon} type={category.type} />
        </motion.section>
      ))}

      {/* Family Watching Section */}
      <motion.section
        className="py-12 container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden">
            <img src="/images/family-watching.png" alt="Family enjoying REDSTREAM" className="w-full h-auto" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Share the Experience</h2>
            <p className="text-gray-300 dark:text-gray-300 text-lg">
              REDSTREAM brings families together with content everyone can enjoy. From thrilling adventures to
              heartwarming stories, there's something for every member of your household.
            </p>
            <Button className="bg-brand hover:bg-brand-light text-white mt-4">Get Family Plan</Button>
          </div>
        </div>
      </motion.section>

      {/* Additional Content Sections */}
      {additionalSections.map((section, index) => (
        <motion.section
          key={section.type}
          className="py-8 container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
        >
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-brand">{section.icon}</span>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
          </div>
          <p className="text-gray-400 mb-6">{section.description}</p>
          <ContentRow type={section.type} />
        </motion.section>
      ))}

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}
