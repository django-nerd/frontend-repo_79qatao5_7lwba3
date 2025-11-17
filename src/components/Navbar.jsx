import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ onOpenCart }) {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-full text-sm transition-colors ${isActive ? 'bg-rose-100 text-rose-700' : 'text-neutral-700 hover:bg-rose-50'}`

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="sm:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link to="/" className="font-serif text-2xl tracking-tight text-rose-700">Lustre</Link>
        </div>
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/blog" className={linkClass}>Blog/Press</NavLink>
          <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <NavLink to="/wishlist" className="p-2 rounded-full hover:bg-rose-50" aria-label="Wishlist">
            <Heart className="w-5 h-5 text-rose-600" />
          </NavLink>
          <button onClick={onOpenCart} className="p-2 rounded-full hover:bg-rose-50" aria-label="Open cart">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
          </button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden border-t border-rose-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavLink to="/shop" className={linkClass} onClick={() => setOpen(false)}>Shop</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/blog" className={linkClass} onClick={() => setOpen(false)}>Blog/Press</NavLink>
            <NavLink to="/faqs" className={linkClass} onClick={() => setOpen(false)}>FAQs</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
