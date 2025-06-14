"use client";

import { useStore } from "@/lib/store";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  const { products } = useStore();
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-52 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-200">
        <HeroSlider />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 drop-shadow-lg">
              Bienvenido a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Dulce Hogar
              </span>
            </h1>
            <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto drop-shadow">
              Descubre nuestras deliciosas galletitas, muffins, tortas y
              pasteles artesanales. Hechos con amor y los mejores ingredientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-600/80 text-white transition-colors"
                >
                  Ver Catálogo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-900 hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                Conoce Nuestra Historia
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                5 Estrellas
              </h3>
              <p className="text-gray-600">
                Calificación promedio de nuestros clientes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10 Años</h3>
              <p className="text-gray-600">De experiencia en repostería</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestras creaciones más populares, perfectas para cualquier
              ocasión especial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/catalog">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                Ver Todos los Productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500/70 to-rose-500/70">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
            ¿Listo para endulzar tu día?
          </h2>
          <p className="text-xl text-amber-50 mb-10">
            Explora nuestra amplia selección de productos artesanales y
            encuentra tu favorito
          </p>
          <Link href="/catalog">
            <Button
              size="lg"
              className="bg-white text-amber-700/80 hover:bg-gray-100"
            >
              Comenzar a Comprar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
