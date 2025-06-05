"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Check, Star, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

// Mock series data
const seriesData = [
  {
    id: "s1",
    title: "Night of the Kings",
    description:
      "Follow the intertwined lives of Lagos residents as they navigate love, power, and ambition in Nigeria's most vibrant city.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn45.png?alt=media&token=4acefdc8-e914-43a6-a901-6cbe214badcb",
    banner: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn451.webp?alt=media&token=d82e545d-5232-4f64-94da-64db9dda0130",
    genre: ["Drama", "Romance"],
    year: "2023",
    seasonsCount: 3,
    episodesCount: 24,
    rating: 8.7,
    cast: ["Genevieve Nnaji", "Richard Mofe-Damijo", "Adesua Etomi"],
    creator: "Kemi Adetiba",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "New Beginnings", duration: "52m" },
          { number: 2, title: "The Meeting", duration: "48m" },
          { number: 3, title: "Revelations", duration: "55m" },
          { number: 4, title: "Betrayal", duration: "50m" },
          { number: 5, title: "Consequences", duration: "54m" },
          { number: 6, title: "Redemption", duration: "58m" },
          { number: 7, title: "New Horizons", duration: "51m" },
          { number: 8, title: "The Finale", duration: "65m" },
        ],
      },
      {
        number: 2,
        episodes: [
          { number: 1, title: "Fresh Start", duration: "54m" },
          { number: 2, title: "Complications", duration: "52m" },
          { number: 3, title: "Alliances", duration: "49m" },
          { number: 4, title: "Breaking Point", duration: "55m" },
          { number: 5, title: "Reconciliation", duration: "50m" },
          { number: 6, title: "Moving Forward", duration: "53m" },
          { number: 7, title: "Crossroads", duration: "51m" },
          { number: 8, title: "Season Finale", duration: "68m" },
        ],
      },
      {
        number: 3,
        episodes: [
          { number: 1, title: "New Chapter", duration: "56m" },
          { number: 2, title: "Unexpected", duration: "53m" },
          { number: 3, title: "Turning Tables", duration: "52m" },
          { number: 4, title: "Confrontations", duration: "54m" },
          { number: 5, title: "Decisions", duration: "51m" },
          { number: 6, title: "Consequences", duration: "55m" },
          { number: 7, title: "Resolution", duration: "57m" },
          { number: 8, title: "Series Finale", duration: "75m" },
        ],
      },
    ],
  },
  {
    id: "s2",
    title: "Nowhere in Africa",
    description:
      "A wildlife photographer uncovers dark secrets in a small town on the edge of the savannah, putting her life in danger.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn47.webp?alt=media&token=b4a71e83-59fd-440e-98e2-bf7483a3d0c1",
    banner: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn471.jpg?alt=media&token=22689ad6-18f8-4a1f-a88c-44e61b0c203f",
    genre: ["Mystery", "Thriller"],
    year: "2024",
    seasonsCount: 1,
    episodesCount: 10,
    rating: 8.2,
    cast: ["Lupita Nyong'o", "Chiwetel Ejiofor", "John Boyega"],
    creator: "Amma Asante",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "The Arrival", duration: "58m" },
          { number: 2, title: "First Impressions", duration: "55m" },
          { number: 3, title: "Beneath the Surface", duration: "54m" },
          { number: 4, title: "Dangerous Territory", duration: "56m" },
          { number: 5, title: "The Discovery", duration: "57m" },
          { number: 6, title: "No Way Out", duration: "59m" },
          { number: 7, title: "Allies and Enemies", duration: "55m" },
          { number: 8, title: "The Truth", duration: "58m" },
          { number: 9, title: "Confrontation", duration: "60m" },
          { number: 10, title: "Season Finale", duration: "65m" },
        ],
      },
    ],
  },
  {
    id: "s3",
    title: "Abejoye",
    description:
      "In pre-colonial Africa, two rival kingdoms must unite against a common enemy threatening their existence.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn48.webp?alt=media&token=9cbb1af1-aeb4-4082-8295-4d6345aeb872",
    banner: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn481.jpg?alt=media&token=64d988d9-a3ce-45a2-b580-3dc72d998c82",
    genre: ["Action", "Historical"],
    year: "2022",
    seasonsCount: 2,
    episodesCount: 16,
    rating: 9.1,
    cast: ["Daniel Kaluuya", "Danai Gurira", "Winston Duke"],
    creator: "Ryan Coogler",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "Divided Lands", duration: "62m" },
          { number: 2, title: "First Blood", duration: "58m" },
          { number: 3, title: "The Messenger", duration: "60m" },
          { number: 4, title: "Alliances", duration: "59m" },
          { number: 5, title: "The Gathering Storm", duration: "61m" },
          { number: 6, title: "Battle Lines", duration: "63m" },
          { number: 7, title: "Sacrifice", duration: "60m" },
          { number: 8, title: "A New Dawn", duration: "65m" },
        ],
      },
      {
        number: 2,
        episodes: [
          { number: 1, title: "Aftermath", duration: "61m" },
          { number: 2, title: "Rebuilding", duration: "59m" },
          { number: 3, title: "New Threats", duration: "60m" },
          { number: 4, title: "The Council", duration: "58m" },
          { number: 5, title: "Betrayal", duration: "62m" },
          { number: 6, title: "The Siege", duration: "64m" },
          { number: 7, title: "Last Stand", duration: "63m" },
          { number: 8, title: "Legacy", duration: "70m" },
        ],
      },
    ],
  },
  {
    id: "s4",
    title: "Rogue Heroes",
    description:
      "The personal and professional lives of doctors at Nairobi's busiest hospital as they face medical challenges and personal dilemmas.",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn49.jpg?alt=media&token=51b18a54-de01-4054-94d5-1a255880af10",
    banner: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn491.jpg?alt=media&token=77996f4b-bb11-48f3-9cc0-648d0af81e83",
    genre: ["Drama", "Medical"],
    year: "2023",
    seasonsCount: 4,
    episodesCount: 40,
    rating: 8.5,
    cast: ["Wunmi Mosaku", "David Oyelowo", "Thuso Mbedu"],
    creator: "Shonda Rhimes",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "First Day", duration: "55m" },
          { number: 2, title: "Complications", duration: "52m" },
          { number: 3, title: "Code Blue", duration: "54m" },
          { number: 4, title: "Tough Choices", duration: "53m" },
          { number: 5, title: "Breaking Point", duration: "55m" },
          { number: 6, title: "Recovery", duration: "52m" },
          { number: 7, title: "New Cases", duration: "54m" },
          { number: 8, title: "Graduation Day", duration: "60m" },
        ],
      },
      {
        number: 2,
        episodes: [
          { number: 1, title: "New Beginnings", duration: "54m" },
          { number: 2, title: "Under Pressure", duration: "53m" },
          { number: 3, title: "Outbreak", duration: "55m" },
          { number: 4, title: "Personal Matters", duration: "52m" },
          { number: 5, title: "Critical Condition", duration: "56m" },
          { number: 6, title: "Decisions", duration: "54m" },
          { number: 7, title: "The Night Shift", duration: "55m" },
          { number: 8, title: "Moving Forward", duration: "58m" },
        ],
      },
    ],
  },
]

