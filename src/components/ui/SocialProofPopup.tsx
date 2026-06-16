import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../../data/products';

interface Notification {
  id: number;
  name: string;
  location: string;
  product: string;
  time: string;
  icon: string;
}

const names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Karan', 'Meera'];
const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];
const proofProducts = products.map(p => ({ name: p.name.split(' | ')[0], image: p.images[0] }));

export default function SocialProofPopup() {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomProduct = proofProducts[Math.floor(Math.random() * proofProducts.length)];
      const timeAgo = Math.floor(Math.random() * 5) + 1;

      setNotification({
        id: Date.now(),
        name: randomName,
        location: randomLocation,
        product: randomProduct.name,
        icon: randomProduct.image,
        time: `${timeAgo} min ago`
      });

      // Hide after 5 seconds
      setTimeout(() => setNotification(null), 5000);

      // Schedule next notification with fresh random delay
      const nextDelay = Math.random() * 15000 + 25000; // 25-40s
      timeout = setTimeout(showNotification, nextDelay);
    };

    // Initial delay: 8-15s
    const initialDelay = Math.random() * 7000 + 8000;
    timeout = setTimeout(showNotification, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[1000] bg-surface/90 border border-gold/20 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center gap-4 max-w-[340px] rounded-2xl backdrop-blur-xl group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gold/50"></div>
          <div className="w-14 h-14 bg-raised border border-edge flex items-center justify-center rounded-xl shrink-0 shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden p-1">
            <img src={notification.icon} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col pr-4">
            <div className="text-[0.85rem] text-text-main leading-tight font-medium">
              <span className="font-bold text-gold">{notification.name}</span> in {notification.location}
            </div>
            <div className="text-[0.78rem] text-text-muted mt-1">
              just bought <span className="text-text-main font-semibold">{notification.product}</span>
            </div>
            <div className="text-[0.65rem] text-jade mt-1.5 uppercase tracking-[1px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 bg-jade rounded-full animate-pulse shadow-[0_0_8px_rgba(61,220,151,0.5)]"></span>
              Verified Purchase
            </div>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="absolute top-2 right-2 text-text-dim hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
