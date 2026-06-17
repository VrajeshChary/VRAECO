import { Helmet } from '../components/Helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { products } from '../data/products';

export default function Upsell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  // One-time upsell enforcement — block if already claimed
  const alreadyClaimed = typeof window !== 'undefined' && localStorage.getItem('vraeco-upsell-claimed');
  if (alreadyClaimed) {
    navigate(`/order-success/${id}`);
    return null;
  }

  const [upsellProduct] = useState(() => {
    const cheapProducts = products.filter(p => p.vraecoPrice <= 399);
    const idx = Math.floor(Math.random() * cheapProducts.length);
    return cheapProducts[idx] || products[0];
  });

  const handleAddUpsell = () => {
    localStorage.setItem('vraeco-upsell-claimed', 'true');
    addToCart({
      id: upsellProduct.id,
      name: upsellProduct.name.split(' | ')[0],
      price: upsellProduct.vraecoPrice,
      image: upsellProduct.images[0],
      quantity: 1
    });
    addToast("Special offer added to your order!", "success");
    navigate(`/order-success/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Special One-Time Offer | VRAECO — Don't Miss Out!</title>
        <link rel="canonical" href="https://vreco.vercel.app" />
      </Helmet>
    <main className="pt-32 pb-20 min-h-screen bg-void flex items-center justify-center px-5">
      <div className="max-w-[600px] w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface border-2 border-gold p-8 md:p-12 text-center relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-void px-6 py-1 font-bold text-[0.7rem] uppercase tracking-[2px] rounded-full shadow-[0_0_20px_rgba(201,169,110,0.5)]">
            Wait! One Last Special Offer
          </div>

          <h1 className="font-serif text-[2.2rem] mb-4 text-text-main">Exclusive Post-Purchase Deal</h1>
          <p className="text-text-muted mb-8">Since you just ordered, we want to offer you our #1 best-selling accessory at a 60% discount. This offer expires when you leave this page.</p>

          <div className="bg-raised border border-edge p-6 rounded-xl mb-8 flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="w-24 h-24 bg-surface border border-edge flex items-center justify-center rounded-lg shrink-0 shadow-inner overflow-hidden p-2">
              <img src={upsellProduct.images[0]} alt={upsellProduct.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-serif text-[1.3rem] mb-1">{upsellProduct.name.split(' | ')[0]}</h3>
              <p className="text-[0.8rem] text-text-dim mb-3">{upsellProduct.hookLine}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-[0.7rem] text-text-dim line-through">MRP ₹{upsellProduct.originalPrice}</span>
                <span className="text-[1.8rem] font-serif text-gold font-bold">₹{upsellProduct.vraecoPrice}</span>
                <span className="bg-ember text-white text-[0.6rem] font-bold px-2 py-0.5 rounded">SAVE 60%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddUpsell}
              className="w-full bg-gold text-void py-5 font-display text-[0.8rem] font-bold tracking-[3px] uppercase cursor-pointer shadow-[0_10px_30px_rgba(201,169,110,0.3)]"
            >
              Yes! Add to my order for ₹{upsellProduct.vraecoPrice}
            </motion.button>
            <button
              onClick={() => navigate(`/order-success/${id}`)}
              className="text-[0.75rem] text-text-dim hover:text-text-muted transition-colors underline bg-transparent border-none cursor-pointer"
            >
              No thanks, I'll pass on this one-time deal
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 opacity-50">
            <div className="flex items-center gap-2">
              <span className="text-[1.2rem]">🚚</span>
              <span className="text-[0.65rem] uppercase tracking-[1px]">Ships with order</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[1.2rem]">🔒</span>
              <span className="text-[0.65rem] uppercase tracking-[1px]">Secure Add-on</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}
