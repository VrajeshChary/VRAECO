import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { getProductById } from '../../data/products';

interface Bundle {
  id: string;
  name: string;
  desc: string;
  items: string[];
  price: number;
  oldPrice: number;
  featured?: boolean;
  timerSeconds?: number;
  urgencyText?: string;
}

const bundleDefs = [
  {
    id: 'bundle-chopper-peeler',
    name: 'Chopper + Peeler Combo',
    desc: 'Start with the two essentials. Chop and peel in half the time.',
    productIds: ['mini-chopper-450ml', 'veg-peeler-cutter'],
    discountPct: 15,
    timerSeconds: 4 * 3600 + 23 * 60 + 11
  },
  {
    id: 'bundle-kitchen-starter',
    name: 'Kitchen Starter Pack',
    desc: 'Everything you need for a smarter, faster kitchen experience.',
    productIds: ['mini-chopper-450ml', 'veg-peeler-cutter', 'hand-blender'],
    discountPct: 20,
    featured: true,
    urgencyText: 'Only 6 bundle deals left at this price'
  },
  {
    id: 'bundle-lighting-combo',
    name: 'Lighting Combo Set',
    desc: 'Transform your space with ambient lighting that mesmerizes.',
    productIds: ['crystal-ball-lamp', 'ocean-wave-projector'],
    discountPct: 18,
    timerSeconds: 4 * 3600 + 23 * 60 + 11
  }
];

function buildBundle(def: (typeof bundleDefs)[number]): Bundle {
  const products = def.productIds.map(getProductById);
  const totalPrice = products.reduce((sum, p) => sum + (p?.vraecoPrice ?? 0), 0);
  const price = Math.round(totalPrice * (1 - def.discountPct / 100));
  const items = products.map(p => p?.name.split(' | ')[0] ?? '');
  return {
    id: def.id,
    name: def.name,
    desc: def.desc,
    items,
    price,
    oldPrice: totalPrice,
    featured: def.featured,
    timerSeconds: def.timerSeconds,
    urgencyText: def.urgencyText
  };
}

const bundles = bundleDefs.map(buildBundle);

function Timer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <span className="font-display text-[0.85rem] text-ember tracking-[1px]">
      {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}

export default function Bundles() {
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const handleAddBundle = (bundle: Bundle) => {
    addToCart({
      id: bundle.id,
      name: bundle.name,
      price: bundle.price,
      image: '🎁',
      quantity: 1
    });
  };

  return (
    <section className="py-20 relative z-[2] overflow-hidden" id="bundles">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(61,152,196,0.08) 0%, transparent 70%)' }}></div>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Save More
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Curated <em>Bundles</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-sub"
        >
          Thoughtfully paired products. Visible savings. One click to upgrade your life.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`bg-raised border p-8 rounded-3xl relative overflow-hidden transition-all duration-500 group ${bundle.featured ? 'border-gold/40 shadow-[0_20px_80px_rgba(201,169,110,0.15)]' : 'border-edge hover:border-gold/20 shadow-2xl'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              {bundle.featured && (
                <div className="absolute top-4 right-4 bg-gold text-void text-[0.6rem] font-bold tracking-[2px] px-4 py-1 rounded-full shadow-xl animate-pulse">
                  BEST VALUE
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-[1.6rem] font-bold mb-3 group-hover:text-gold transition-colors">{bundle.name}</h3>
                <p className="text-[0.85rem] text-text-muted leading-relaxed">{bundle.desc}</p>
              </div>

              <div className="space-y-3 mb-8">
                {bundle.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[0.85rem] text-text-muted group/item">
                    <div className="w-5 h-5 rounded-full bg-jade/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-jade/20 transition-colors">
                      <span className="text-jade text-[0.6rem] font-bold">✓</span>
                    </div>
                    <span className="group-hover/item:text-text-main transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1 mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[2.2rem] text-gold font-bold">₹{bundle.price}</span>
                  <span className="text-[1rem] text-text-dim line-through">₹{bundle.oldPrice}</span>
                </div>
                <div className="inline-flex self-start bg-jade/10 text-jade border border-jade/20 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-[1px]">
                  Save ₹{bundle.oldPrice - bundle.price} ({(100 - (bundle.price / bundle.oldPrice * 100)).toFixed(0)}% OFF)
                </div>
              </div>

              <div className="w-full">
                {cart.find(item => item.id === bundle.id) ? (
                  <div className="flex items-center gap-3 bg-raised border border-gold/30 rounded-xl px-4 py-3 justify-between h-[52px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const item = cart.find(i => i.id === bundle.id);
                        if (item && item.quantity > 1) {
                          updateQuantity(bundle.id, undefined, item.quantity - 1);
                        } else {
                          removeFromCart(bundle.id);
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                    >
                      −
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="font-display text-[1.1rem] font-black text-gold leading-none">{cart.find(i => i.id === bundle.id)?.quantity}</span>
                      <span className="text-[0.5rem] text-gold/60 uppercase tracking-[1px] mt-1">In Cart</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const item = cart.find(i => i.id === bundle.id);
                        if (item) {
                          updateQuantity(bundle.id, undefined, item.quantity + 1);
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddBundle(bundle)}
                    className={`w-full py-4 rounded-xl font-display text-[0.7rem] font-bold tracking-[3px] uppercase transition-all duration-300 h-[52px] ${bundle.featured ? 'bg-gold text-void shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-[#d4af37]' : 'bg-surface text-text-main border border-edge hover:border-gold hover:text-gold'}`}
                  >
                    ADD BUNDLE TO CART
                  </motion.button>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mt-5 text-[0.75rem] font-bold uppercase tracking-[1px]">
                {bundle.timerSeconds ? (
                  <div className="flex items-center gap-2 text-ember">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-ember"></span>
                    </span>
                    ENDS IN: <Timer initialSeconds={bundle.timerSeconds} />
                  </div>
                ) : (
                  <div className="text-gold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
                    {bundle.urgencyText}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
