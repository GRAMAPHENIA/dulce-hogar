"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useStore, type Product } from "@/lib/store"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useStore()
  const isFavorite = favorites.includes(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(product.id)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite
                ? "bg-red-100 text-red-500 hover:bg-red-200"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
            } transition-colors`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
            <Button onClick={handleAddToCart} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
