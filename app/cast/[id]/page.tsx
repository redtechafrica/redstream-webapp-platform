"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import SiteHeader from "@/components/site-header"
import { VideoThumbnail } from "@/components/video-thumbnail"
import { motion } from "framer-motion"
import Image from "next/image"
import Footer from "@/components/footer"

// Mock cast data
const castMembers = {
  c1: {
    id: "c1",
    name: "Amara Kente",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Famara-kente.png?alt=media&token=bbb58a0a-1bb5-4b4d-ac50-c9deae5fa2f8",
    bio: "Amara Kente is a rising star in African cinema, known for her powerful performances and emotional depth. Born in Ghana and raised in South Africa, she brings a unique perspective to her roles.",
    filmography: [1, 3, 5],
  },
  c2: {
    id: "c2",
    name: "David Oyelowo",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Fdavid-oyelowo.png?alt=media&token=cc16c553-80b1-4396-b4b0-7c302fbddfdb",
    bio: "David Oyelowo is a British-American actor and producer. He has played supporting roles in the films Rise of the Planet of the Apes, Lincoln, and Jack Reacher. His accolades include a Critics' Choice Award and two Golden Globe Award nominations.",
    filmography: [1, 4],
  },
  c3: {
    id: "c3",
    name: "Lupita Nyong'o",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Fadesua-etomi.png?alt=media&token=ec8d0eb6-ea1a-4282-98c6-61fa57047032",
    bio: "Lupita Nyong'o is a Kenyan-Mexican actress. She made her feature film debut with a supporting role in the action film Non-Stop, followed by her breakthrough role in 12 Years a Slave, for which she received critical acclaim.",
    filmography: [1, 6],
  },
  c4: {
    id: "c4",
    name: "Michael B. Jordan",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Frichard-mofe-damijo.png?alt=media&token=e37fdaa1-6a83-4647-b46c-75e50479f56b",
    bio: "Michael B. Jordan is an American actor and producer. He is known for his roles in Fruitvale Station, Creed, and Black Panther. He has been named one of the 100 most influential people in the world by Time magazine.",
    filmography: [2, 4],
  },
  c5: {
    id: "c5",
    name: "Tessa Thompson",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Fgenevieve-nnaji.png?alt=media&token=7e09021b-3e18-43d9-88f9-e3e7e1bb56ab",
    bio: "Tessa Thompson is an American actress, producer, and singer. She began her professional acting career with the Los Angeles Women's Shakespeare Company. She has starred in various films and television series.",
    filmography: [2, 5],
  },
  c6: {
    id: "c6",
    name: "Jonathan Majors",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Fidris-elba.png?alt=media&token=47180e04-478f-4ad2-b042-6a78fe349ca2",
    bio: "Jonathan Majors is an American actor. He rose to prominence after starring in the independent feature film The Last Black Man in San Francisco. He has since appeared in several major productions including Lovecraft Country and Ant-Man and the Wasp: Quantumania, establishing himself as one of Hollywood's most versatile actors.",
    filmography: [2, 3],
  },
  c7: {
    id: "c7",
    name: "Priyanka Chopra",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Fadesua-etomi.png?alt=media&token=ec8d0eb6-ea1a-4282-98c6-61fa57047032",
    bio: "Priyanka Chopra Jonas is an Indian actress, model, and singer. She is one of India's highest-paid actresses and has received numerous accolades including a National Film Award and five Filmfare Awards.",
    filmography: [3, 5],
  },
  c8: {
    id: "c8",
    name: "John David Washington",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Frichard-mofe-damijo.png?alt=media&token=e37fdaa1-6a83-4647-b46c-75e50479f56b",
    bio: "John David Washington is an American actor and former football running back. He is known for his roles in BlacKkKlansman, Tenet, and Malcolm & Marie.",
    filmography: [3, 4],
  },
}

// Mock videos data (simplified version from watch page)
const mockVideos = {
  "1": {
    id: "1",
    title: "Killer Advice",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
  },
  "2": {
    id: "2",
    title: "Middle (Aarin)",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
  },
  "3": {
    id: "3",
    title: "4th Republic",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
  },
  "4": {
    id: "4",
    title: "Wife of Honour",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
  },
  "5": {
    id: "5",
    title: "Love In Every Word",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
  },
  "6": {
    id: "6",
    title: "Lugard",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn6.jpeg?alt=media&token=7b7fc719-8480-4f74-849e-baed834ef989",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
  },
}

export default function CastMemberPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const castId = Array.isArray(id) ? id[0] : id

  const [isTransitioning, setIsTransitioning] = useState(true)
  const castMember = castMembers[castId as keyof typeof castMembers]

  // Check if cast member exists
  const castNotFound = !castMember

  // Get filmography
  const filmography =
    castMember?.filmography.map((id) => mockVideos[id.toString() as keyof typeof mockVideos]).filter(Boolean) || []

  // Check for transition state
  useEffect(() => {
    const transitionState = localStorage.getItem("isTransitioning")
    setIsTransitioning(transitionState === "true")

    // Clear transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false)
      localStorage.removeItem("isTransitioning")

      // Remove any loading overlay that might have been added
      const loadingOverlay = document.querySelector(".fixed.inset-0.bg-black\\/80.z-50")
      if (loadingOverlay) {
        loadingOverlay.remove()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (castNotFound) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Cast Member Not Found</h1>
          <p className="text-gray-400 mb-6">The cast member you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="bg-brand hover:bg-brand-light text-white px-6 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white"
      initial={{ opacity: isTransitioning ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <div className="relative rounded-xl overflow-hidden aspect-square mb-4">
              <Image
                src={castMember.image || "/placeholder.svg"}
                alt={castMember.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{castMember.name}</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">{castMember.bio}</p>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Filmography</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filmography.map((film) => (
                <VideoThumbnail
                  key={film.id}
                  id={film.id}
                  title={film.title}
                  image={film.image}
                  videoPreview={film.videoUrl}
                  aspectRatio="landscape"
                  showLogo={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
