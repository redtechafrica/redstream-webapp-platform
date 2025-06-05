"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface AddToListButtonProps {
  movieId: string | number
  movieTitle: string
  movieImage: string
  videoPreview?: string
  genre?: string[]
  year?: string
  variant?: "icon" | "button"
  className?: string
}

export default function AddToListButton({
  movieId,
  movieTitle,
  movieImage,
  videoPreview,
  genre,
  year,
  variant = "button",
  className,
}: AddToListButtonProps) {
  const { toast } = useToast()
  const [isInList, setIsInList] = useState(false)

  // Check if movie is already in list
  useEffect(() => {
    const savedList = localStorage.getItem("myList")
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList)
        const exists = parsedList.some((item: any) => item.id === movieId)
        setIsInList(exists)
      } catch (error) {
        console.error("Error parsing saved list:", error)
      }
    }
  }, [movieId])

  const toggleSaveToList = () => {
    const savedList = localStorage.getItem("myList")
    let currentList = []

    if (savedList) {
      try {
        currentList = JSON.parse(savedList)
      } catch (error) {
        console.error("Error parsing saved list:", error)
      }
    }

    if (isInList) {
      // Remove from list
      const updatedList = currentList.filter((item: any) => item.id !== movieId)
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInList(false)

      toast({
        title: "Removed from My List",
        description: `"${movieTitle}" has been removed from your list.`,
        variant: "success",
      })
    } else {
      // Add to list
      const movieToAdd = {
        id: movieId,
        title: movieTitle,
        image: movieImage,
        videoPreview,
        genre,
        year,
        addedAt: Date.now(),
      }

      const updatedList = [...currentList, movieToAdd]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInList(true)

      toast({
        title: "Added to My List",
        description: `"${movieTitle}" has been added to your list.`,
        variant: "success",
      })
    }
  }

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          toggleSaveToList()
        }}
        className={`p-2 rounded-full ${isInList ? "text-brand" : "text-white hover:text-brand"} ${className}`}
        title={isInList ? "Remove from My List" : "Add to My List"}
      >
        <Heart className={`h-5 w-5 ${isInList ? "fill-brand" : ""}`} />
      </button>
    )
  }

  return (
    <Button
      variant={isInList ? "default" : "outline"}
      className={`${isInList ? "bg-brand hover:bg-brand-light" : "border-white text-white hover:border-brand hover:text-brand"} ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggleSaveToList()
      }}
    >
      <Heart className={`mr-2 h-4 w-4 ${isInList ? "fill-white" : ""}`} />
      {isInList ? "In My List" : "Add to List"}
    </Button>
  )
}
