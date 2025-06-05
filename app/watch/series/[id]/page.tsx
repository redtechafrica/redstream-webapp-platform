"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Play, Plus, Check, Calendar, Film, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

// Mock series data
const seriesData = {
  s1: {
    id: "s1",
    title: "Lagos Chronicles",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Follow the interconnected lives of Lagos residents as they navigate love, career, and politics in Nigeria's bustling metropolis.",
    seasons: 3,
    episodes: 24,
    year: "2023",
    genre: ["Drama", "Romance"],
    rating: "16+",
    featured: true,
    cast: ["Amara Kente", "David Oyelowo", "Lupita Nyong'o"],
    director: "Amma Asante",
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "June 15, 2023",
    seasonData: [
      {
        season: 1,
        episodes: [
          {
            id: "s1e1",
            title: "New Beginnings",
            description: "Adebola moves to Lagos to start a new job at a prestigious law firm.",
            duration: "45m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s1e2",
            title: "First Impressions",
            description: "Adebola meets her colleagues and makes both friends and enemies.",
            duration: "42m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s1e3",
            title: "The Case",
            description: "Adebola is assigned her first major case, defending a controversial client.",
            duration: "47m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s1e4",
            title: "City Lights",
            description: "Adebola explores Lagos nightlife and meets a mysterious stranger.",
            duration: "44m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
        ],
      },
      {
        season: 2,
        episodes: [
          {
            id: "s2e1",
            title: "One Year Later",
            description: "Adebola has established herself at the firm but faces new challenges.",
            duration: "46m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s2e2",
            title: "Political Moves",
            description: "A high-profile political case threatens Adebola's career.",
            duration: "48m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s2e3",
            title: "Family Ties",
            description: "Adebola's family visits Lagos, bringing complications.",
            duration: "45m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
        ],
      },
      {
        season: 3,
        episodes: [
          {
            id: "s3e1",
            title: "New Horizons",
            description: "Adebola considers a career change that could change everything.",
            duration: "50m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s3e2",
            title: "Crossroads",
            description: "Personal and professional decisions collide for Adebola.",
            duration: "52m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
        ],
      },
    ],
  },
  s3: {
    id: "s3",
    title: "Tribal Wars",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Set in pre-colonial Africa, this epic series follows two rival kingdoms as they battle for supremacy and resources.",
    seasons: 2,
    episodes: 16,
    year: "2022",
    genre: ["Action", "Historical"],
    rating: "18+",
    featured: true,
    cast: ["John David Washington", "Lupita Nyong'o", "Daniel Kaluuya"],
    director: "Ryan Coogler",
    language: "English",
    subtitles: ["English", "French", "Spanish"],
    releaseDate: "August 22, 2022",
    seasonData: [
      {
        season: 1,
        episodes: [
          {
            id: "s3s1e1",
            title: "Kingdoms",
            description: "The series begins with the introduction of the two rival kingdoms.",
            duration: "55m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s3s1e2",
            title: "First Blood",
            description: "Tensions escalate as the first conflict between the kingdoms erupts.",
            duration: "52m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s3s1e3",
            title: "Alliances",
            description: "Both kingdoms seek allies among neighboring tribes.",
            duration: "54m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
        ],
      },
      {
        season: 2,
        episodes: [
          {
            id: "s3s2e1",
            title: "The Great War",
            description: "The conflict between the kingdoms reaches its peak.",
            duration: "58m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s3s2e2",
            title: "Betrayal",
            description: "A shocking betrayal changes the course of the war.",
            duration: "56m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
          {
            id: "s3s2e3",
            title: "Peace Talks",
            description: "Leaders from both kingdoms meet to discuss peace.",
            duration: "55m",
            thumbnail: "/placeholder.svg?height=400&width=600",
          },
        ],
      },
    ],
  },
}

// Similar series recommendations
const similarSeries = [
  {
    id: "s2",
    title: "Savannah Secrets",
    image: "/placeholder.svg?height=400&width=600",
    seasons: 1,
    genre: ["Mystery", "Thriller"],
  },
  {
    id: "s4",
    title: "Doctors of Nairobi",
    image: "/placeholder.svg?height=400&width=600",
    seasons: 4,
    genre: ["Drama", "Medical"],
  },
  {
    id: "s5",
    title: "Desert Roses",
    image: "/placeholder.svg?height=400&width=600",
    seasons: 3,
    genre: ["Drama", "Romance"],
  },
  {
    id: "s6",
    title: "Cape Town Detectives",
    image: "/placeholder.svg?height=400&width=600",
    seasons: 2,
    genre: ["Crime", "Mystery"],
  },
]

export default function SeriesWatchPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const seriesId = Array.isArray(id) ? id[0] : id
  const series = seriesData[seriesId as keyof typeof seriesData]

  const [activeSeason, setActiveSeason] = useState(1)
  const [isInMyList, setIsInMyList] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null)

  // Check if series exists
  const seriesNotFound = !series

  // Check if series is in my list
  useEffect(() => {
    if (!seriesId) return

    // Get my list from localStorage
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")
    setIsInMyList(myList.some((item: { id: string }) => item.id === seriesId))
  }, [seriesId])

  // Toggle add to my list
  const toggleMyList = () => {
    if (!seriesId || !series) return

    // Get current list
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    if (isInMyList) {
      // Remove from list
      const updatedList = myList.filter((item: { id: string }) => item.id !== seriesId)
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(false)
      toast({
        title: "Removed from My List",
        description: `"${series.title}" has been removed from your list.`,
      })
    } else {
      // Add to list with all necessary information
      const updatedList = [
        ...myList,
        {
          id: seriesId,
          title: series.title,
          image: series.image,
          genre: series.genre[0],
          year: series.year,
        },
      ]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      setIsInMyList(true)
      toast({
        title: "Added to My List",
        description: `"${series.title}" has been added to your list.`,
      })
    }
  }

  // Handle episode selection
  const handleEpisodeSelect = (episodeId: string) => {
    setSelectedEpisode(episodeId)
    // In a real app, this would navigate to the episode player
    toast({
      title: "Playing Episode",
      description: "This would play the selected episode in a real app.",
    })
  }

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Series link copied to clipboard.",
    })
  }

  if (seriesNotFound) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Series Not Found</h1>
          <p className="text-gray-400 mb-6">The series you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="bg-brand hover:bg-brand-light text-white px-6 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image src={series.image || "/placeholder.svg"} alt={series.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-24 left-4 text-white hover:bg-black/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>

            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-3">
                {series.genre.map((genre) => (
                  <Badge key={genre} className="bg-brand">
                    {genre}
                  </Badge>
                ))}
                <Badge variant="outline">{series.rating}</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-3">{series.title}</h1>

              <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                <span>{series.year}</span>
                <span>•</span>
                <span>{series.seasons} Seasons</span>
                <span>•</span>
                <span>{series.episodes} Episodes</span>
              </div>

              <p className="text-gray-300 mb-6 text-lg max-w-2xl">{series.description}</p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-brand hover:bg-brand-light text-white px-8">
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={toggleMyList}>
                  {isInMyList ? <Check className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
                  {isInMyList ? "In My List" : "Add to List"}
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Series Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Episodes */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Episodes</h2>

            <Tabs
              defaultValue={activeSeason.toString()}
              onValueChange={(value) => setActiveSeason(Number.parseInt(value))}
            >
              <TabsList className="bg-gray-900 mb-6">
                {series.seasonData.map((season) => (
                  <TabsTrigger key={season.season} value={season.season.toString()}>
                    Season {season.season}
                  </TabsTrigger>
                ))}
              </TabsList>

              {series.seasonData.map((season) => (
                <TabsContent key={season.season} value={season.season.toString()}>
                  <div className="space-y-4">
                    {season.episodes.map((episode) => (
                      <motion.div
                        key={episode.id}
                        className={`bg-gray-900 rounded-lg overflow-hidden cursor-pointer ${
                          selectedEpisode === episode.id ? "ring-2 ring-brand" : ""
                        }`}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => handleEpisodeSelect(episode.id)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-48 aspect-video md:aspect-[16/9]">
                            <Image
                              src={episode.thumbnail || "/placeholder.svg"}
                              alt={episode.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold">{episode.title}</h3>
                              <span className="text-sm text-gray-400">{episode.duration}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{episode.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Right Column - Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Details</h2>

            <div className="bg-gray-900 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {series.cast.map((actor) => (
                    <Badge key={actor} variant="outline" className="bg-gray-800 hover:bg-gray-700">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p>{series.director}</p>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-brand mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Release Date</p>
                  <p>{series.releaseDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Film className="h-5 w-5 text-brand mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Language</p>
                  <p>{series.language}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Subtitles</h3>
                <div className="flex flex-wrap gap-2">
                  {series.subtitles.map((subtitle) => (
                    <Badge key={subtitle} variant="outline" className="bg-gray-800">
                      {subtitle}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Series */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">More Series You Might Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarSeries.map((item) => (
              <div key={item.id} className="cursor-pointer" onClick={() => router.push(`/watch/series/${item.id}`)}>
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center text-xs text-gray-300">
                        <span>
                          {item.seasons} {item.seasons === 1 ? "Season" : "Seasons"}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{item.genre.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
