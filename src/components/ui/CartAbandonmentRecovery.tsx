import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Gift } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CartAbandonmentRecovery() {
  const cart = useStore((state) => state.cart);
  const [show, setShow] = useState(false);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) return;
    // Show after 30 seconds if cart has items
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, [cart]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-6 right-24 z-[9998] bg-surface border border-gold/30 rounded-2xl shadow-2xl p-4 w-[300px]"
        >
          <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-text-dim hover:text-text-main bg-transparent border-none cursor-pointer">
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag size={18} className="text-gold" />
            <span className="text-[0.75rem] text-text-main font-bold">Your cart is waiting</span>
          </div>

          <p className="text-[0.72rem] text-text-muted mb-3">
            Don't lose your items! Complete checkout now and get
          </p>

          <div className="bg-jade/10 border border-jade/20 rounded-lg px-3 py-2 mb-3 text-[0.75rem] text-jade font-bold flex items-center gap-2">
            <Gift size={14} /> FREE shipping on orders over ₹999
          </div>

          <button
            onClick={() => { setShow(false); window.location.href = '/checkout'; }}
            className="w-full bg-gold text-void py-2 rounded-lg text-[0.7rem] font-bold border-none cursor-pointer"
          >
            Complete Checkout — ₹{cartTotal}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}