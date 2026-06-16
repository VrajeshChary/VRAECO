import { useState, useEffect } from 'react';

const messages = [
  '🔥 FLASH SALE LIVE — Up to 50% OFF trending products',
  '🚚 FREE Shipping on All Orders Across India',
  '💳 COD available pan-India',
  '🔒 Secure Payments — UPI, Cards, Netbanking',
  '⭐ 4.8/5 from 3,200+ verified reviews',
  '🎉 New customer? Get extra 10% off at checkout',
];

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotation = setInterval(() => {
      setMsg(prev => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(rotation);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gradient-to-r from-cream via-gold-soft to-cream border-b border-gold/20 text-gold text-center py-2.5 px-4 font-semibold text-[0.68rem] tracking-[2px] uppercase overflow-hidden relative z-[100] flex items-center justify-center gap-3 flex-wrap">
      <span className="transition-all">{messages[msg]}</span>
      <div className="hidden sm:flex items-center gap-2 bg-gold/10 px-3 py-0.5 rounded-full">
        <span className="text-[0.6rem]">⏰</span>
        <span>Ends in</span>
        <span className="font-mono font-bold text-text-main">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  );
}
