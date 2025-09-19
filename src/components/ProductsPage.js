"use client"

import { useState, useEffect } from "react"

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Sample mahsulotlar ro'yxati
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      originalPrice: 1199,
      category: "phones",
      image: "/iphone-15-pro.png",
      rating: 4.8,
      inStock: true,
      discount: 17,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 849,
      originalPrice: 999,
      category: "phones",
      image: "/samsung-galaxy-s24-smartphone.jpg",
      rating: 4.7,
      inStock: true,
      discount: 15,
    },
    {
      id: 3,
      name: "MacBook Air M3",
      price: 1299,
      originalPrice: 1499,
      category: "laptops",
      image: "/macbook-air-m3-laptop.jpg",
      rating: 4.9,
      inStock: true,
      discount: 13,
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      price: 199,
      originalPrice: 249,
      category: "accessories",
      image: "/airpods-pro-2-wireless-earbuds.jpg",
      rating: 4.6,
      inStock: true,
      discount: 20,
    },
    {
      id: 5,
      name: 'iPad Pro 12.9"',
      price: 899,
      originalPrice: 1099,
      category: "tablets",
      image: "/ipad-pro-12-9-tablet.jpg",
      rating: 4.8,
      inStock: false,
      discount: 18,
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      category: "accessories",
      image: "/sony-wh-1000xm5.png",
      rating: 4.7,
      inStock: true,
      discount: 25,
    },
    {
      id: 7,
      name: "Dell XPS 13",
      price: 1199,
      originalPrice: 1399,
      category: "laptops",
      image: "/dell-xps-13-laptop.jpg",
      rating: 4.5,
      inStock: true,
      discount: 14,
    },
    {
      id: 8,
      name: "Apple Watch Series 9",
      price: 349,
      originalPrice: 399,
      category: "accessories",
      image: "/apple-watch-series-9.jpg",
      rating: 4.6,
      inStock: true,
      discount: 13,
    },
  ]

  const categories = [
    { id: "all", name: "Barchasi", icon: "🛍️" },
    { id: "phones", name: "Telefonlar", icon: "📱" },
    { id: "laptops", name: "Noutbuklar", icon: "💻" },
    { id: "tablets", name: "Planshetlar", icon: "📱" },
    { id: "accessories", name: "Aksessuarlar", icon: "🎧" },
  ]

  // Filtrlangan mahsulotlar
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Savatga qo'shish
  const addToCart = (product) => {
    // Telegram vibration feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Telegram WebApp initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1f1f1f" }}>
      {/* Header */}
      <div className="sticky-top bg-telegram-bg border-bottom border-secondary p-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h1 className="h4 text-white mb-0 fw-bold">🛒 Do'kon</h1>
            <div className="position-relative">
              <button className="btn telegram-btn rounded-pill px-3 py-2">
                🛍️ Savat ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="🔍 Mahsulot qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: "#2a2a2a", borderColor: "#3a3a3a" }}
            />
          </div>

          {/* Categories */}
          <div className="d-flex gap-2 overflow-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn category-btn flex-shrink-0 rounded-pill px-3 py-2 ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-fluid p-3">
        <div className="row g-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card product-card h-100 bg-dark text-white fade-in">
                <div className="position-relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  {product.discount && (
                    <span className="position-absolute top-0 start-0 badge bg-danger m-2">-{product.discount}%</span>
                  )}
                  {!product.inStock && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-secondary">Tugagan</span>
                    </div>
                  )}
                </div>

                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-truncate mb-2">{product.name}</h6>

                  <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-1">⭐</span>
                    <small className="text-muted">{product.rating}</small>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="h6 text-telegram-accent mb-0 fw-bold">${product.price}</span>
                      {product.originalPrice && (
                        <small className="text-muted text-decoration-line-through">${product.originalPrice}</small>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`btn w-100 mt-auto ${product.inStock ? "telegram-btn" : "btn-secondary"}`}
                  >
                    {product.inStock ? "🛒 Savatga" : "Tugagan"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <div className="text-muted">
              <h5>😔 Mahsulot topilmadi</h5>
              <p>Boshqa kategoriya yoki kalit so'z bilan qidiring</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed-bottom bg-dark border-top border-secondary p-3">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col">
              <button className="btn btn-link text-telegram-accent p-0">
                <div>🏠</div>
                <small>Bosh sahifa</small>
              </button>
            </div>
            <div className="col">
              <button className="btn btn-link text-white p-0">
                <div>🔍</div>
                <small>Qidiruv</small>
              </button>
            </div>
            <div className="col">
              <button className="btn btn-link text-white p-0">
                <div>🛍️</div>
                <small>Savat</small>
              </button>
            </div>
            <div className="col">
              <button className="btn btn-link text-white p-0">
                <div>👤</div>
                <small>Profil</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
