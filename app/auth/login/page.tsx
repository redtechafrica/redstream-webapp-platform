"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real implementation, this would connect to Firebase Auth
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // For development: Allow "admin" as a special case
      if (email === "admin" && password === "admin") {
        // Simulate authentication delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Save user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "admin@redstream.com",
            name: "Admin User",
            avatar: "/placeholder.svg?height=100&width=100",
          }),
        )

        // Redirect to home page after successful login
        router.push("/")
        return
      }

      // Regular email validation for non-admin logins
      if (!email.includes("@") && email !== "admin") {
        throw new Error("Please enter a valid email address")
      }

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify({ email }))

      // Redirect to home page after successful login
      router.push("/")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-black flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/redstream-logo.png"
            alt="REDSTREAM"
            width={200}
            height={60}
            className="mx-auto mb-4"
            priority
          />
          <p className="text-gray-400">Sign in to continue streaming</p>
        </div>

        {error && <div className="bg-red-900/30 border border-red-800 text-white p-3 rounded-md mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com or username"
              required
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot-password" className="text-sm text-gray-400 hover:text-white">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-900 border-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Subscribe for just ₦5,350/month</p>
            <ul className="text-sm text-left space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Unlimited access to all content
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Stream on up to 4 devices
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Download for offline viewing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Ad-free experience
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Cancel anytime
              </li>
            </ul>
            <Link href="/auth/signup">
              <Button className="w-full bg-white text-black hover:bg-gray-200">Start Your Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
