"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Play, Tv, Smartphone, Laptop, Monitor, Gamepad, HelpCircle, MessageCircle, Star } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

// Featured content for the hero section
const featuredContent = [
  {
    id: 1,
    title: "Lakatabu",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn50.jpeg?alt=media&token=f5a71e19-73a1-41e8-a5d7-a7175e9ff785",
  },
  {
    id: 2,
    title: "Woman King",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn52.jpeg?alt=media&token=be7dcb7c-b8ff-498e-bf47-611493d7515b",
  },
  {
    id: 3,
    title: "Anikulapo",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn54.jpeg?alt=media&token=16fbfa55-3983-4194-946e-cdaa64ab4e13",
  },
  {
    id: 4,
    title: "Amina",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn53.jpeg?alt=media&token=dbd8ee87-6f82-4280-a7a9-0466aa42ec18",
  },
  {
    id: 5,
    title: "Tough Luv",
    image: "https://firebasestorage.googleapis.com/v0/b/icdatinnovation.appspot.com/o/REDSTREAM%20WEBAPP%20PLATFORM%2Fthumbnails%2Ftn55.jpeg?alt=media&token=6577a312-30aa-4eae-a569-8a49b6bd219f",
  },
]

// Pricing plans
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "5,350",
    yearlyPrice: "53,500",
    features: [
      "HD streaming quality",
      "Watch on 1 device at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Cancel anytime",
    ],
    limitations: ["No downloads for offline viewing", "No multiple profiles"],
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "8,500",
    yearlyPrice: "85,000",
    features: [
      "4K Ultra HD streaming",
      "Watch on 2 devices at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Download for offline viewing",
      "Cancel anytime",
    ],
    limitations: ["Limited to 2 profiles"],
    recommended: true,
  },
  {
    id: "family",
    name: "Family",
    price: "12,000",
    yearlyPrice: "120,000",
    features: [
      "4K Ultra HD streaming",
      "Watch on 4 devices at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Download for offline viewing",
      "Create up to 5 profiles",
      "Parental controls",
      "Cancel anytime",
    ],
    limitations: [],
    recommended: false,
  },
]

// FAQ items with more engaging content
const faqItems = [
  {
    question: "What makes REDSTREAM different from other streaming platforms?",
    answer:
      "REDSTREAM is Africa's premier streaming destination, showcasing authentic African stories alongside global hits. We curate content that celebrates our rich cultural heritage while delivering world-class entertainment. With exclusive originals, blockbusters, and classics - all in one place - we're bringing Africa's creative genius to the world stage!",
    icon: <Star className="h-5 w-5 text-brand" />,
  },
  {
    question: "What amazing content can I discover on REDSTREAM?",
    answer:
      "Prepare to be captivated! REDSTREAM offers thousands of hours of binge-worthy content including award-winning African originals, Hollywood blockbusters, thought-provoking documentaries, family-friendly shows, and exclusive REDSTREAM productions you won't find anywhere else. From heart-pounding action to soul-stirring dramas, we've got something for every mood and moment.",
    icon: <Play className="h-5 w-5 text-brand" />,
  },
  {
    question: "How affordable is REDSTREAM?",
    answer:
      "We believe great entertainment should be accessible! REDSTREAM offers flexible plans starting from just ₦5,350/month - less than the cost of a movie ticket and popcorn. Choose between our Basic, Premium, and Family plans to find the perfect fit for your viewing habits and budget. Plus, all plans come with a 7-day free trial so you can experience the magic before committing.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    question: "Can I watch REDSTREAM on all my devices?",
    answer:
      "REDSTREAM works seamlessly across your digital life - smart TVs, smartphones, tablets, laptops, and select gaming consoles. Start watching on your TV at home, continue on your phone during your commute, and finish on your tablet in bed. Our mobile apps are coming soon to make your experience even better!",
    icon: <Smartphone className="h-5 w-5 text-brand" />,
  },
  {
    question: "Is there any long-term commitment when I sign up?",
    answer:
      "Not at all! We're confident you'll love REDSTREAM, but we don't believe in locking you in. All our plans are month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel anytime with zero cancellation fees. Your entertainment, your choice, your terms.",
    icon: <HelpCircle className="h-5 w-5 text-brand" />,
  },
  {
    question: "How can I get help if I have questions?",
    answer:
      "We're here for you 24/7! Our friendly support team is just a click away through live chat, email, or phone. Plus, our comprehensive Help Center has answers to most common questions. We're committed to making your REDSTREAM experience smooth and enjoyable from sign-up to every streaming session.",
    icon: <MessageCircle className="h-5 w-5 text-brand" />,
  },
]

