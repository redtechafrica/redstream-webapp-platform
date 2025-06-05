"use client"

import { useState, useEffect } from "react"
import SiteHeader from "@/components/site-header"
import { VideoThumbnail } from "@/components/video-thumbnail"
import ContentRow from "@/components/content-row"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"

// Mock documentaries data
const documentaries = [
  {
    id: "d1",
    title: "Princess Oma: The Strong Warrior",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn38.jpg?alt=media&token=61259419-2af4-4978-9ca0-cb8b016ed79c",
    tags: [
      { text: "NEW", type: "new" },
      { text: "Documentary", type: "genre" },
    ],
    year: "2023",
    duration: "1h 45m",
    category: "Culture",
  },
  {
    id: "d2",
    title: "Oloture",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn41.jpg?alt=media&token=04eed53d-a004-4933-a641-e198e0f48859",
    tags: [
      { text: "Documentary", type: "genre" },
      { text: "8.2", type: "rating" },
    ],
    year: "2024",
    duration: "2h 10m",
    category: "Technology",
  },
  {
    id: "d3",
    title: "Japa!",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn40.webp?alt=media&token=89a3ad8d-7be3-4f84-8655-0462671c61bc",
    tags: [{ text: "Documentary", type: "genre" }],
    year: "2023",
    duration: "1h 30m",
    category: "Nature",
  },
  {
    id: "d4",
    title: "October 1",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn39.webp?alt=media&token=57de0426-d243-458e-a0ef-b0a1d5f46236",
    tags: [{ text: "Documentary", type: "genre" }],
    year: "2022",
    duration: "1h 55m",
    category: "Nature",
  },
  {
    id: "d5",
    title: "Anikulapo",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn43.jpg?alt=media&token=2435dda7-34e7-4d36-b79f-89a0385f8833",
    tags: [
      { text: "Documentary", type: "genre" },
      { text: "9.1", type: "rating" },
    ],
    year: "2023",
    duration: "2h 25m",
    category: "History",
  },
  {
    id: "d6",
    title: "Dry",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn42.jpeg?alt=media&token=90e248dd-cf43-4a96-bffa-d7695c6a3d39",
    tags: [
      { text: "NEW", type: "new" },
      { text: "Documentary", type: "genre" },
    ],
    year: "2024",
    duration: "1h 40m",
    category: "Food",
  },
  {
    id: "d7",
    title: "The Trade",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn44.jpg?alt=media&token=943426e2-40d0-427e-af42-27b817390229",
    tags: [{ text: "Documentary", type: "genre" }],
    year: "2023",
    duration: "1h 20m",
    category: "Art",
  },
  {
    id: "d8",
    title: "Penance",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn46.jpg?alt=media&token=95621295-1e1a-4593-9c7c-b9ea2d2f4ba7",
    tags: [
      { text: "Documentary", type: "genre" },
      { text: "8.7", type: "rating" },
    ],
    year: "2022",
    duration: "2h 15m",
    category: "Music",
  },
]

// Documentary categories
const categories = ["All", "Nature", "History", "Culture", "Technology", "Food", "Music", "Art"]

export default function DocumentariesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredDocs, setFilteredDocs] = useState(documentaries)
  const router = useRouter()

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDocs(documentaries)
    } else {
      setFilteredDocs(documentaries.filter((doc) => doc.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Documentaries</h1>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span className="text-sm">Filter by:</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === category ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Documentary */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Documentary</h2>
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn37.jpeg?alt=media&token=d5e7170a-948d-4cf8-8205-1475311ccf4f"
              alt="Featured Documentary"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
              <div className="flex gap-2 mb-3">
                <Badge className="bg-red-600">NEW</Badge>
                <Badge className="bg-gray-800">Documentary</Badge>
                <Badge className="bg-amber-500">9.5</Badge>
              </div>
              <h3 className="text-3xl font-bold mb-2">The Blackbook</h3>
              <p className="text-gray-300 mb-4 max-w-2xl">
                Explore the vibrant cultural and technological renaissance sweeping across Africa as a new generation of
                innovators, artists, and leaders reshape the continent's future.
              </p>
              <div className="flex gap-3 text-sm text-gray-300 mb-4">
                <span>2024</span>
                <span>•</span>
                <span>2h 30m</span>
                <span>•</span>
                <span>Culture, Technology</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 w-fit" onClick={() => router.push("/watch/d1")}>
                Watch Now
              </Button>
            </div>
          </div>
        </div>

        {/* Documentaries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredDocs.map((doc) => (
            <VideoThumbnail
              key={doc.id}
              id={doc.id}
              title={doc.title}
              image={doc.image}
              aspectRatio="landscape"
              showLogo={true}
              tags={doc.tags}
              year={doc.year}
              duration={doc.duration}
            />
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No documentaries found</h2>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Recommended Documentaries */}
      <section className="py-6 container mx-auto px-4">
        <ContentRow title="Award-Winning Documentaries" type="award" />
      </section>

      <section className="py-6 container mx-auto px-4">
        <ContentRow title="Nature & Wildlife" type="trending" />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
