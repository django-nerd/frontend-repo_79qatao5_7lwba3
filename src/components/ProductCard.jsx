import { motion } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group rounded-2xl bg-white border border-rose-100 overflow-hidden shadow-sm">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={product.images?.[0]?.url} alt={product.images?.[0]?.alt || product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {product.compare_at_price && (
          <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wide bg-rose-700 text-rose-50 px-2 py-1 rounded-full">Save {Math.round(((product.compare_at_price - product.price)/product.compare_at_price)*100)}%</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-neutral-800">{product.title}</h3>
          <p className="text-rose-700 font-semibold">₹{product.price}</p>
        </div>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{product.subtitle || product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          {product.shades?.slice(0,5).map((s) => (
            <span key={s.sku} className="h-4 w-4 rounded-full border border-rose-200" style={{ backgroundColor: s.hex }} aria-label={s.name} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <a href={`/product/${product.slug}`} className="text-sm text-rose-700 hover:underline">View</a>
          <button onClick={() => onAdd(product)} className="text-sm px-3 py-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition">Add to cart</button>
        </div>
      </div>
    </motion.div>
  )
}
