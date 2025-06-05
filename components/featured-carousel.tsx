"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Plus, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const featuredContent = [
  {
    id: 1,
    title: "Killer Advice",
    description: "A thrilling journey through the mystical landscapes of a post-apocalyptic world.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    genre: "Adventure",
    year: "2023",
  },
  {
    id: 2,
    title: "Middle (Aarin)",
    description: "Dance with the devil in this gripping tale of redemption and revenge.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
    genre: "Action",
    year: "2023",
  },
  {
    id: 3,
    title: "4th Republic",
    description: "When crisis strikes, heroes emerge from the most unexpected places.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
    genre: "Thriller",
    year: "2025",
  },
]

export default function FeaturedCarousel() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const segmentTimerRef = useRef<NodeJS.Timeout | null>(null)
  const currentItem = featuredContent[currentIndex]
  const { toast } = useToast()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  // Check if current item is in watchlist
  useEffect(() => {
    if (typeof window !== "undefined") {
      const myList = JSON.parse(localStorage.getItem("myList") || "[]")
      setIsInWatchlist(myList.some((item: any) => item.id === currentItem.id))
    }
  }, [currentItem.id])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)
    setShowVideo(false)
    setVideoLoaded(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredContent.length) % featuredContent.length)
    setShowVideo(false)
    setVideoLoaded(false)
  }

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 8000) // Longer interval to allow video to play

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  // Handle video segments
  useEffect(() => {
    if (videoRef.current && showVideo && videoLoaded) {
      // Start with a random segment
      const videoDuration = videoRef.current.duration || 30
      const segmentDuration = 5 // 5 seconds per segment
      const maxStartTime = Math.max(0, videoDuration - segmentDuration)

      const playSegment = () => {
        if (videoRef.current) {
          // Jump to a new random position
          const randomStartTime = Math.floor(Math.random() * maxStartTime)
          videoRef.current.currentTime = randomStartTime
        }
      }

      // Play first segment
      playSegment()

      // Set up segment timer
      segmentTimerRef.current = setInterval(() => {
        playSegment()
      }, segmentDuration * 1000)

      return () => {
        if (segmentTimerRef.current) {
          clearInterval(segmentTimerRef.current)
        }
      }
    }
  }, [showVideo, videoLoaded])

  // Show video after a delay when slide changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  const handleWatchNow = (id: number) => {
    localStorage.setItem("isTransitioning", "true")
    router.push(`/watch/${id}`)
  }

  const toggleWatchlist = () => {
    // Get current list
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    if (isInWatchlist) {
      // Remove from list
      const updatedList = myList.filter((item: any) => item.id !== currentItem.id.toString())
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInWatchlist(false)
      toast({
        title: "Removed from Watchlist",
        description: `"${currentItem.title}" has been removed from your watchlist`,
      })
    } else {
      // Add to list
      const updatedList = [
        ...myList,
        {
          id: currentItem.id.toString(),
          title: currentItem.title,
          image: currentItem.image,
          videoPreview: currentItem.videoPreview,
          genre: currentItem.genre,
          year: currentItem.year,
        },
      ]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInWatchlist(true)
      toast({
        title: "Added to Watchlist",
        description: `"${currentItem.title}" has been added to your watchlist`,
      })
    }
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden h-[400px] md:h-[600px]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>

          {/* Background Image */}
          <Image
            src={currentItem.image || "/placeholder.svg"}
            alt={currentItem.title}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000",
              showVideo && videoLoaded ? "opacity-0" : "opacity-100",
            )}
            priority
          />

          {/* Video Background */}
          {showVideo && currentItem.videoPreview && (
            <video
              ref={videoRef}
              src={currentItem.videoPreview}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              autoPlay
              playsInline
              loop
              onCanPlay={() => setVideoLoaded(true)}
            />
          )}

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-end p-8">
            <motion.div
              className="max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            >
              <motion.h3
                className="text-4xl md:text-5xl font-bold mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {currentItem.title}
              </motion.h3>
              <motion.div
                className="flex items-center text-sm text-gray-300 mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="mr-3">{currentItem.genre}</span>
                <span>{currentItem.year}</span>
              </motion.div>
              <motion.p
                className="text-gray-300 mb-6 text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {currentItem.description}
              </motion.p>
              <motion.div
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  className="bg-brand hover:bg-brand-light text-white px-8 py-7 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand/30"
                  onClick={() => handleWatchNow(currentItem.id)}
                >
                  <Play className="mr-2 h-6 w-6" /> Watch Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-6 py-6 transition-all duration-300 transform hover:scale-105"
                  onClick={toggleWatchlist}
                >
                  {isInWatchlist ? (
                    <>
                      <Check className="mr-2 h-5 w-5" /> In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" /> Add to Watchlist
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* RedStream Logo */}
          <div className="absolute bottom-4 right-4 z-10 transform transition-transform duration-300 hover:scale-110">
            <Image src="/images/redstream-logo.png" alt="REDSTREAM" width={100} height={32} className="opacity-90" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-brand/80 text-white p-3 rounded-full z-30 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-brand/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-brand/80 text-white p-3 rounded-full z-30 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-brand/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 transform",
              index === currentIndex ? "bg-brand w-10 scale-110" : "bg-white/50 hover:bg-white/80 hover:scale-110",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
