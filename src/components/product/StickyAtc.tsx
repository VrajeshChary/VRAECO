import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Loader2 } from 'lucide-react';

interface StickyAtcProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  variant?: string;
  isInStock?: boolean;
}

export default function StickyAtc({ 
  productId, 
  productName, 
  productPrice, 
  productImage, 
  variant,
  isInStock = true 
}: StickyAtcProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the main ATC button (roughly 800px)
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    if (!isInStock || isLoading) return;
    
    setIsLoading(true);
    
    // Simulate add-to-cart process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
      variant
    });
    
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full bg-surface border-t border-edge p-4 z-[50] md:hidden flex items-center gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-raised border border-edge flex items-center justify-center text-[1.5rem] rounded">
              {productImage}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-medium text-text-main line-clamp-1">{productName}</span>
              <span className="text-[0.85rem] font-serif text-gold font-semibold">₹{productPrice}</span>
            </div>
          </div>
          <div className="flex-1">
            {cart.find(item => item.id === productId && item.variant === variant) ? (
              <div className="flex items-center gap-3 bg-raised border border-gold/30 rounded-full px-4 py-1 justify-between h-[44px]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const item = cart.find(i => i.id === productId && i.variant === variant);
                    if (item && item.quantity > 1) {
                      updateQuantity(productId, variant, item.quantity - 1);
                    } else {
                      removeFromCart(productId, variant);
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-lg border-none bg-transparent cursor-pointer"
                >
                  −
                </button>
                <span className="font-display text-[0.9rem] font-black text-gold">{cart.find(i => i.id === productId && i.variant === variant)?.quantity}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const item = cart.find(i => i.id === productId && i.variant === variant);
                    if (item) {
                      updateQuantity(productId, variant, Math.min(item.quantity + 1, 10));
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-lg border-none bg-transparent cursor-pointer"
                >
                  +
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={isInStock && !isLoading ? {
                  scale: 1.05,
                  color: '#c9a96e',
                  backgroundColor: '#fff8e8',
                  borderColor: '#c9a96e'
                } : {}}
                whileTap={isInStock && !isLoading ? { scale: 0.95 } : {}}
                onClick={handleAddToCart}
                disabled={!isInStock || isLoading}
                className={`
                  relative flex items-center justify-center w-full h-[44px]
                  bg-gold text-void border border-gold px-6 font-display text-[0.65rem] font-bold tracking-[2px] uppercase rounded-full shadow-lg
                  transition-all duration-300
                  ${(!isInStock || isLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : !isInStock ? (
                  'Out of Stock'
                ) : (
                  'Get This Deal Now'
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
