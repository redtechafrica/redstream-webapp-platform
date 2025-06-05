"use client"

import { motion } from "framer-motion"

interface FancyBufferProps {
  size?: "sm" | "md" | "lg"
  color?: "brand" | "white" | "gradient"
}

export default function FancyBuffer({ size = "md", color = "brand" }: FancyBufferProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const colorClass =
    color === "brand"
      ? "border-brand"
      : color === "white"
        ? "border-white"
        : "border-t-red-600 border-r-amber-500 border-b-blue-500 border-l-green-500"

  const dotVariants = {
    initial: { scale: 0 },
    animate: { scale: [0, 1, 0], transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 } },
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} border-4 ${colorClass} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`w-${Number.parseInt(size === "sm" ? "2" : size === "md" ? "4" : "6")} h-${Number.parseInt(size === "sm" ? "2" : size === "md" ? "4" : "6")} bg-white rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </div>
  )
}
