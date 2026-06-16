import { motion } from 'motion/react';

export default function PriceHistoryChart({ currentPrice, originalPrice }: { currentPrice: number; originalPrice: number }) {
  const savings = originalPrice - currentPrice;
  const points = [
    { month: 'Jan', price: originalPrice },
    { month: 'Feb', price: originalPrice - 50 },
    { month: 'Mar', price: originalPrice - 100 },
    { month: 'Apr', price: currentPrice },
  ];
  const maxPrice = originalPrice;
  const minPrice = currentPrice - 50;
  const range = maxPrice - minPrice;

  const pathPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p.price - minPrice) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-surface border border-edge rounded-xl p-4 mb-6">
      <div className="text-[0.7rem] text-text-dim uppercase tracking-wider mb-3 flex items-center justify-between">
        <span>Price History (Last 4 Months)</span>
        <span className="text-jade font-bold">You save ₹{savings}!</span>
      </div>
      <svg viewBox="0 0 100 100" className="w-full h-24 overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22a87a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22a87a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`${pathPoints} 100,100 0,100`} fill="url(#priceGrad)" />
        <polyline points={pathPoints} fill="none" stroke="#22a87a" strokeWidth="2" />
        {points.map((p, i) => {
          const x = (i / (points.length - 1)) * 100;
          const y = 100 - ((p.price - minPrice) / range) * 100;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#22a87a" />
              <text x={x} y={y - 8} className="fill-gold text-[8px]" textAnchor="middle" fontSize="8">₹{p.price}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-[0.6rem] text-text-dim">
        {points.map((p, i) => <span key={i}>{p.month}</span>)}
      </div>
    </div>
  );
}