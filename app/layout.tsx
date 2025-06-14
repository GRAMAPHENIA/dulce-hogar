import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dulce Hogar - Galletitas y Pastelería Artesanal",
  description:
    "Descubri nuestras deliciosas galletitas, muffins, tortas y pasteles artesanales. Hechos con amor y los mejores ingredientes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <p className="font-bold text-xl">Dulce Hogar</p>
                <p className="text-gray-400 mb-4">
                  Creamos productos de repostería artesanal con los mejores
                  ingredientes y mucho amor. Cada bocado es una experiencia
                  única.
                </p>
                <p className="text-gray-400">
                  © {new Date().getFullYear()} Dulce Hogar.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Enlaces</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/" className="hover:text-white transition-colors">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/catalog"
                      className="hover:text-white transition-colors"
                    >
                      Catálogo
                    </a>
                  </li>
                  <li>
                    <a
                      href="/favorites"
                      className="hover:text-white transition-colors"
                    >
                      Favoritos
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cart"
                      className="hover:text-white transition-colors"
                    >
                      Carrito
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contacto</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>📧 info@dulcehogar.com</li>
                  <li>📞 +1 (555) 123-4567</li>
                  <li>📍 123 Calle Principal, Ciudad</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
