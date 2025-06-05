import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Social */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="/images/redstream-logo.png"
                alt="REDSTREAM"
                width={150}
                height={50}
                className="h-[40px] w-auto mb-4"
              />
            </Link>
            <p className="text-sm mb-4">The premier streaming platform for African cinema and entertainment.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-brand">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="hover:text-brand">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="hover:text-brand">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="hover:text-brand">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/my-list" className="hover:text-brand">
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link href="/documentaries" className="hover:text-brand">
                  Documentaries
                </Link>
              </li>
              <li>
                <Link href="/series" className="hover:text-brand">
                  Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-medium mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-brand">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  Device Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-brand">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand">
                  Content Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-medium mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm">Get updates on new releases and exclusive content</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:border-brand"
              />
              <button className="bg-brand hover:bg-brand-light text-white px-4 py-2 rounded-r-md flex items-center">
                <Mail size={16} className="mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; {currentYear} REDSTREAM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
