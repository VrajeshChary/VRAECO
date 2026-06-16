
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import { ShoppingCart, Package, ChevronDown, X, Sparkles } from 'lucide-react';

interface BundleBuilderProps {
  productCount?: number;
}

export default function BundleBuilder({ productCount = 4 }: BundleBuilderProps) {
  const { addToCart } = useStore();
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const bundleProducts = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, productCount);
  }, []);

  const bundleSubtotal = slots.reduce((acc, productId) => {
    if (!productId) return acc;
    const p = products.find((pr) => pr.id === productId);
    return acc + (p ? p.vraecoPrice : 0);
  }, 0);

  const discountPercent = 15;
  const discountAmount = Math.round(bundleSubtotal * (discountPercent / 100));
  const bundleTotal = bundleSubtotal - discountAmount;
  const allSlotsFilled = slots.every((s) => s !== null);

  const handleSelect = (slotIndex: number, productId: string) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = productId;
    setSlots(newSlots);
    setOpenSlot(null);
  };

  const handleRemove = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
    setAddedToCart(false);
  };

  const handleAddBundleToCart = () => {
    if (!allSlotsFilled) return;

    slots.forEach((productId) => {
      if (!productId) return;
      const p = products.find((pr) => pr.id === productId);
      if (p) {
        addToCart({
          id: p.id,
          name: p.name.split(' | ')[0],
          price: p.vraecoPrice,
          image: p.images[0],
          quantity: 1,
        });
      }
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getProductById = (id: string | null) => {
    if (!id) return null;
    return products.find((p) => p.id === id) || null;
  };

  return (
    <div className="bg-surface border border-gold/20 rounded-xl overflow-hidden glass-card">
      <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-transparent px-5 py-4 border-b border-gold/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-[1.2rem] text-text-main flex items-center gap-2">
              Build Your Own Bundle
              <Sparkles className="w-4 h-4 text-gold" />
            </h3>
            <p className="text-[0.75rem] text-text-muted">
              Pick 3 products, save <span className="text-gold font-bold">{discountPercent}%</span> automatically
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {slots.map((selectedId, slotIndex) => {
          const product = getProductById(selectedId);
          const isOpen = openSlot === slotIndex;

          return (
            <motion.div
              key={slotIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: slotIndex * 0.08 }}
              className="relative"
            >
              {!product ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenSlot(isOpen ? null : slotIndex)}
                    className="w-full flex items-center justify-between bg-raised border border-dashed border-edge rounded-lg px-4 py-3 text-[0.78rem] text-text-muted hover:border-gold/50 hover:text-gold transition-all min-h-[44px]"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4 opacity-50" />
                      Slot {slotIndex + 1}: Choose Product
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-raised border border-gold/20 rounded-lg overflow-hidden z-10 shadow-xl"
                      >
                        <div className="p-2 max-h-48 overflow-y-auto">
                          {bundleProducts.map((p) => {
                            const alreadySelected = slots.includes(p.id);
                            return (
                              <button
                                key={p.id}
                                disabled={alreadySelected}
                                onClick={() => handleSelect(slotIndex, p.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[0.78rem] transition-all border-none cursor-pointer ${
                                  alreadySelected
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'hover:bg-gold/10 text-text-main'
                                }`}
                              >
                                <div className="w-8 h-8 bg-surface rounded flex items-center justify-center shrink-0 overflow-hidden">
                                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate text-[0.72rem] font-medium">{p.name.split(' | ')[0]}</div>
                                  <div className="text-gold text-[0.7rem] font-semibold">₹{p.vraecoPrice}</div>
                                </div>
                                {alreadySelected && (
                                  <span className="text-[0.6rem] text-text-dim">Added</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-raised/50 border border-gold/20 rounded-lg px-4 py-3">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.78rem] font-medium text-text-main truncate">
                      {product.name.split(' | ')[0]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-[0.75rem] font-semibold">₹{product.vraecoPrice}</span>
                      <span className="text-[0.65rem] text-text-dim line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(slotIndex)}
                    className="w-7 h-7 bg-raised border border-edge rounded-full flex items-center justify-center text-text-muted hover:text-ember hover:border-ember/50 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {bundleSubtotal > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gold/10 px-5 py-4"
          >
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-[0.8rem] text-text-muted">
                <span>Subtotal ({slots.filter(Boolean).length} items)</span>
                <span>₹{bundleSubtotal}</span>
              </div>
              <div className="flex justify-between text-[0.8rem] text-jade">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bundle Discount ({discountPercent}%)
                </span>
                <span>-₹{discountAmount}</span>
              </div>
              <div className="flex justify-between text-[1rem] pt-2 border-t border-edge">
                <span className="font-semibold text-text-main">Bundle Total</span>
                <span className="font-serif text-[1.3rem] text-gold font-bold">₹{bundleTotal}</span>
              </div>
              <div className="text-[0.65rem] text-jade text-right">
                You save ₹{discountAmount} with this bundle
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddBundleToCart}
              disabled={!allSlotsFilled || addedToCart}
              className={`w-full py-3.5 rounded-lg font-display text-[0.68rem] font-bold tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                addedToCart
                  ? 'bg-jade/20 text-jade border border-jade/30 cursor-default'
                  : allSlotsFilled
                  ? 'bg-gold text-void hover:bg-gold-light shadow-xl shadow-gold/10 cursor-pointer'
                  : 'bg-raised text-text-dim cursor-not-allowed border border-edge'
              }`}
            >
              {addedToCart ? (
                <>Added Bundle to Cart!</>
              ) : allSlotsFilled ? (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add Bundle to Cart
                </>
              ) : (
                <>{3 - slots.filter(Boolean).length} more to add</>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
