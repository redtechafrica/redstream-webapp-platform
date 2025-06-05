"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import SiteHeader from "@/components/site-header"
import { VideoThumbnail } from "@/components/video-thumbnail"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

// Mock videos data (simplified version from watch page)
const mockVideos = {
  "1": {
    id: "1",
    title: "Killer Advice",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    genre: ["Adventure", "Drama"],
    rating: "PG-13",
  },
  "2": {
    id: "2",
    title: "Middle (Aarin)",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
    genre: ["Action", "Thriller"],
    rating: "R",
  },
  "3": {
    id: "3",
    title: "4th Republic",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
    videoPreview:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
    genre: ["Drama", "Thriller"],
    rating: "PG-13",
  },
  "4": {
    id: "4",
    title: "Wife of Honour",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
    genre: ["Drama", "Sport"],
    rating: "R",
  },
  "5": {
    id: "5",
    title: "Love In Every Word",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
    genre: ["Romance", "Drama"],
    rating: "PG-13",
  },
}

export default function GenrePage() {
  const params = useParams()
  const { slug } = params
  const genreSlug = Array.isArray(slug) ? slug[0] : slug
  const genreName = genreSlug ? genreSlug.charAt(0).toUpperCase() + genreSlug.slice(1) : ""

  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Filter videos by genre
    const videos = Object.values(mockVideos).filter((video) =>
      video.genre.some((g: string) => g.toLowerCase() === genreSlug?.toLowerCase()),
    )

    setFilteredVideos(videos)
    setIsLoading(false)
  }, [genreSlug])

  return (
    <motion.div
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SiteHeader />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">{genreName} Movies & Shows</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredVideos.map((video) => (
              <VideoThumbnail
                key={video.id}
                id={video.id}
                title={video.title}
                image={video.image}
                videoPreview={video.videoPreview}
                aspectRatio="landscape"
                showLogo={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No {genreName} content found</h2>
            <p className="text-gray-400">Try searching for a different genre or check back later for new content.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}
