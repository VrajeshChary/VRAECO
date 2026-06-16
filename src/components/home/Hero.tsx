import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';

export default function Hero() {
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const [shoppers, setShoppers] = useState(347);

  useEffect(() => {
    // Dynamic shopper counter that changes realistically
    const interval = setInterval(() => {
      setShoppers((s) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = s + change;
        return Math.max(240, Math.min(480, next));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[95vh] relative flex items-center overflow-hidden bg-void py-20 lg:py-0">
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 hero-grid"></div>
      
      <div className="relative z-[2] section-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        <div className="text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 text-[0.65rem] tracking-[3px] uppercase text-gold mb-6 border border-gold/30 px-4 py-2 bg-gold/5 rounded-full"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </div>
            <span className="font-bold">{shoppers.toLocaleString()}+</span> People Shopping Right Now
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-responsive-h1 font-serif font-light tracking-[-2px] text-text-main mb-4"
          >
            The Viral <br/>
            <span className="relative inline-block">
              <em className="italic text-gold">Essentials</em>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-1 bg-gold/30"
              />
            </span>
            <br/>You Deserve.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[0.75rem] text-gold font-medium mb-8 flex flex-wrap items-center gap-2 justify-center lg:justify-start leading-relaxed"
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-jade text-[1rem]">★★★★★</span>
              <span className="text-text-dim whitespace-nowrap">Trusted by</span>
              <strong className="text-text-main whitespace-nowrap">10,000+</strong>
              <span className="text-text-dim whitespace-nowrap">happy customers</span>
            </div>
            <span className="hidden sm:inline-block mx-1 text-edge">•</span>
            <span className="bg-amber/10 text-amber px-2.5 py-1 rounded-md text-[0.6rem] font-bold uppercase tracking-[1px] shrink-0 mt-2 sm:mt-0">
              Top Selling This Week
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-responsive-body text-text-muted max-w-[500px] mb-12 font-light mx-auto lg:mx-0"
          >
            Discover the products taking over your feed. Curated for quality, priced for everyone, and delivered with a smile. Join the VRAECO revolution today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 flex-wrap items-center justify-center lg:justify-start w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('products')}
              className="btn-primary px-8 py-4 sm:px-10 sm:py-5 text-[0.75rem] sm:text-[0.8rem] tracking-[3px] w-full sm:w-auto cta-glow"
            >
              Shop Now
            </button>
            <button 
              onClick={() => scrollToSection('mystery')}
              className="btn-ghost px-8 py-4 sm:px-10 sm:py-5 text-[0.75rem] sm:text-[0.8rem] tracking-[3px] border-gold/20 hover:border-gold w-full sm:w-auto"
            >
              Get 10% Off
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex gap-8 mt-10 pt-8 border-t border-edge overflow-x-auto no-scrollbar pb-4 lg:pb-0"
          >
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-[1.6rem] text-gold leading-none">3,200+</span>
              <span className="text-[0.65rem] text-text-dim tracking-[1px] uppercase mt-1">Happy Orders</span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-[1.6rem] text-gold leading-none">4.8★</span>
              <span className="text-[0.65rem] text-text-dim tracking-[1px] uppercase mt-1">Avg Rating</span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-[1.6rem] text-gold leading-none">₹0</span>
              <span className="text-[0.65rem] text-text-dim tracking-[1px] uppercase mt-1">Free Always</span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-[1.6rem] text-gold leading-none">COD</span>
              <span className="text-[0.65rem] text-text-dim tracking-[1px] uppercase mt-1">Pan-India</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <motion.div
            className="bg-surface border border-[rgba(201,169,110,0.15)] p-10 relative overflow-hidden rounded-2xl shadow-2xl glow-gold min-h-[520px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            <div className="text-center mb-4">
              <img src={products[0].images[0]} alt={products[0].name} className="w-[300px] mx-auto block product-img-shadow" />
            </div>
            <div className="font-serif text-[1.4rem] font-semibold text-center mb-2">{products[0].name.split(' | ')[0]}</div>
            <div className="text-[0.78rem] text-text-muted text-center mb-4">{products[0].hookLine}</div>

            <div className="flex flex-col items-center gap-1 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[0.75rem] text-text-dim line-through">MRP ₹{products[0].originalPrice}</span>
                <span className="font-serif text-[1.8rem] text-gold font-semibold">₹{products[0].vraecoPrice}</span>
              </div>
              <span className="text-[0.7rem] text-jade font-bold">You save ₹{products[0].originalPrice - products[0].vraecoPrice}</span>
              <span className="text-[0.65rem] text-ember-soft uppercase tracking-wider mt-0.5 urgent-pulse">Deal ends soon</span>
            </div>
            
            <div className="flex items-center gap-3 mt-4 p-3 bg-raised border border-edge">
              <div className="flex">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-dim to-gold border-2 border-void flex items-center justify-center text-[0.6rem] font-bold text-void">P</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-dim to-gold border-2 border-void flex items-center justify-center text-[0.6rem] font-bold text-void -ml-2">R</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-dim to-gold border-2 border-void flex items-center justify-center text-[0.6rem] font-bold text-void -ml-2">A</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-dim to-gold border-2 border-void flex items-center justify-center text-[0.6rem] font-bold text-void -ml-2">S</div>
              </div>
              <div className="text-[0.72rem] text-text-muted"><strong className="text-text-main">847 people</strong> bought this week</div>
            </div>
            
            <div className="w-full mt-4">
              {cart.find(item => item.id === products[0].id) ? (
                <div className="flex items-center gap-3 bg-raised border border-gold/30 rounded-xl px-4 py-3 justify-between h-[52px]">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const item = cart.find(i => i.id === products[0].id);
                      if (item && item.quantity > 1) {
                        updateQuantity(products[0].id, undefined, item.quantity - 1);
                      } else {
                        removeFromCart(products[0].id);
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                  >
                    −
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="font-display text-[1.1rem] font-black text-gold leading-none">{cart.find(i => i.id === products[0].id)?.quantity}</span>
                    <span className="text-[0.5rem] text-gold/60 uppercase tracking-[1px] mt-1">In Cart</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const item = cart.find(i => i.id === products[0].id);
                      if (item) {
                        updateQuantity(products[0].id, undefined, Math.min(item.quantity + 1, 10));
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart({
                      id: products[0].id,
                      name: products[0].name.split(' | ')[0],
                      price: products[0].vraecoPrice,
                      image: products[0].images[0],
                      quantity: 1
                    });
                  }}
                  className="btn-primary w-full text-center h-[52px]"
                >
                  Get This Deal Now
                </motion.button>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
