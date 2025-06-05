"use client"

import { useState, useEffect } from "react"
import SiteHeader from "@/components/site-header"
import { VideoThumbnail } from "@/components/video-thumbnail"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"

interface MyListItem {
  id: string
  title: string
  image: string
  videoPreview?: string
  genre?: string
  year?: string
  duration?: string
}

export default function MyListPage() {
  const [myList, setMyList] = useState<MyListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load my list from localStorage
    const savedList = JSON.parse(localStorage.getItem("myList") || "[]")
    setMyList(savedList)
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:text-brand">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : myList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myList.map((movie) => (
              <VideoThumbnail
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.image}
                videoPreview={movie.videoPreview}
                year={movie.year}
                genre={movie.genre}
                duration={movie.duration}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl mb-4">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-6">Add movies and shows to your list to watch them later</p>
            <Link href="/">
              <Button className="bg-brand hover:bg-brand-light">Browse Content</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
