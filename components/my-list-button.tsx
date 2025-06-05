"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MyListButtonProps {
  movieId: string
  title: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function MyListButton({ movieId, title, variant = "outline", size = "default" }: MyListButtonProps) {
  const [isInList, setIsInList] = useState(false)
  const { toast } = useToast()

  // Check if movie is in list on component mount
  useEffect(() => {
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")
    setIsInList(myList.some((item: { id: string }) => item.id === movieId))
  }, [movieId])

  const toggleMyList = () => {
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    if (isInList) {
      // Remove from list
      const updatedList = myList.filter((item: { id: string }) => item.id !== movieId)
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInList(false)

      toast({
        title: "Removed from My List",
        description: `"${title}" has been removed from your list`,
        variant: "default",
      })
    } else {
      // Add to list
      const updatedList = [...myList, { id: movieId, title }]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInList(true)

      toast({
        title: "Added to My List",
        description: `"${title}" has been added to your list`,
        variant: "default",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleMyList}
      className={isInList ? "bg-brand hover:bg-brand-light text-white" : ""}
    >
      {isInList ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          In My List
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add to My List
        </>
      )}
    </Button>
  )
}
