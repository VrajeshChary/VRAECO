import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';

export default function StickyAtc() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const featuredProduct = products[0];

  useEffect(() => {
    const handleScroll = () => {
      const productSection = document.getElementById('productpage');
      if (productSection) {
        const rect = productSection.getBoundingClientRect();
        // Show after scrolling past the main ATC button area
        if (rect.top < -100 && rect.bottom > 400) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulate add-to-cart process
    await new Promise(resolve => setTimeout(resolve, 1000));

    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name.split(' | ')[0],
      price: featuredProduct.vraecoPrice,
      image: featuredProduct.images[0],
      quantity: 1,
    });

    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-edge py-4 px-5 md:px-10 flex items-center justify-between gap-4 z-[300] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="hidden md:flex items-center gap-5">
            <div className="w-14 h-14 bg-raised border border-edge flex items-center justify-center text-[2rem] rounded-xl shadow-2xl">
              <img src={featuredProduct.images[0]} alt={featuredProduct.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[0.95rem] font-bold text-text-main leading-tight">{featuredProduct.name.split(' | ')[0]}</div>
              <div className="font-serif text-[1.4rem] text-gold font-bold mt-1">
                ₹{featuredProduct.vraecoPrice} <span className="text-[0.8rem] text-text-dim line-through font-sans ml-2">₹{featuredProduct.originalPrice}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 md:flex-none flex items-center gap-6">
            <div className="md:hidden flex flex-col flex-1">
              <span className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-bold">{featuredProduct.name.split(' | ')[0].split(' ')[0]}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[1.1rem] font-serif text-gold font-bold">₹{featuredProduct.vraecoPrice}</span>
                <span className="text-[0.65rem] text-text-dim line-through">₹{featuredProduct.originalPrice}</span>
              </div>
            </div>

            <motion.button
              whileHover={!isLoading ? {
                scale: 1.05,
                backgroundColor: '#d4af37',
                color: '#111827'
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`
                relative flex items-center justify-center min-w-[140px] h-[52px]
                bg-gold text-void border-none px-10 font-display text-[0.7rem] font-bold tracking-[3px] uppercase rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)]
                transition-all duration-300
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'ADD TO CART'
              )}
            </motion.button>
            <motion.button
              whileHover={!isLoading ? {
                scale: 1.05,
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              onClick={() => navigate('/checkout')}
              disabled={isLoading}
              className={`
                relative flex items-center justify-center min-w-[140px] h-[52px]
                bg-ember text-white border-none px-8 font-display text-[0.7rem] font-bold tracking-[2px] uppercase rounded-full shadow-[0_10px_30px_rgba(212,69,43,0.4)]
                transition-all duration-300 hidden md:flex
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              BUY NOW
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
