import { useState, useEffect } from 'react';

export default function AnnouncementTicker() {
  const [index, setIndex] = useState(0);
  const messages = [
    '🔥 FLASH SALE — Up to 50% OFF trending products',
    '🚚 FREE shipping on all orders — No minimum',
    '⭐ 4.8/5 from 3,200+ verified reviews',
    '💳 COD available pan-India',
    '🎉 New customer? Get extra 10% off at checkout',
    '⚡ Limited stock — Products selling out fast',
  ];

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gold text-void py-1 overflow-hidden text-center relative">
      <div
        key={index}
        className="animate-[fadeIn_0.3s_ease-in-out] text-[0.65rem] font-display font-bold tracking-[2px] uppercase whitespace-nowrap"
      >
        {messages[index]}
      </div>
    </div>
  );
}
