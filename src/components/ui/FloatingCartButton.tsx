import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';

interface FloatingCartButtonProps {
  onCartClick: () => void;
}

export default function FloatingCartButton({ onCartClick }: FloatingCartButtonProps) {
  const cart = useStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
          className="fixed bottom-24 right-4 md:right-6 z-[95] w-14 h-14 bg-gold hover:bg-gold-soft text-void rounded-full shadow-2xl flex items-center justify-center border-none cursor-pointer transition-colors"
          aria-label="Open Cart"
        >
          <ShoppingBag size={24} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 bg-text-main text-void text-[0.7rem] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 border-2 border-white">
            {cartCount}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
    
  );
}
