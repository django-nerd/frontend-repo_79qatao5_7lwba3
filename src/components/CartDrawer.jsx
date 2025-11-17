import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ open, onClose, items, onCheckout }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 bg-black/30" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium text-lg">Your Bag</h3>
              <button onClick={onClose} className="text-sm text-rose-600">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 && (<p className="text-sm text-neutral-500">Your bag is empty.</p>)}
              {items.map((it, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="h-20 w-20 bg-rose-50 rounded-md" />
                  <div className="flex-1">
                    <p className="font-medium">{it.product_slug}</p>
                    <p className="text-xs text-neutral-500">{it.size} • {it.shade_sku}</p>
                    <p className="text-sm font-semibold text-rose-700">₹{it.price} × {it.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <button disabled={items.length===0} onClick={onCheckout} className="w-full rounded-full bg-rose-600 text-white py-3 font-medium hover:bg-rose-500 disabled:opacity-50">Checkout</button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
