import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gift, Percent, Truck } from 'lucide-react';

import { X } from 'lucide-react';

export default function ReturningVisitor() {
  const [isReturning, setIsReturning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const checkout = location.pathname === '/checkout';

  useEffect(() => {
    const sessionCount = parseInt(localStorage.getItem('vraeco-sessions') || '0');
    localStorage.setItem('vraeco-sessions', String(sessionCount + 1));
    if (sessionCount > 0) setIsReturning(true);
  }, [location.pathname]);

  if (!isReturning || checkout || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      className="fixed bottom-6 left-6 z-[95] bg-white border border-gold/20 rounded-xl p-4 shadow-2xl max-w-[320px]"
    >
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-text-dim hover:text-text-main transition-colors bg-transparent border-none cursor-pointer p-1"
      >
        <X size={14} />
      </button>
      <div className="flex flex-col gap-2 text-[0.75rem] text-text-muted mt-1">
        <span className="font-bold text-text-main text-[0.85rem]">Welcome back! 🎉</span>
        <span className="flex items-center gap-2"><Percent size={14} className="text-gold shrink-0" /> Extra 5% today applied</span>
        <span className="flex items-center gap-2"><Truck size={14} className="text-gold shrink-0" /> Free shipping over ₹999</span>
        <span className="flex items-center gap-2"><Gift size={14} className="text-gold shrink-0" /> Earn loyalty points automatically</span>
      </div>
    </motion.div>
  );
}
