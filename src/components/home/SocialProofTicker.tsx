import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Jaipur', 'Lucknow', 'Ahmedabad', 'Kochi', 'Surat', 'Indore', 'Nagpur'];
const products = ['Veg Peeler & Cutter', 'Mini Chopper 450ml', 'Posture Corrector Belt', 'Ice Roller + Jade Roller', 'Hair Gloss Serum', 'Crystal Ball Lamp', 'Neck Fan 360°', 'Laptop Stand', 'Ocean Wave Projector', 'Diamond Jewellery Set'];

export default function SocialProofTicker() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ city: '', product: '', timeAgo: '' });

  useEffect(() => {
    const show = () => {
      const timeAgo = ['just now', '2 min ago', '5 min ago', '8 min ago', '12 min ago'];
      setData({
        city: cities[Math.floor(Math.random() * cities.length)],
        product: products[Math.floor(Math.random() * products.length)],
        timeAgo: timeAgo[Math.floor(Math.random() * timeAgo.length)],
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First show after 5s, then every 15-25s
    const initial = setTimeout(show, 5000);
    const interval = setInterval(show, 15000 + Math.random() * 10000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: visible ? 0 : -300, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed bottom-6 left-6 z-[9998] bg-surface border border-gold/20 rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 max-w-[320px] backdrop-blur-lg"
    >
      <span className="text-[1.2rem]">✓</span>
      <div>
        <p className="text-[0.72rem] text-text-main">
          <strong>{data.city}</strong> ordered <strong>{data.product}</strong>
        </p>
        <p className="text-[0.6rem] text-text-dim">{data.timeAgo}</p>
      </div>
    </motion.div>
  );
}
