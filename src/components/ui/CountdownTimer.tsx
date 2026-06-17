import { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return Math.max(0, Math.floor((endOfDay.getTime() - now.getTime()) / 1000));
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  if (timeLeft <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-xl px-4 py-3"
    >
      <Zap size={16} className="text-gold animate-pulse" />
      <span className="text-[0.72rem] text-text-muted font-medium">Flash sale ends in:</span>
      <div className="flex items-center gap-1.5">
        {[
          { val: h, label: 'hrs' },
          { val: m, label: 'min' },
          { val: s, label: 'sec' },
        ].map((unit, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gold text-lg font-bold">:</span>}
            <span className="bg-gold text-void font-display text-[0.85rem] font-black px-2 py-1 rounded shadow-lg">
              {String(unit.val).padStart(2, '0')}
            </span>
          </span>
        ))}
      </div>
      <Clock size={14} className="text-gold/60" />
    </motion.div>
  );
}
