import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: "galletitas" | "muffins" | "tortas" | "pasteles"
  description: string
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

interface StoreState {
  products: Product[]
  cart: CartItem[]
  favorites: string[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleFavorite: (productId: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number
}

// Datos de ejemplo
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Galletas de Chocolate Chip",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "galletitas",
    description:
      "Deliciosas galletas caseras con chips de chocolate belga. Perfectas para acompañar tu café o té favorito.",
    featured: true,
  },
  {
    id: "2",
    name: "Muffin de Arándanos",
    price: 8.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "muffins",
    description: "Esponjosos muffins con arándanos frescos y un toque de limón. Ideales para el desayuno.",
    featured: true,
  },
  {
    id: "3",
    name: "Torta Red Velvet",
    price: 45.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "tortas",
    description: "Clásica torta red velvet con frosting de queso crema. Perfecta para celebraciones especiales.",
    featured: true,
  },
  {
    id: "4",
    name: "Galletas de Avena",
    price: 10.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "galletitas",
    description: "Galletas saludables de avena con pasas y canela. Una opción nutritiva y deliciosa.",
  },
  {
    id: "5",
    name: "Muffin de Chocolate",
    price: 9.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "muffins",
    description: "Intensos muffins de chocolate con chips extra. Para los amantes del chocolate.",
  },
  {
    id: "6",
    name: "Torta de Zanahoria",
    price: 38.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "tortas",
    description: "Húmeda torta de zanahoria con nueces y frosting de queso crema con canela.",
  },
  {
    id: "7",
    name: "Pastel de Limón",
    price: 32.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "pasteles",
    description: "Refrescante pastel de limón con merengue italiano. Perfecto para días calurosos.",
  },
  {
    id: "8",
    name: "Galletas Snickerdoodle",
    price: 11.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "galletitas",
    description: "Suaves galletas con canela y azúcar. Un clásico americano irresistible.",
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: sampleProducts,
      cart: [],
      favorites: [],

      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            cart: cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          })
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set({
          cart: get().cart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })
      },

      toggleFavorite: (productId) => {
        const favorites = get().favorites
        const isFavorite = favorites.includes(productId)

        set({
          favorites: isFavorite ? favorites.filter((id) => id !== productId) : [...favorites, productId],
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "bakery-store",
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
      }),
    },
  ),
)
