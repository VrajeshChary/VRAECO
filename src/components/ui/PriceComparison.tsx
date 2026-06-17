import { motion } from 'motion/react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export default function PriceDropAlert({ currentPrice, originalPrice }: { currentPrice: number; originalPrice: number }) {
  const discount = Math.round((1 - currentPrice / originalPrice) * 100);
  if (discount < 30) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-ember/5 border border-ember/20 rounded-lg px-3 py-2 mb-4 text-[0.72rem]"
    >
      <TrendingDown size={14} className="text-ember" />
      <span className="text-ember font-bold">Price Drop Alert!</span>
      <span className="text-text-dim">{discount}% below market price</span>
      <TrendingUp size={12} className="text-text-dim" />
    </motion.div>
  );
}
