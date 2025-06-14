"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

const categories = [
  { id: "all", name: "Todos", value: "" },
  { id: "galletitas", name: "Galletitas", value: "galletitas" },
  { id: "muffins", name: "Muffins", value: "muffins" },
  { id: "tortas", name: "Tortas", value: "tortas" },
  { id: "pasteles", name: "Pasteles", value: "pasteles" },
]

export default function CatalogPage() {
  const { products } = useStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Catálogo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre toda nuestra selección de productos artesanales
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={
                      selectedCategory === category.value
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "border-gray-300 hover:border-orange-500 hover:text-orange-500"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
            {searchTerm && ` para "${searchTerm}"`}
            {selectedCategory && ` en ${categories.find((c) => c.value === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o cambia los filtros</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
