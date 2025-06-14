"use client"

import { useStore } from "@/lib/store"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"

export default function FavoritesPage() {
  const { products, favorites } = useStore()
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mis Favoritos</h1>
          <p className="text-lg text-gray-600">
            {favoriteProducts.length > 0
              ? `Tienes ${favoriteProducts.length} producto${favoriteProducts.length !== 1 ? "s" : ""} en tu lista de favoritos`
              : "Aún no tienes productos favoritos"}
          </p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No tienes productos favoritos</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora nuestro catálogo y marca con el corazón los productos que más te gusten
            </p>
            <Link href="/catalog">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Explorar Productos
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
