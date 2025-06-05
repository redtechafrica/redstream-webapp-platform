"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  Plus,
  Check,
  Share2,
  ThumbsUp,
  Maximize,
  Minimize,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VideoThumbnail } from "@/components/video-thumbnail"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/footer"
import { cn } from "@/lib/utils"
import LoadingSpinner from "@/components/loading-spinner"
// Import the useTransition hook
import { useTransition } from "@/components/transition-provider"

// Mock video data
const mockVideos = {
  "1": {
    id: "1",
    title: "Killer Advice",
    description:
      "A sorceress travels to the Lost Lands to acquire a mysterious ability, facing dangerous creatures and a warrior who accompanies her on the perilous journey.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
    genre: ["Adventure", "Drama", "Fantasy"],
    year: "2023",
    duration: "1h 45m",
    rating: "PG-13",
    cast: ["Amara Kente", "David Oyelowo", "Lupita Nyong'o"],
    director: "Amma Asante",
    castIds: ["c1", "c2", "c3"],
    awards: ["Best Cinematography - African Film Festival", "Audience Choice Award"],
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "June 15, 2023",
    tags: ["epic", "fantasy", "adventure", "magic"],
  },
  "2": {
    id: "2",
    title: "Middle (Aarin)",
    description:
      "In a crime-ridden city, a detective with a troubled past must solve a series of ritualistic murders while confronting his own demons.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
    genre: ["Action", "Thriller", "Crime"],
    year: "2023",
    duration: "2h 10m",
    rating: "R",
    cast: ["Michael B. Jordan", "Tessa Thompson", "Jonathan Majors"],
    director: "Ryan Coogler",
    castIds: ["c4", "c5", "c6"],
    awards: ["Best Actor - Pan-African Film Festival"],
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "August 22, 2023",
    tags: ["crime", "thriller", "detective", "dark"],
  },
  "3": {
    id: "3",
    title: "4th Republic",
    description:
      "When a natural disaster strikes a coastal city, a team of first responders must race against time to save lives while dealing with their personal crises.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
    genre: ["Drama", "Thriller", "Action"],
    year: "2022",
    duration: "1h 55m",
    rating: "PG-13",
    cast: ["Jonathan Majors", "Priyanka Chopra", "John David Washington"],
    director: "Ava DuVernay",
    castIds: ["c6", "c7", "c8"],
    awards: ["Best Ensemble Cast - Lagos International Film Festival"],
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "November 10, 2022",
    tags: ["disaster", "rescue", "heroes", "suspense"],
  },
  "4": {
    id: "4",
    title: "Wife of Honour",
    description:
      "A tennis coach finds herself caught in a complex love triangle with her husband and his former best friend, both professional tennis players.",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    genre: ["Drama", "Sport", "Romance"],
    year: "2024",
    duration: "2h 10m",
    rating: "R",
    cast: ["Tessa Thompson", "John David Washington", "Michael B. Jordan"],
    director: "Chinonye Chukwu",
    castIds: ["c5", "c8", "c4"],
    awards: ["Best Original Screenplay - African Movie Academy Awards"],
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "February 14, 2024",
    tags: ["tennis", "romance", "competition", "drama"],
  },
  "5": {
    id: "5",
    title: "Love In Every Word",
    description:
      "A renowned poet returns to her hometown and reconnects with her childhood sweetheart, discovering that their shared love of language might rekindle their romance.",
    thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
    genre: ["Romance", "Drama"],
    year: "2022",
    duration: "1h 45m",
    rating: "PG-13",
    cast: ["Lupita Nyong'o", "David Oyelowo", "Priyanka Chopra"],
    director: "Kasi Lemmons",
    castIds: ["c3", "c2", "c7"],
    awards: ["Best Romance Film - Durban International Film Festival"],
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "May 5, 2022",
    tags: ["poetry", "romance", "homecoming", "literature"],
  },
}

