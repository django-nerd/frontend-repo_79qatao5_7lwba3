import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        <Spline scene="https://prod.spline.design/c1w2QYixcPkptHWE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-50/90 via-rose-50/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-6">
            <h1 className="font-serif text-4xl sm:text-6xl text-rose-800 tracking-tight">Lustre Lip Oils</h1>
            <p className="mt-4 text-rose-700/90 max-w-2xl mx-auto">Glass-like shine, cushiony comfort, and botanical care. Meet your everyday luxury.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="#shop" className="inline-flex items-center rounded-full bg-rose-600 text-white px-6 py-3 text-sm font-medium shadow-lg shadow-rose-200 hover:bg-rose-500 transition-colors">Shop Shades</a>
              <a href="#story" className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-6 py-3 text-sm text-rose-700 border border-rose-200 hover:bg-white transition">Our Story</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
