import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function UrgencyBanner() {
  const [orders, setOrders] = useState(() => Math.floor(Math.random() * 80) + 180);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((o) => {
        const change = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
        return o + change;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-ember/10 border-b border-ember/20 py-1.5 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-ember/5 via-transparent to-ember/5 animate-pulse" />
      <div className="text-[0.7rem] text-amber tracking-wide flex items-center justify-center gap-2 relative z-10">
        <Zap size={13} className="text-amber animate-pulse" />
        <strong className="text-text-main">{orders.toLocaleString()}</strong> orders placed in the last hour
        <Zap size={13} className="text-amber animate-pulse" />
      </div>
    </div>
  );
}
