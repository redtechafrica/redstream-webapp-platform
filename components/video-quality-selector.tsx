"use client"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

type VideoQuality = "auto" | "1080p" | "720p" | "480p" | "360p"

interface VideoQualitySelectorProps {
  onQualityChange: (quality: VideoQuality) => void
  currentQuality: VideoQuality
}

export default function VideoQualitySelector({ onQualityChange, currentQuality }: VideoQualitySelectorProps) {
  const qualities: VideoQuality[] = ["auto", "1080p", "720p", "480p", "360p"]
  const [isOpen, setIsOpen] = useState(false)

  // Add visual feedback when quality changes
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showFeedback])

  const handleQualitySelect = (quality: VideoQuality) => {
    onQualityChange(quality)
    setIsOpen(false)
    setShowFeedback(true)
  }

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-sm bg-black/50 hover:bg-black/70 px-3 py-1 rounded-md"
          >
            <span className="flex items-center">
              Quality: <span className="font-medium ml-1">{currentQuality}</span>
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black/90 border-gray-800 text-white w-40">
          {qualities.map((quality) => (
            <DropdownMenuItem
              key={quality}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800"
              onClick={() => handleQualitySelect(quality)}
            >
              <div className="flex items-center">
                <span>{quality}</span>
                {quality === "1080p" && <span className="ml-2 text-xs text-gray-400">(Best)</span>}
                {quality === "360p" && <span className="ml-2 text-xs text-gray-400">(Data Saver)</span>}
              </div>
              {currentQuality === quality && <Check className="h-4 w-4 text-red-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {showFeedback && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-red-600 text-white text-xs py-1 px-2 rounded text-center animate-pulse">
          Quality changed to {currentQuality}
        </div>
      )}
    </div>
  )
}
