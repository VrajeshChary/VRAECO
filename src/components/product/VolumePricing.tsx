import { motion } from 'motion/react';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Tier {
  minQty: number;
  discount: number;
  label: string;
}

export default function VolumePricing({
  price,
  onQuantityChange,
}: {
  price: number;
  onQuantityChange: (qty: number, discountedPrice: number) => void;
}) {
  const [selectedTier, setSelectedTier] = useState(0);

  const tiers: Tier[] = [
    { minQty: 1, discount: 0, label: 'Single' },
    { minQty: 2, discount: 10, label: '2 Pack — 10% OFF' },
    { minQty: 3, discount: 20, label: '3 Pack — 20% OFF' },
    { minQty: 5, discount: 30, label: '5 Pack — 30% OFF' },
  ];

  const discountedPrice = (qty: number, discount: number) => Math.round(price * (1 - discount / 100));

  return (
    <div className="mb-6">
      <div className="text-[0.68rem] text-text-muted mb-3 flex items-center gap-1.5">
        <ShoppingCart size={14} className="text-gold" />
        <span className="font-bold text-text-main">Quantity Breaks — Save More, Buy More</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tiers.map((tier, i) => {
          const isActive = selectedTier === i;
          const finalPrice = discountedPrice(tier.minQty, tier.discount);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedTier(i);
                onQuantityChange(tier.minQty, finalPrice);
              }}
              className={`relative rounded-xl border-2 p-3 text-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(201,169,76,0.15)]'
                  : 'border-edge bg-surface hover:border-gold/30'
              }`}
            >
              {tier.discount > 0 && (
                <div className="absolute -top-2 -right-2 bg-gold text-void text-[0.5rem] font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {tier.discount}%
                </div>
              )}
              <div className={`text-[0.7rem] font-bold ${isActive ? 'text-gold' : 'text-text-main'}`}>
                {tier.minQty} {tier.minQty === 1 ? 'pc' : 'pcs'}
              </div>
              <div className={`font-serif text-[1.1rem] font-bold ${isActive ? 'text-gold' : 'text-text-dim'}`}>
                &#8377;{finalPrice}
              </div>
              {tier.discount > 0 && (
                <div className="text-[0.55rem] text-jade font-bold">
                  &#8377;{(price - finalPrice) * tier.minQty} saved
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
