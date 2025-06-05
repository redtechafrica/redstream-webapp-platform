"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Play, Plus, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Update the video thumbnail to use the TransitionProvider
// Import the useTransition hook
import { useTransition } from "@/components/transition-provider"

// Update the VideoThumbnailProps interface to accept both string and number for id and rating
interface VideoThumbnailProps {
  id: string | number
  title: string
  image: string
  rating?: string | number | null
  year?: string
  genre?: string
  videoPreview?: string
  videoUrl?: string
  aspectRatio?: "portrait" | "landscape" | "square"
  showLogo?: boolean
  tags?: Array<{ text: string; type: string }>
  duration?: string
}

export function VideoThumbnail({
  id,
  title,
  image,
  rating,
  year,
  genre,
  videoPreview,
  videoUrl, // Added this property
  aspectRatio = "landscape",
  showLogo = false,
  tags,
  duration,
}: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Add this inside the component
  const { startTransition } = useTransition()

  // Update the isInMyList useState initialization
  const [isInMyList, setIsInMyList] = useState(() => {
    // Check if this item is in My List
    if (typeof window !== "undefined") {
      const myList = JSON.parse(localStorage.getItem("myList") || "[]")
      return myList.some((item: any) => item.id === id.toString())
    }
    return false
  })

  // In the VideoThumbnail function, convert id to string when using it
  const toggleMyList = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Get current list
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    if (isInMyList) {
      // Remove from list
      const updatedList = myList.filter((item: any) => item.id !== id.toString())
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(false)
      toast({
        title: "Removed from Watchlist",
        description: `"${title}" has been removed from your watchlist`,
      })
    } else {
      // Add to list
      const updatedList = [...myList, { id: id.toString(), title, image, videoPreview, genre, year, duration }]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(true)
      toast({
        title: "Added to Watchlist",
        description: `"${title}" has been added to your watchlist`,
      })
    }
  }

  // Update the handleClick function
  const handleClick = () => {
    const stringId = id.toString()
    let destination = `/watch/${stringId}`

    // Check if it's a documentary or series
    if (stringId.startsWith("d")) {
      destination = `/watch/${stringId}`
    } else if (stringId.startsWith("s")) {
      destination = `/watch/series/${stringId}`
    }

    // Start the transition
    startTransition(title)

    // Navigate after a short delay
    setTimeout(() => {
      router.push(destination)
    }, 300)
  }

  const aspectRatioClass = {
    landscape: "aspect-video",
    portrait: "aspect-[2/3]",
    square: "aspect-square",
  }[aspectRatio]

  // Use videoPreview or videoUrl, whichever is available
  const videoSource = videoPreview || videoUrl

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div
        ref={thumbnailRef}
        className={`relative ${aspectRatioClass} rounded-md overflow-hidden group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <Image
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1 z-10">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className={`text-xs ${
                  tag.type === "new"
                    ? "bg-brand"
                    : tag.type === "rating"
                      ? "bg-amber-500"
                      : "bg-gray-800/80 backdrop-blur-sm"
                }`}
              >
                {tag.text}
              </Badge>
            ))}
          </div>
        )}

        {/* My List Button */}
        <button
          className="absolute top-2 right-2 z-10 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
          onClick={toggleMyList}
        >
          {isInMyList ? <Check className="h-4 w-4 text-brand" /> : <Plus className="h-4 w-4 text-white" />}
        </button>

        {/* Rising Bottom Bar */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="bg-brand rounded-full p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Play className="h-4 w-4 md:h-6 md:w-6 text-white" fill="white" />
            </motion.div>
          </div>

          {/* Content Info */}
          <div className="z-10">
            <h3 className="text-white font-medium line-clamp-1 text-sm md:text-base">{title}</h3>

            {/* Metadata */}
            {(rating || year || genre || duration) && (
              <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
                {rating && (
                  <Badge variant="outline" className="text-[10px] h-4 border-brand/50">
                    {rating}
                  </Badge>
                )}
                {year && <span>{year}</span>}
                {genre && <span>{genre}</span>}
                {duration && <span>{duration}</span>}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
