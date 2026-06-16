import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
          className="fixed top-0 left-0 right-0 z-[10000] bg-ember text-white text-center py-3 px-4 text-[0.8rem] font-medium shadow-lg"
        >
          You are offline. Please check your internet connection.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
