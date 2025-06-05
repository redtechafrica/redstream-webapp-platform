"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/loading-spinner"
import Image from "next/image"

export interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, initialTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For development: Allow "admin" as a special case
      if (email === "admin" && password === "admin") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "admin@redstream.com", // Use a valid email format for storage
            name: "Admin User",
            avatar: "/placeholder.svg?height=100&width=100",
          }),
        )

        toast({
          title: "Login Successful",
          description: "Welcome back to REDSTREAM!",
        })

        onClose()
        router.push("/")
        return
      }

      // Regular email validation for non-admin logins
      if (!email.includes("@") && email !== "admin") {
        throw new Error("Please enter a valid email address")
      }

      // Store user in localStorage (in a real app, this would be a token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name: "John Doe",
          avatar: "/placeholder.svg?height=100&width=100",
        }),
      )

      toast({
        title: "Login Successful",
        description: "Welcome back to REDSTREAM!",
      })

      onClose()
      router.push("/")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user in localStorage (in a real app, this would be a token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name,
          avatar: "/placeholder.svg?height=100&width=100",
        }),
      )

      toast({
        title: "Account Created",
        description: "Welcome to REDSTREAM! Your account has been created successfully.",
      })

      onClose()
      router.push("/")
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader className="flex items-center justify-center mb-4">
          <Image src="/images/redstream-logo-horizontal.png" alt="REDSTREAM" width={180} height={50} priority />
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="name@example.com or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 text-xs text-gray-400">
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" className="bg-brand hover:bg-brand-light" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : "Sign In"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" className="bg-brand hover:bg-brand-light" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : "Create Account"}
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
