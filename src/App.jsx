import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function useSessionId() {
  return useMemo(() => {
    const key = 'lustre_session'
    let id = localStorage.getItem(key)
    if (!id) {
      id = Math.random().toString(36).slice(2)
      localStorage.setItem(key, id)
    }
    return id
  }, [])
}

function Home() {
  const [products, setProducts] = useState([])
  const session = useSessionId()
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState({ items: [] })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/products`).then(r => r.json()).then(setProducts)
    fetch(`${baseUrl}/api/cart/${session}`).then(r => r.json()).then(setCart)
  }, [baseUrl, session])

  const addToCart = async (product) => {
    const shade = product.shades?.[0]
    const size = product.sizes?.[0] || '10ml'
    const res = await fetch(`${baseUrl}/api/cart/add`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session, item: { product_slug: product.slug, shade_sku: shade?.sku || product.slug, size, quantity: 1, price: product.price } })
    })
    const updated = await res.json()
    setCart(updated)
    setCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100/50 text-neutral-800">
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl text-rose-800">Bestsellers</h2>
            <p className="text-neutral-600">Six plush shades to glaze your lips</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p.slug} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>
      <footer className="border-t border-rose-100 py-10 text-sm text-neutral-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <h4 className="font-medium text-neutral-800">Help</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="/shipping" className="hover:underline">Shipping & Returns</a></li>
              <li><a href="/faqs" className="hover:underline">FAQs</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/policy" className="hover:underline">Policies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-neutral-800">Company</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/blog" className="hover:underline">Blog/Press</a></li>
            </ul>
          </div>
          <div className="col-span-2">
            <h4 className="font-medium text-neutral-800">Join our list</h4>
            <p className="text-neutral-600 mt-2">Sign up for drops, events and glossy benefits.</p>
            <form className="mt-3 flex max-w-md">
              <input type="email" aria-label="Email" placeholder="Email address" className="flex-1 rounded-l-full border border-rose-200 px-4 py-2 focus:outline-none" />
              <button className="rounded-r-full bg-rose-600 text-white px-4 py-2">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="text-center mt-8">© {new Date().getFullYear()} Lustre Beauty</p>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart.items || []} onCheckout={() => alert('Demo checkout')} />
    </div>
  )
}

export default function App() {
  return <Home />
}