// Function to get similar content recommendations
const getSimilarContent = (currentVideoId: string) => {
  const currentVideo = mockVideos[currentVideoId as keyof typeof mockVideos]
  if (!currentVideo) return []

  // Filter videos that share at least one genre with the current video
  return Object.values(mockVideos)
    .filter((video) => video.id !== currentVideoId && video.genre.some((genre) => currentVideo.genre.includes(genre)))
    .slice(0, 8)
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const videoId = Array.isArray(id) ? id[0] : id
  const video = mockVideos[videoId as keyof typeof mockVideos]

  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isInMyList, setIsInMyList] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [videoQuality, setVideoQuality] = useState<"480p" | "720p" | "1080p">("720p")
  const [showQualityMenu, setShowQualityMenu] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const volumeBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()
  // Add this inside the component
  const { startTransition } = useTransition()

  // Check if video exists
  const videoNotFound = !video

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Remove any loading overlay that might have been added by the thumbnail component
      const loadingOverlay = document.querySelector(".fixed.inset-0.bg-black\\/80.z-50")
      if (loadingOverlay) {
        loadingOverlay.remove()
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Get recommendations
  useEffect(() => {
    if (videoId) {
      setRecommendations(getSimilarContent(videoId))
    }
  }, [videoId])

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Check if video is in my list
  useEffect(() => {
    if (!videoId) return

    // Get my list from localStorage
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")
    setIsInMyList(myList.some((item: { id: string }) => item.id === videoId))

    // Check if video is liked
    const likedVideos = JSON.parse(localStorage.getItem("likedVideos") || "[]")
    setIsLiked(likedVideos.includes(videoId))
  }, [videoId])

  // Save to watch history when video starts playing
  useEffect(() => {
    if (isPlaying && video) {
      // Get current watch history
      const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]")

      // Remove this video if it already exists in history
      const filteredHistory = watchHistory.filter((item: { id: string }) => item.id !== videoId)

      // Add this video to the beginning of history
      const updatedHistory = [
        {
          id: videoId,
          title: video.title,
          image: video.thumbnailUrl,
          progress: 0, // Will be updated as video plays
          timestamp: new Date().getTime(),
        },
        ...filteredHistory,
      ].slice(0, 10) // Keep only the 10 most recent items

      localStorage.setItem("watchHistory", JSON.stringify(updatedHistory))
    }
  }, [isPlaying, video, videoId])

  // Update watch progress
  useEffect(() => {
    if (isPlaying && progress > 0 && video) {
      const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]")
      const updatedHistory = watchHistory.map((item: any) => {
        if (item.id === videoId) {
          return { ...item, progress }
        }
        return item
      })
      localStorage.setItem("watchHistory", JSON.stringify(updatedHistory))
    }
  }, [progress, isPlaying, video, videoId])

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      const current = videoElement.currentTime
      const videoDuration = videoElement.duration
      setCurrentTime(current)
      // Add a check to prevent NaN
      setProgress(videoDuration ? (current / videoDuration) * 100 : 0)
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(100)
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Auto-hide controls after inactivity
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      setShowControls(true)

      if (isPlaying && !isDragging) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    resetControlsTimeout()

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying, isDragging])

  // Play/pause video
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
      setIsPlaying(true)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.muted = false
      setIsMuted(false)
    } else {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  // Change volume
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return

    const newVolume = Number.parseFloat(e.target.value)
    videoRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
      videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const seekTime = (Number.parseFloat(e.target.value) / 100) * videoRef.current.duration
    videoRef.current.currentTime = seekTime
    setProgress(Number.parseFloat(e.target.value))
  }

  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const seekTime = clickPosition * videoRef.current.duration

    videoRef.current.currentTime = seekTime
    setProgress(clickPosition * 100)
  }

  // Handle volume bar click
  const handleVolumeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || !videoRef.current) return

    const rect = volumeBarRef.current.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const newVolume = Math.max(0, Math.min(1, clickPosition))

    videoRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
      videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Add/remove from my list
  const toggleMyList = () => {
    if (!videoId || !video) return

    // Get current list
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    if (isInMyList) {
      // Remove from list
      const updatedList = myList.filter((item: { id: string }) => item.id !== videoId)
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(false)
      toast({
        title: "Removed from Watchlist",
        description: `"${video.title}" has been removed from your watchlist.`,
      })
    } else {
      // Add to list with all necessary information
      const updatedList = [
        ...myList,
        {
          id: videoId,
          title: video.title,
          image: video.thumbnailUrl,
          videoPreview: video.videoUrl,
          genre: video.genre[0],
          year: video.year,
        },
      ]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(true)
      toast({
        title: "Added to Watchlist",
        description: `"${video.title}" has been added to your watchlist.`,
      })
    }
  }

  // Toggle like
  const toggleLike = () => {
    if (!videoId) return

    // Get liked videos
    const likedVideos = JSON.parse(localStorage.getItem("likedVideos") || "[]")

    if (isLiked) {
      // Remove like
      const updatedLikes = likedVideos.filter((id: string) => id !== videoId)
      localStorage.setItem("likedVideos", JSON.stringify(updatedLikes))
      setIsLiked(false)
    } else {
      // Add like
      const updatedLikes = [...likedVideos, videoId]
      localStorage.setItem("likedVideos", JSON.stringify(updatedLikes))
      setIsLiked(true)
      toast({
        title: "Liked",
        description: `You liked "${video.title}".`,
      })
    }
  }

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Video link copied to clipboard.",
    })
  }

  // Update the navigateToCast function
  const navigateToCast = (castId: string) => {
    // Start the transition
    startTransition("Cast Details")

    // Navigate after a short delay
    setTimeout(() => {
      router.push(`/cast/${castId}`)
    }, 300)
  }

  // Change video quality
  const changeVideoQuality = (quality: "480p" | "720p" | "1080p") => {
    setVideoQuality(quality)
    setShowQualityMenu(false)

    // In a real app, this would change the video source
    toast({
      title: "Quality Changed",
      description: `Video quality set to ${quality}`,
    })
  }

  if (videoNotFound) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-6">The video you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="bg-brand hover:bg-brand-light text-white px-6 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-xl">Loading {video.title}...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      {/* Video Player */}
      <div
        ref={videoContainerRef}
        className={cn("relative w-full bg-black", isFullscreen ? "fixed inset-0 z-50" : "aspect-video")}
        onMouseMove={() => {
          setShowControls(true)
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
          }
          if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
              setShowControls(false)
            }, 3000)
          }
        }}
      >
        {/* Video Element */}
        <div className="relative w-full h-full" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            className="w-full h-full object-contain cursor-pointer"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => {
              if (videoRef.current) {
                const current = videoRef.current.currentTime
                const videoDuration = videoRef.current.duration
                setCurrentTime(current)
                setProgress(videoDuration ? (current / videoDuration) * 100 : 0)
              }
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration)
              }
            }}
            onEnded={() => {
              setIsPlaying(false)
              setProgress(100)
            }}
          />

          {/* Play/Pause Overlay - Make sure it's always visible when paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 z-10"
              >
                <div className="bg-brand/80 rounded-full p-6 backdrop-blur-sm">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 z-20"
            >
              {/* Top Controls */}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-black/20"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{video.title}</h2>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="space-y-2">
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium min-w-[40px]">{formatTime(currentTime)}</span>
                  <div
                    ref={progressBarRef}
                    className="relative flex-1 h-2 bg-gray-600/50 rounded-full group cursor-pointer"
                    onClick={handleProgressBarClick}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-brand rounded-full transition-all duration-100"
                      style={{ width: `${isNaN(progress) ? 0 : progress}%` }}
                    ></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-brand rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform"
                      style={{ left: `${isNaN(progress) ? 0 : progress}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isNaN(progress) ? 0 : progress}
                      onChange={handleSeek}
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-sm font-medium min-w-[40px] text-right">{formatTime(duration)}</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Play/Pause Button */}
                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>

                    {/* Volume Controls */}
                    <div className="relative group flex items-center">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={toggleMute}>
                        {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>

                      <div
                        className="hidden group-hover:flex items-center h-8 bg-gray-800/90 rounded-full px-2 ml-1"
                        style={{ width: "100px" }}
                      >
                        <div
                          ref={volumeBarRef}
                          className="relative w-full h-1.5 bg-gray-600 rounded-full cursor-pointer"
                          onClick={handleVolumeBarClick}
                        >
                          <div
                            className="absolute top-0 left-0 h-full bg-brand rounded-full"
                            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={changeVolume}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Video Quality Selector */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-black/20 text-sm h-9 px-2"
                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                      >
                        {videoQuality}
                      </Button>

                      {showQualityMenu && (
                        <div className="absolute bottom-full mb-1 left-0 bg-gray-800/95 rounded-md shadow-lg p-1 z-50">
                          <div className="flex flex-col">
                            {["1080p", "720p", "480p"].map((quality) => (
                              <button
                                key={quality}
                                className={`px-4 py-2 text-sm text-left rounded hover:bg-gray-700 ${
                                  videoQuality === quality ? "bg-gray-700" : ""
                                }`}
                                onClick={() => changeVideoQuality(quality as "480p" | "720p" | "1080p")}
                              >
                                {quality}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <span className="text-sm font-medium ml-2">{video.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add to List Button */}
                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={toggleMyList}>
                      {isInMyList ? <Check className="h-6 w-6 text-brand" /> : <Plus className="h-6 w-6" />}
                    </Button>

                    {/* Like Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-black/20 ${isLiked ? "text-brand" : ""}`}
                      onClick={toggleLike}
                    >
                      <ThumbsUp className={`h-6 w-6 ${isLiked ? "fill-brand text-brand" : ""}`} />
                    </Button>

                    {/* Share Button */}
                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={handleShare}>
                      <Share2 className="h-6 w-6" />
                    </Button>

                    {/* Fullscreen Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-black/20"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Info Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{video.title}</h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
                <span>{video.year}</span>
                <span>•</span>
                <span>{video.duration}</span>
                <span>•</span>
                <span>{video.rating}</span>
                <div className="flex gap-2 ml-2">
                  {video.genre.map((genre) => (
                    <Link key={genre} href={`/genre/${genre.toLowerCase()}`}>
                      <Badge variant="outline" className="border-gray-600 hover:bg-gray-700 cursor-pointer">
                        {genre}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed">{video.description}</p>
            </div>

            {/* Right Column - Cast */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 gap-4">
                {video.cast.map((actor, index) => (
                  <motion.div
                    key={actor}
                    className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => navigateToCast(video.castIds[index])}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="aspect-square rounded-md bg-gray-700 mb-2 overflow-hidden">
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Frichard-mofe-damijo.png?alt=media&token=e37fdaa1-6a83-4647-b46c-75e50479f56b"
                        alt={actor}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-center">{actor}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-12 border-t border-gray-800 pt-8">
              <h2 className="text-2xl font-bold mb-6">More Like This</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recommendations.map((rec) => (
                  <VideoThumbnail
                    key={rec.id}
                    id={rec.id}
                    title={rec.title}
                    image={rec.thumbnailUrl}
                    videoPreview={rec.videoPreview}
                    aspectRatio="landscape"
                    showLogo={false}
                    tags={rec.genre.map((g: string) => ({ text: g, type: "genre" }))}
                    year={rec.year}
                    duration={rec.duration}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
