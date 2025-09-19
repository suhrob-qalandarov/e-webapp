"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

// Sample mahsulotlar ro'yxati
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1200,
    originalPrice: 1400,
    image: "/iphone-15-pro.png",
    category: "Telefonlar",
    discount: 15,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 1000,
    originalPrice: 1200,
    image: "/samsung-galaxy-s24-smartphone.jpg",
    category: "Telefonlar",
    discount: 17,
    inStock: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 1500,
    originalPrice: 1800,
    image: "/macbook-air-m3-laptop.jpg",
    category: "Noutbuklar",
    discount: 17,
    inStock: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 250,
    originalPrice: 300,
    image: "/airpods-pro-2-wireless-earbuds.jpg",
    category: "Audio",
    discount: 17,
    inStock: false,
    rating: 4.6,
  },
  {
    id: 5,
    name: "iPad Pro 12.9",
    price: 1100,
    originalPrice: 1300,
    image: "/ipad-pro-12-9-tablet.jpg",
    category: "Planshetlar",
    discount: 15,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 350,
    originalPrice: 400,
    image: "/sony-wh-1000xm5.png",
    category: "Audio",
    discount: 13,
    inStock: true,
    rating: 4.7,
  },
  {
    id: 7,
    name: "Apple Watch Series 9",
    price: 400,
    originalPrice: 450,
    image: "/apple-watch-series-9-smartwatch.jpg",
    category: "Soatlar",
    discount: 11,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Nintendo Switch OLED",
    price: 350,
    originalPrice: 400,
    image: "/nintendo-switch-oled-gaming-console.jpg",
    category: "O'yinlar",
    discount: 13,
    inStock: true,
    rating: 4.6,
  },
]

const categories = ["Barchasi", "Telefonlar", "Noutbuklar", "Audio", "Planshetlar", "Soatlar", "O'yinlar"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  const [cart, setCart] = useState([])

  const filteredProducts =
    selectedCategory === "Barchasi"
      ? sampleProducts
      : sampleProducts.filter((product) => product.category === selectedCategory)

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
    // Telegram bot uchun vibration
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">🛍️ Do'kon</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              🛒
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      -{product.discount}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Tugagan</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-card-foreground mb-1 line-clamp-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-primary text-xs">⭐</span>
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    size="sm"
                  >
                    {product.inStock ? "🛒 Qo'shish" : "Tugagan"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Bosh sahifa</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-lg">🔍</span>
            <span className="text-xs">Qidiruv</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 relative">
            <span className="text-lg">🛒</span>
            <span className="text-xs">Savat</span>
            {cart.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cart.length}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-lg">👤</span>
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
