import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';

export default function FirstVisitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('vraeco-visited');
    if (!visited) {
      // Show after 8 seconds
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem('vraeco-visited', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-text-main/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-gold/30 rounded-3xl max-w-[440px] w-full p-8 md:p-10 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-text-dim hover:text-text-main bg-transparent border-none cursor-pointer">
              <X size={20} />
            </button>

            <Gift size={40} className="text-gold mx-auto mb-4" />
            <h2 className="font-serif text-[2rem] mb-2">Wait! Your Gift Awaits</h2>
            <p className="text-[0.9rem] text-text-muted mb-2">
              First-time visitor? Here's something special:
            </p>
            <div className="text-[2.5rem] font-serif text-gold font-bold mb-6">EXTRA 10% OFF</div>

            <div className="mb-6 flex items-center justify-center gap-2 text-[0.75rem] text-text-dim">
              <span>🎁 Free shipping</span>
              <span>•</span>
              <span>💳 COD available</span>
              <span>•</span>
              <span>🔄 Easy returns</span>
            </div>

            <a
              href="/shop"
              className="btn-primary block w-full text-center py-4 text-[0.7rem]"
              onClick={() => setShow(false)}
            >
              Start Shopping Now
            </a>
            <button
              onClick={() => setShow(false)}
              className="mt-3 text-[0.65rem] text-text-dim hover:text-text-main underline underline-offset-4 bg-transparent border-none cursor-pointer"
            >
              No thanks, I'll pay full price
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}