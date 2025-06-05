"use client"

import { useState, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { VideoThumbnail } from "./video-thumbnail"

// Updated mock data with real images and video previews
const contentRows = {
  trending: [
    {
      id: 1,
      title: "Killer Advice",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
      tags: [
        { text: "NEW", type: "new" },
        { text: "Adventure", type: "genre" },
      ],
      year: "2023",
      duration: "2h 15m",
      genre: "Adventure",
      rating: null,
    },
    {
      id: 2,
      title: "Middle (Aarin)",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
      tags: [
        { text: "Action", type: "genre" },
        { text: "8.4", type: "rating" },
      ],
      year: "2023",
      duration: "2h 30m",
      genre: "Action",
      rating: 8.4,
    },
    {
      id: 3,
      title: "4th Republic",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
      tags: [
        { text: "Drama", type: "genre" },
        { text: "7.9", type: "rating" },
      ],
      year: "2023",
      duration: "2h 00m",
      genre: "Drama",
      rating: 7.9,
    },
    {
      id: 4,
      title: "Wife of Honour",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
      tags: [{ text: "Sport", type: "genre" }],
      year: "2024",
      duration: "2h 10m",
      genre: "Sport",
      rating: null,
    },
    {
      id: 5,
      title: "Love In Every Word",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 45m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 6,
      title: "Lugard",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn6.jpeg?alt=media&token=7b7fc719-8480-4f74-849e-baed834ef989",
      tags: [{ text: "Documentary", type: "genre" }],
      year: "2021",
      duration: "1h 30m",
      genre: "Documentary",
      rating: null,
    },
    {
      id: 7,
      title: "Stella's Dilemma",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn5.jpg?alt=media&token=ebb3e57d-af90-434d-b6ff-dc0b162259e3",
      tags: [{ text: "Drama", type: "genre" }],
      year: "2020",
      duration: "1h 50m",
      genre: "Drama",
      rating: null,
    },
    {
      id: 8,
      title: "Seven Six",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn25.webp?alt=media&token=8f0d32fb-8603-4e4f-8a59-a5251a03ea05",
      tags: [{ text: "Mystery", type: "genre" }],
      year: "2024",
      duration: "2h 05m",
      genre: "Mystery",
      rating: null,
    },
  ],
  award: [
    {
      id: 3,
      title: "4th Republic",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
      tags: [
        { text: "Drama", type: "genre" },
        { text: "7.9", type: "rating" },
      ],
      year: "2023",
      duration: "2h 00m",
      genre: "Drama",
      rating: 7.9,
    },
    {
      id: 4,
      title: "Wife of Honour",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
      tags: [{ text: "Sport", type: "genre" }],
      year: "2024",
      duration: "2h 10m",
      genre: "Sport",
      rating: null,
    },
    {
      id: 5,
      title: "Love In Every Word",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 45m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 1,
      title: "Killer Advice",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
      tags: [
        { text: "NEW", type: "new" },
        { text: "Adventure", type: "genre" },
      ],
      year: "2023",
      duration: "2h 15m",
      genre: "Adventure",
      rating: null,
    },
    {
      id: 2,
      title: "Seven Six",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn25.webp?alt=media&token=8f0d32fb-8603-4e4f-8a59-a5251a03ea05",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
      tags: [
        { text: "Action", type: "genre" },
        { text: "8.4", type: "rating" },
      ],
      year: "2023",
      duration: "2h 30m",
      genre: "Action",
      rating: 8.4,
    },
    {
      id: 6,
      title: "Triangle Trouble",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn4.jpg?alt=media&token=7de832e8-6a0e-4723-9a71-b7c56fc3216e",
      tags: [{ text: "Fantasy", type: "genre" }],
      year: "2021",
      duration: "1h 55m",
      genre: "Fantasy",
      rating: null,
    },
  ],
  new: [
    {
      id: 5,
      title: "Love In Every Word",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 45m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 2,
      title: "Seven Six",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn25.webp?alt=media&token=8f0d32fb-8603-4e4f-8a59-a5251a03ea05",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
      tags: [
        { text: "Action", type: "genre" },
        { text: "8.4", type: "rating" },
      ],
      year: "2023",
      duration: "2h 30m",
      genre: "Action",
      rating: 8.4,
    },
    {
      id: 3,
      title: "4th Republic",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
      tags: [
        { text: "Drama", type: "genre" },
        { text: "7.9", type: "rating" },
      ],
      year: "2023",
      duration: "2h 00m",
      genre: "Drama",
      rating: 7.9,
    },
    {
      id: 4,
      title: "Wife of Honour",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
      tags: [{ text: "Sport", type: "genre" }],
      year: "2024",
      duration: "2h 10m",
      genre: "Sport",
      rating: null,
    },
    {
      id: 1,
      title: "Killer Advice",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
      tags: [
        { text: "NEW", type: "new" },
        { text: "Adventure", type: "genre" },
      ],
      year: "2023",
      duration: "2h 15m",
      genre: "Adventure",
      rating: null,
    },
    {
      id: 7,
      title: "Stella's Dilemma",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn5.jpg?alt=media&token=ebb3e57d-af90-434d-b6ff-dc0b162259e3",
      tags: [{ text: "Drama", type: "genre" }],
      year: "2020",
      duration: "1h 50m",
      genre: "Drama",
      rating: null,
    },
  ],
  family: [
    {
      id: 5,
      title: "Love In Every Word",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 45m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 4,
      title: "Wife of Honour",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn18.jpg?alt=media&token=8d442f24-2352-4b5f-98cb-6950b4c4825c",
      tags: [{ text: "Sport", type: "genre" }],
      year: "2024",
      duration: "2h 10m",
      genre: "Sport",
      rating: null,
    },
    {
      id: 7,
      title: "Stella's Dilemma",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn5.jpg?alt=media&token=ebb3e57d-af90-434d-b6ff-dc0b162259e3",
      tags: [{ text: "Drama", type: "genre" }],
      year: "2020",
      duration: "1h 50m",
      genre: "Drama",
      rating: null,
    },
    {
      id: 8,
      title: "Middle (Aarin)",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn7.jpg?alt=media&token=e8308564-83e9-4ef2-a158-632a70e2b1bf",
      tags: [{ text: "Mystery", type: "genre" }],
      year: "2024",
      duration: "2h 05m",
      genre: "Mystery",
      rating: null,
    },
    {
      id: 9,
      title: "Seduced by my Maid",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn189.jpg?alt=media&token=71d21987-f8d4-4031-abd3-dc40cc5f6121",
      tags: [{ text: "Adventure", type: "genre" }],
      year: "2023",
      duration: "1h 40m",
      genre: "Adventure",
      rating: null,
    },
    {
      id: 10,
      title: "A Fool for Love",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn22.jpg?alt=media&token=61fcb6c5-ff61-4ffc-a4fd-57f116ec7fd0",
      tags: [{ text: "Adventure", type: "genre" }],
      year: "2022",
      duration: "2h 20m",
      genre: "Adventure",
      rating: null,
    },
  ],
  action: [
    {
      id: 2,
      title: "Seven Six",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn25.webp?alt=media&token=8f0d32fb-8603-4e4f-8a59-a5251a03ea05",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
      tags: [
        { text: "Action", type: "genre" },
        { text: "8.4", type: "rating" },
      ],
      year: "2023",
      duration: "2h 30m",
      genre: "Action",
      rating: 8.4,
    },
    {
      id: 3,
      title: "4th Republic",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn28.webp?alt=media&token=33c69483-c83c-4797-8b5f-98f98fba9be9",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F3.mp4?alt=media&token=046adf1f-6fda-4d05-bf6a-5c27e1eecdb5",
      tags: [
        { text: "Drama", type: "genre" },
        { text: "7.9", type: "rating" },
      ],
      year: "2023",
      duration: "2h 00m",
      genre: "Drama",
      rating: 7.9,
    },
    {
      id: 11,
      title: "Mannerless",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn30.jpg?alt=media&token=97d4481c-97de-46fa-8dd3-6eb1218c735c",
      tags: [{ text: "Action", type: "genre" }],
      year: "2024",
      duration: "2h 15m",
      genre: "Action",
      rating: null,
    },
    {
      id: 12,
      title: "Smashed Ego",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn2.jpg?alt=media&token=718bb2cc-3528-4f45-995c-e80922253740",
      tags: [{ text: "Action", type: "genre" }],
      year: "2023",
      duration: "1h 55m",
      genre: "Action",
      rating: null,
    },
    {
      id: 13,
      title: "Love Over Again",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn11.jpg?alt=media&token=ce861e6c-0384-4b8e-81e7-8d6ab126f7e7",
      tags: [{ text: "Thriller", type: "genre" }],
      year: "2022",
      duration: "2h 05m",
      genre: "Thriller",
      rating: null,
    },
  ],
  romance: [
    {
      id: 5,
      title: "Love In Every Word",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2F31.png?alt=media&token=62ad5b5b-768b-40ab-b047-73bce9089029",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 45m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 14,
      title: "Sunset Promise",
      image: "/placeholder.svg?height=400&width=600",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2024",
      duration: "2h 00m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 15,
      title: "Whispers of Love",
      image: "/placeholder.svg?height=400&width=600",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2023",
      duration: "1h 35m",
      genre: "Romance",
      rating: null,
    },
    {
      id: 16,
      title: "Eternal Bond",
      image: "/placeholder.svg?height=400&width=600",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2022",
      duration: "1h 50m",
      genre: "Romance",
      rating: null,
    },
  ],
  series: [
    {
      id: 19,
      title: "Muri and Ko",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn31.webp?alt=media&token=af4a5d9a-86fc-4814-b163-4506e0073866",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Drama", type: "genre" },
      ],
      year: "2023",
      duration: "3 Seasons",
      genre: "Drama",
      rating: null,
    },
    {
      id: 20,
      title: "Agnes the Tailor",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn32.jpg?alt=media&token=b189a72c-be87-4b8e-8801-535a6df32a80",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Mystery", type: "genre" },
      ],
      year: "2024",
      duration: "1 Season",
      genre: "Mystery",
      rating: null,
    },
    {
      id: 21,
      title: "Twist of Fate",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn33.jpg?alt=media&token=a983b550-35b4-4851-9077-d5656816e6db",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Action", type: "genre" },
      ],
      year: "2022",
      duration: "2 Seasons",
      genre: "Action",
      rating: null,
    },
    {
      id: 22,
      title: "The Call",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn34.jpg?alt=media&token=47537dfa-6f5e-4183-9619-3d92d02ffaef",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Drama", type: "genre" },
      ],
      year: "2023",
      duration: "4 Seasons",
      genre: "Drama",
      rating: null,
    },
    {
      id: 23,
      title: "The Buriial",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn35.jpg?alt=media&token=dddd29d4-1a79-42cc-a25f-e0c03b455ef4",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Romance", type: "genre" },
      ],
      year: "2021",
      duration: "3 Seasons",
      genre: "Romance",
      rating: null,
    },
    {
      id: 24,
      title: "Ikemba",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn36.jpg?alt=media&token=f2aa4918-592f-489b-af31-a240b1cac6e3",
      tags: [
        { text: "Series", type: "genre" },
        { text: "Crime", type: "genre" },
      ],
      year: "2022",
      duration: "2 Seasons",
      genre: "Crime",
      rating: null,
    },
  ],
  originals: [
    {
      id: 1,
      title: "Killer Advice",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn.jpg?alt=media&token=372f1cc1-9d34-401b-88f5-0b737c09ef19",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F1.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0",
      tags: [
        { text: "NEW", type: "new" },
        { text: "Adventure", type: "genre" },
      ],
      year: "2023",
      duration: "2h 15m",
      genre: "Adventure",
      rating: null,
    },
    {
      id: 2,
      title: "Seven Six",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn25.webp?alt=media&token=8f0d32fb-8603-4e4f-8a59-a5251a03ea05",
      videoPreview:
        "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F2.mp4?alt=media&token=b4569c4e-3336-4b6b-abce-ca9f72401920",
      tags: [
        { text: "Action", type: "genre" },
        { text: "8.4", type: "rating" },
      ],
      year: "2023",
      duration: "2h 30m",
      genre: "Action",
      rating: 8.4,
    },
    {
      id: 17,
      title: "Wild as Fire",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn20.jpg?alt=media&token=e529a0a4-5ffd-42f7-9791-063d03861130",
      tags: [{ text: "Drama", type: "genre" }],
      year: "2024",
      duration: "2h 25m",
      genre: "Drama",
      rating: null,
    },
    {
      id: 18,
      title: "Law and Disorder",
      image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn29.jpg?alt=media&token=4c02d98a-beec-4568-9d99-4fb3f20c16c4",
      tags: [{ text: "Romance", type: "genre" }],
      year: "2023",
      duration: "2h 10m",
      genre: "Romance",
      rating: null,
    },
  ],
}

