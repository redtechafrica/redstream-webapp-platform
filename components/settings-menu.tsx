"use client"
import { Settings, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type VideoQuality = "auto" | "1080p" | "720p" | "480p" | "360p"
type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2

interface SettingsMenuProps {
  onQualityChange: (quality: VideoQuality) => void
  currentQuality: VideoQuality
  onPlaybackSpeedChange: (speed: PlaybackSpeed) => void
  currentPlaybackSpeed: PlaybackSpeed
  onSubtitlesToggle: () => void
  subtitlesEnabled: boolean
}

export default function SettingsMenu({
  onQualityChange,
  currentQuality,
  onPlaybackSpeedChange,
  currentPlaybackSpeed,
  onSubtitlesToggle,
  subtitlesEnabled,
}: SettingsMenuProps) {
  const playbackSpeeds: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/90 border-gray-800 text-white">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />

        {/* Quality Settings */}
        <DropdownMenuLabel className="text-xs text-gray-400">Quality</DropdownMenuLabel>
        {["auto", "1080p", "720p", "480p", "360p"].map((quality) => (
          <DropdownMenuItem
            key={quality}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-800"
            onClick={() => onQualityChange(quality as VideoQuality)}
          >
            <div className="flex items-center">
              <span>{quality}</span>
              {quality === "1080p" && <span className="ml-2 text-xs text-gray-400">(Best)</span>}
              {quality === "360p" && <span className="ml-2 text-xs text-gray-400">(Data Saver)</span>}
            </div>
            {currentQuality === quality && <Check className="h-4 w-4 text-red-600" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-gray-800" />

        {/* Playback Speed */}
        <DropdownMenuLabel className="text-xs text-gray-400">Playback Speed</DropdownMenuLabel>
        {playbackSpeeds.map((speed) => (
          <DropdownMenuItem
            key={speed}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-800"
            onClick={() => onPlaybackSpeedChange(speed)}
          >
            <span>{speed === 1 ? "Normal" : `${speed}x`}</span>
            {currentPlaybackSpeed === speed && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-gray-800" />

        {/* Subtitles Toggle */}
        <DropdownMenuItem
          className="flex items-center justify-between cursor-pointer hover:bg-gray-800"
          onClick={onSubtitlesToggle}
        >
          <span>Subtitles</span>
          {subtitlesEnabled && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
