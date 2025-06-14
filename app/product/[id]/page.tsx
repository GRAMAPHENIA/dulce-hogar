"use client"

import { useParams } from "next/navigation"
import { useStore } from "@/lib/store"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import ProductCard from "@/components/product-card"

export default function ProductPage() {
  const params = useParams()
  const { products, addToCart, toggleFavorite, favorites } = useStore()

  const product = products.find((p) => p.id === params.id)
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/catalog">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(product.id)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
  }

  const categoryNames = {
    galletitas: "Galletitas",
    muffins: "Muffins",
    tortas: "Tortas",
    pasteles: "Pasteles",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center text-orange-600 hover:text-orange-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail gallery - placeholder for multiple images */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm border-2 border-transparent hover:border-orange-500 cursor-pointer transition-colors"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} vista ${i}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {categoryNames[product.category]}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reseñas)</span>
              </div>
              <p className="text-6xl font-bold text-orange-600 mb-6">${product.price.toFixed(2)}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Información del producto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{categoryNames[product.category]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disponibilidad:</span>
                    <span className="font-medium text-green-600">En stock</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo de preparación:</span>
                    <span className="font-medium">24-48 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                onClick={handleToggleFavorite}
                size="lg"
                variant="outline"
                className={`${
                  isFavorite
                    ? "border-red-500 text-red-500 hover:bg-red-50"
                    : "border-gray-300 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "En Favoritos" : "Agregar a Favoritos"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