// Device support
const deviceSupport = [
  {
    category: "TV",
    icon: <Tv className="h-12 w-12 mb-4" />,
    devices: ["Smart TVs", "Android TV", "Apple TV", "Chromecast", "Fire TV", "Roku", "Samsung TV"],
  },
  {
    category: "Computer",
    icon: <Laptop className="h-12 w-12 mb-4" />,
    devices: ["Chrome OS", "macOS", "Windows PC", "All modern browsers"],
  },
  {
    category: "Mobile & Tablet",
    icon: <Smartphone className="h-12 w-12 mb-4" />,
    devices: ["Android Phones & Tablets", "iPhone and iPad", "Coming soon to app stores"],
  },
  {
    category: "Game Consoles",
    icon: <Gamepad className="h-12 w-12 mb-4" />,
    devices: ["PlayStation 4/5", "Xbox One", "Xbox Series X/S", "Coming soon"],
  },
]

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup")
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (user) {
        router.push("/")
      }
    }

    // Close auth modal when component unmounts
    return () => {
      setIsAuthModalOpen(false)
    }
  }, [router])

  const openSignupModal = () => {
    setAuthModalTab("signup")
    setIsAuthModalOpen(true)
  }

  const openLoginModal = () => {
    setAuthModalTab("login")
    setIsAuthModalOpen(true)
  }

  // 1. Fix the scrollToPlans function to properly navigate to the plans section
  const scrollToPlans = () => {
    const plansSection = document.getElementById("plans")
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleFaqItem = (index: number) => {
    setActiveFaqItem(activeFaqItem === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#121620] text-white">
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab={authModalTab} />

      {/* Header */}
      <header className="relative z-10 py-6 px-4 md:px-8 flex items-center justify-between">
        <div>
          <Image src="/images/redstream-logo-horizontal.png" alt="REDSTREAM" width={150} height={40} priority />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={openLoginModal}>
            Sign In
          </Button>
          <Button className="bg-brand hover:bg-brand-light text-white" onClick={openSignupModal}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121620] via-[#121620]/90 to-[#121620] z-0"></div>

        {/* Content grid */}
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                African Stories, <span className="text-brand">Global Stage</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Stream exclusive original content and curated classics from across Africa and beyond. Start your free
                trial today.
              </p>
              {/* 2. Update the "Start Free Trial" and "Get Started" buttons to open the auth modal
              // In the Hero Section, replace the existing buttons with: */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand hover:bg-brand-light text-white w-full sm:w-auto"
                  onClick={openSignupModal}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white w-full sm:w-auto"
                  onClick={scrollToPlans}
                >
                  View Plans
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">No credit card required to start your 7-day free trial.</p>
            </motion.div>

            {/* Featured content grid */}
            <motion.div
              className="grid grid-cols-3 gap-2 md:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {featuredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`relative rounded-lg overflow-hidden ${
                    index === 0 ? "col-span-2 row-span-2" : "col-span-1"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={index === 0 ? 600 : 300}
                    height={index === 0 ? 600 : 300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-2 md:p-4">
                      <h3 className="text-sm md:text-base font-medium">{item.title}</h3>
                    </div>
                  </div>
                  {/* RedStream Logo */}
                  <div className="absolute bottom-2 right-2 z-10 p-1">
                    <Image
                      src="/images/redstream-logo-horizontal.png"
                      alt="REDSTREAM"
                      width={40}
                      height={15}
                      className="opacity-80"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-[#121620] to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch the way you want</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enjoy the world's greatest African stories - anytime, anywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-brand/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Endless entertainment</h3>
              <p className="text-gray-300">
                Explore thousands of hours of TV series, movies and originals from across Africa.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Available on your favorite devices</h3>
              <p className="text-gray-300">
                Stream on up to four screens at once on compatible devices, including smart TVs and mobile.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy-to-use parental controls</h3>
              <p className="text-gray-300">
                Keep your family safe with our intuitive parental controls and family-friendly content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Select Your Plan</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              No hidden fees, equipment rentals, or installation appointments.
              <br />
              Switch plans or cancel anytime.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 p-1 rounded-full flex">
              <button
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === "monthly" ? "bg-brand text-white" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-all flex items-center ${
                  billingCycle === "yearly" ? "bg-brand text-white" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-800 rounded-xl overflow-hidden transition-all ${
                  plan.recommended ? "ring-2 ring-brand transform scale-105" : "hover:bg-gray-700"
                }`}
              >
                {plan.recommended && (
                  <div className="bg-brand text-white text-center py-1 text-sm font-medium">MOST POPULAR</div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      ₦{billingCycle === "monthly" ? plan.price : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={`limit-${index}`} className="flex items-start text-gray-400">
                        <span className="text-gray-500 mr-2">✕</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.recommended ? "bg-brand hover:bg-brand-light" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    onClick={openSignupModal}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-gray-400">
            All plans include a 7-day free trial. Cancel anytime before trial ends to avoid charges.
          </div>
        </div>
      </section>

      {/* 3. Update the "Available on your favorite devices" section to display properly
      // Replace the entire Device Support Section with: */}
      <section className="py-16 bg-[#121620]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light">
            Available on your favorite devices
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {deviceSupport.map((category) => (
              <div
                key={category.category}
                className="text-center bg-gradient-to-b from-gray-900 to-[#121620] p-8 rounded-xl border border-gray-800 hover:border-brand transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand/20"
              >
                <div className="bg-brand/10 p-6 rounded-full inline-flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.devices.map((device) => (
                    <li key={device} className="text-gray-300 text-sm">
                      {device}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Stream your favorite content anytime, anywhere. REDSTREAM works seamlessly across all your devices.
            </p>
            <Button size="lg" className="bg-brand hover:bg-brand-light text-white px-8 py-6 text-lg">
              Start Watching Now
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Make the FAQ section more engaging and captivating
      // Replace the FAQ section with: */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-[#121620]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light">
            Curious about REDSTREAM?
          </h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden transition-all shadow-lg ${
                  activeFaqItem === index ? "ring-2 ring-brand" : ""
                }`}
                whileHover={{ scale: activeFaqItem === index ? 1 : 1.02 }}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-700/50 transition-all"
                  onClick={() => toggleFaqItem(index)}
                >
                  <div className="flex items-center">
                    <div className="bg-brand/20 p-2 rounded-full mr-4">{item.icon}</div>
                    <span className="text-lg font-medium text-left">{item.question}</span>
                  </div>
                  <div className={`transform transition-transform ${activeFaqItem === index ? "rotate-180" : ""}`}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                {activeFaqItem === index && (
                  <motion.div
                    className="px-6 pb-6 pt-2 text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="pt-2 leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-[#121620] to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start watching?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of viewers enjoying the best of African entertainment. Start your free trial today.
          </p>
          <Button size="lg" className="bg-brand hover:bg-brand-light text-white px-8" onClick={openSignupModal}>
            Start Free Trial
          </Button>
          <p className="text-sm text-gray-400 mt-4">No credit card required to start your 7-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121620] border-t border-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-8">
            <Image
              src="/images/redstream-logo-horizontal.png"
              alt="REDSTREAM"
              width={200}
              height={60}
              className="mb-4"
            />
            <p className="text-gray-400 text-center">Africa's Premium Streaming Platform</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h4 className="text-sm font-bold mb-4 text-brand">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold mb-4 text-brand">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="text-gray-400 hover:text-white text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/account" className="text-gray-400 hover:text-white text-sm">
                    Account
                  </a>
                </li>
                <li>
                  <a href="/devices" className="text-gray-400 hover:text-white text-sm">
                    Devices
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold mb-4 text-brand">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-gray-400 hover:text-white text-sm">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} REDSTREAM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