interface ContentRowProps {
  title?: string
  icon?: ReactNode
  type?: string // Changed from specific string literals to accept any string
}

export default function ContentRow({ title, icon, type = "trending" }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // In the ContentRow component, ensure videoPreview exists on all items
  // Add videoPreview to items that don't have it
  const mockContent = contentRows[type as keyof typeof contentRows] || contentRows.trending

  // Ensure all items in mockContent have videoPreview property
  const processedContent = mockContent.map((item) => {
    // If item doesn't have videoPreview, add a default one based on id
    if (!("videoPreview" in item)) {
      return {
        ...item,
        videoPreview: `https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2F${(Number(item.id) % 3) + 1}.mp4?alt=media&token=8f6afba3-47f1-4f16-975e-75e084e06bf0`,
      }
    }
    return item
  })

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.8

      const newScrollLeft = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      // Check if we need to show/hide arrows after scrolling
      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftArrow(rowRef.current.scrollLeft > 0)
          setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10)
        }
      }, 300)
    }
  }

  // Update the return JSX to use processedContent instead of mockContent
  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        {icon && <span className="mr-2 text-brand">{icon}</span>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transform -translate-y-1/2"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Content Row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        onScroll={() => {
          if (rowRef.current) {
            setShowLeftArrow(rowRef.current.scrollLeft > 0)
            setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10)
          }
        }}
      >
        {processedContent.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[280px]">
            <VideoThumbnail
              id={item.id}
              title={item.title}
              image={item.image}
              videoPreview={item.videoPreview}
              aspectRatio="landscape"
              showLogo={true}
              tags={item.tags}
              year={item.year}
              duration={item.duration}
              genre={item.genre}
              rating={item.rating}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transform -translate-y-1/2"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
