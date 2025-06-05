"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, Bell, Shield, Monitor, Moon, Sun, LogOut, Smartphone, Lock, ChevronDown } from "lucide-react"
import SiteHeader from "@/components/site-header"
import { useTheme } from "@/components/theme-provider"
import { toast } from "@/components/ui/use-toast"
import Footer from "@/components/footer"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [language, setLanguage] = useState("English")

  const [profileImage, setProfileImage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userProfileImage") || "/placeholder.svg?height=100&width=100"
    }
    return "/placeholder.svg?height=100&width=100"
  })

  const [fullName, setFullName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "David Oludepo"
    }
    return "David Oludepo"
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setProfileImage(imageUrl)
        localStorage.setItem("userProfileImage", imageUrl)
        toast({
          title: "Profile Image Updated",
          description: "Your profile image has been updated successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Simulate logout process
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Clear user data
      localStorage.removeItem("user")
      // Redirect to landing page
      router.push("/landing")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5 mr-3" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-5 w-5 mr-3" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5 mr-3" /> },
    { id: "appearance", label: "Appearance", icon: <Monitor className="h-5 w-5 mr-3" /> },
    { id: "security", label: "Security", icon: <Shield className="h-5 w-5 mr-3" /> },
    { id: "devices", label: "Devices", icon: <Smartphone className="h-5 w-5 mr-3" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-gray-900 rounded-lg p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-md ${
                    activeTab === tab.id ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-900 rounded-lg p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                      <Image
                        src={profileImage || "/placeholder.svg?height=100&width=100"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-full cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <span className="text-xs">Edit</span>
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-sm text-red-600">Premium Plan</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-400 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-red-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-400 mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue="john.doe@example.com"
                      className="bg-gray-800 border-gray-700 focus:border-red-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-400 mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+1 234 567 890"
                      className="bg-gray-800 border-gray-700 focus:border-red-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-gray-400 mb-2 block">
                      Language
                    </Label>
                    <div className="relative">
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-md appearance-none focus:outline-none focus:border-red-600"
                      >
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <Button
                  className="mt-8 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    localStorage.setItem("userName", fullName)
                    toast({
                      title: "Profile Updated",
                      description: "Your profile has been updated successfully.",
                    })
                  }}
                >
                  Save Changes
                </Button>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Billing</h2>

                {/* Current Plan Card */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-gray-400 font-medium">Current Plan</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold">Premium</span>
                        <Badge className="bg-red-600">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600/10">
                      Change Plan
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>
                      Your next billing date is <strong>May 18, 2025</strong>
                    </p>
                    <p className="mt-1">₦8,500 per month</p>
                  </div>
                </div>

                {/* Payment Method */}
                <h3 className="text-xl font-medium mb-4">Payment Method</h3>
                <div className="bg-gray-800 rounded-lg p-4 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-700 p-3 rounded-md">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-500">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:bg-gray-800 mb-8">
                  Add Payment Method
                </Button>

                {/* Billing History */}
                <h3 className="text-xl font-medium mb-4">Billing History</h3>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="text-left p-4 text-sm text-gray-400">Date</th>
                        <th className="text-left p-4 text-sm text-gray-400">Amount</th>
                        <th className="text-left p-4 text-sm text-gray-400">Status</th>
                        <th className="text-right p-4 text-sm text-gray-400">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr>
                        <td className="p-4 text-sm">Apr 18, 2025</td>
                        <td className="p-4 text-sm">₦8,500</td>
                        <td className="p-4 text-sm">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Paid
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-right">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            Download
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-sm">Mar 18, 2025</td>
                        <td className="p-4 text-sm">₦8,500</td>
                        <td className="p-4 text-sm">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Paid
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-right">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            Download
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Appearance</h2>

                <div className="space-y-8">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          theme === "dark" ? "border-red-600 bg-gray-800" : "border-gray-700 bg-gray-800/50"
                        }`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Dark</span>
                          {theme === "dark" && <Badge className="bg-red-600">Active</Badge>}
                        </div>
                        <div className="h-20 bg-gray-900 rounded-md flex items-center justify-center">
                          <Moon className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          theme === "light" ? "border-red-600 bg-gray-800" : "border-gray-700 bg-gray-800/50"
                        }`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Light</span>
                          {theme === "light" && <Badge className="bg-red-600">Active</Badge>}
                        </div>
                        <div className="h-20 bg-white rounded-md flex items-center justify-center">
                          <Sun className="h-8 w-8 text-gray-800" />
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          theme === "system" ? "border-red-600 bg-gray-800" : "border-gray-700 bg-gray-800/50"
                        }`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">System</span>
                          {theme === "system" && <Badge className="bg-red-600">Active</Badge>}
                        </div>
                        <div className="h-20 bg-gradient-to-r from-gray-900 to-gray-100 rounded-md flex items-center justify-center">
                          <Monitor className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display Options */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Display Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reduce animations</p>
                          <p className="text-sm text-gray-400">Minimize motion effects throughout the interface</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show thumbnails on hover</p>
                          <p className="text-sm text-gray-400">Display video previews when hovering over content</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">High contrast mode</p>
                          <p className="text-sm text-gray-400">Increase contrast for better visibility</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs */}
            {activeTab !== "profile" && activeTab !== "billing" && activeTab !== "appearance" && (
              <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold mb-4">{tabs.find((t) => t.id === activeTab)?.label}</h2>
                <p className="text-gray-400 mb-6">This section is currently under development.</p>
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-12 bg-gray-800" />

        {/* Danger Zone */}
        <div className="max-w-3xl bg-gray-900 p-6 rounded-lg border border-red-900/30">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-6">These actions are irreversible. Please proceed with caution.</p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </>
              )}
            </Button>

            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              <Lock className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