export default function SeriesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSeries, setSelectedSeries] = useState<any>(null)
  const [selectedSeason, setSelectedSeason] = useState(1)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")

  // Check authentication and handle redirection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (!user) {
        router.push("/landing")
      } else {
        setIsLoading(false)
      }
    }
  }, [router])

  const handleSeriesSelect = (series: any) => {
    setSelectedSeries(series)
    setSelectedSeason(1) // Reset to first season when selecting a new series
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWatchNow = (seriesId: string, season = 1, episode = 1) => {
    router.push(`/watch/series/${seriesId}?season=${season}&episode=${episode}`)
  }

  const addToWatchlist = (series: any) => {
    // Get current watchlist
    const myList = JSON.parse(localStorage.getItem("myList") || "[]")

    // Check if already in watchlist
    const isInList = myList.some((item: any) => item.id === series.id)

    if (isInList) {
      // Remove from watchlist
      const updatedList = myList.filter((item: any) => item.id !== series.id)
      localStorage.setItem("myList", JSON.stringify(updatedList))
      toast({
        title: "Removed from Watchlist",
        description: `"${series.title}" has been removed from your watchlist`,
      })
    } else {
      // Add to watchlist
      const updatedList = [
        ...myList,
        {
          id: series.id,
          title: series.title,
          image: series.image,
          videoPreview: series.videoUrl,
          genre: series.genre[0],
          year: series.year,
          duration: `${series.seasonsCount} Seasons`,
        },
      ]
      localStorage.setItem("myList", JSON.stringify(updatedList))
      toast({
        title: "Added to Watchlist",
        description: `"${series.title}" has been added to your watchlist`,
      })
    }
  }

  // Check if series is in watchlist
  const isInWatchlist = (seriesId: string) => {
    if (typeof window !== "undefined") {
      const myList = JSON.parse(localStorage.getItem("myList") || "[]")
      return myList.some((item: any) => item.id === seriesId)
    }
    return false
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-appbg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading series...</p>
        </div>
      </div>
    )
  }

  // Find the current season's episodes
  const getCurrentSeasonEpisodes = () => {
    if (!selectedSeries) return []

    const currentSeason = selectedSeries.seasons.find((s: any) => s.number === selectedSeason)
    return currentSeason ? currentSeason.episodes : []
  }

  return (
    <div className="min-h-screen bg-appbg text-white">
      <SiteHeader />

      <div className="pt-16">
        {/* Selected Series Detail */}
        {selectedSeries ? (
          <div>
            {/* Hero Banner */}
            <div className="relative h-[50vh] md:h-[60vh]">
              <div className="absolute inset-0 bg-gradient-to-t from-appbg via-appbg/50 to-transparent z-10"></div>
              <Image
                src={selectedSeries.banner || "/placeholder.svg"}
                alt={selectedSeries.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-20">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedSeries.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
                      <Badge className="bg-brand">{selectedSeries.rating}</Badge>
                      <span>{selectedSeries.year}</span>
                      <span>•</span>
                      <span>{selectedSeries.seasonsCount} Seasons</span>
                      <span>•</span>
                      <span>{selectedSeries.episodesCount} Episodes</span>
                      <div className="flex gap-2 ml-2">
                        {selectedSeries.genre.map((genre: string) => (
                          <Badge key={genre} variant="outline" className="border-gray-600">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 max-w-3xl mb-6">{selectedSeries.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        className="bg-brand hover:bg-brand-light text-white px-6 py-6"
                        onClick={() => handleWatchNow(selectedSeries.id)}
                      >
                        <Play className="mr-2 h-5 w-5" /> Watch Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/10"
                        onClick={() => addToWatchlist(selectedSeries)}
                      >
                        {isInWatchlist(selectedSeries.id) ? (
                          <>
                            <Check className="mr-2 h-5 w-5" /> In Watchlist
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-5 w-5" /> Add to Watchlist
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Series Info */}
            <div className="container mx-auto px-4 py-8">
              {/* Season Selector */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Episodes</h2>
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                  {selectedSeries.seasons.map((season: any) => (
                    <Button
                      key={season.number}
                      variant={selectedSeason === season.number ? "default" : "outline"}
                      className={selectedSeason === season.number ? "bg-brand hover:bg-brand-light" : ""}
                      onClick={() => setSelectedSeason(season.number)}
                    >
                      Season {season.number}
                    </Button>
                  ))}
                </div>

                {/* Episodes List */}
                <div className="grid gap-4">
                  {getCurrentSeasonEpisodes().map((episode: any) => (
                    <motion.div
                      key={`${selectedSeason}-${episode.number}`}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-lg font-medium mr-3">E{episode.number}.</span>
                            <h3 className="text-lg font-medium">{episode.title}</h3>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{episode.duration}</span>
                          </div>
                        </div>
                        <Button
                          className="mt-3 md:mt-0 bg-brand hover:bg-brand-light"
                          onClick={() => handleWatchNow(selectedSeries.id, selectedSeason, episode.number)}
                        >
                          <Play className="h-4 w-4 mr-2" /> Play
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cast */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {selectedSeries.cast.map((actor: string, index: number) => (
                    <div key={index} className="text-center">
                      <div className="aspect-square rounded-full bg-gray-700 mb-2 overflow-hidden mx-auto w-24 h-24">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt={actor}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{actor}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Series */}
              <Button variant="outline" className="mt-12" onClick={() => setSelectedSeries(null)}>
                Back to All Series
              </Button>
            </div>
          </div>
        ) : (
          /* Series Grid */
          <div className="container mx-auto px-4 py-8 pt-16">
            <h1 className="text-3xl font-bold mb-8">Series</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {seriesData.map((series) => (
                <motion.div
                  key={series.id}
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleSeriesSelect(series)}
                >
                  <div className="relative aspect-[2/3]">
                    <Image src={series.image || "/placeholder.svg"} alt={series.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                      <h2 className="text-lg font-bold">{series.title}</h2>
                      <div className="flex items-center text-sm mt-1">
                        <Star className="h-4 w-4 text-brand mr-1" />
                        <span className="mr-2">{series.rating}</span>
                        <span className="mr-2">•</span>
                        <span>
                          {series.seasonsCount} {series.seasonsCount > 1 ? "Seasons" : "Season"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {series.genre.map((g) => (
                          <Badge key={g} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
