"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { ShoppingCart, Heart, Home, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { getCartItemsCount, favorites } = useStore()
  const cartItemsCount = getCartItemsCount()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Renderizar un placeholder simple mientras se monta
    return (
      <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-gray-200">
        <div className="h-16"></div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧁</span>
            </div> */}
            <span className="font-bold text-xl text-gray-900">DH</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/catalog"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Catálogo</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
