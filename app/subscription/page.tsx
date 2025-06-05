"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "9.99",
    features: [
      "HD streaming",
      "Watch on 1 device at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Cancel anytime",
    ],
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "14.99",
    features: [
      "4K Ultra HD streaming",
      "Watch on 2 devices at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Download for offline viewing",
      "Cancel anytime",
    ],
    recommended: true,
  },
  {
    id: "family",
    name: "Family",
    price: "19.99",
    features: [
      "4K Ultra HD streaming",
      "Watch on 4 devices at a time",
      "Access to all movies and series",
      "Ad-free viewing",
      "Download for offline viewing",
      "Create up to 5 profiles",
      "Cancel anytime",
    ],
    recommended: false,
  },
]

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would connect to a payment processor
      // await processPayment(selectedPlan, billingCycle);

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to home page after successful subscription
      router.push("/")
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock premium African content with a plan that works for you. All plans include a 7-day free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 p-1 rounded-full flex">
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-all",
                billingCycle === "monthly" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white",
              )}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-all flex items-center",
                billingCycle === "yearly" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white",
              )}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "bg-gray-900 rounded-xl overflow-hidden transition-all",
                selectedPlan === plan.id ? "ring-2 ring-red-600 transform scale-105" : "hover:bg-gray-800",
              )}
            >
              {plan.recommended && (
                <div className="bg-red-600 text-white text-center py-1 text-sm font-medium">MOST POPULAR</div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full",
                    selectedPlan === plan.id ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600",
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="mt-12 text-center">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              `Start Your Free Trial`
            )}
          </Button>
          <p className="text-gray-400 mt-4">Cancel anytime during your trial. No commitments.</p>
        </div>
      </div>
    </div>
  )
}
