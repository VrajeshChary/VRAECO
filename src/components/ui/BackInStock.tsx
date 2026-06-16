import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Bell, Mail, Check, X } from 'lucide-react';

interface BackInStockProps {
  productId: string;
  productName: string;
}

export default function BackInStock({ productId, productName }: BackInStockProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const notifications = JSON.parse(localStorage.getItem('vraeco-backinstock') || '[]');
    notifications.push({
      productId,
      email: email.trim().toLowerCase(),
      timestamp: Date.now(),
    });
    localStorage.setItem('vraeco-backinstock', JSON.stringify(notifications));

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="bg-surface/50 border border-ember/20 rounded-xl p-5 glass-card">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif text-[1.1rem] text-text-main">
                Currently Out of Stock
              </h3>
            </div>
            <p className="text-[0.8rem] text-text-muted mb-5">
              You'll be first to know when <span className="text-gold font-medium">{productName}</span> is back in stock.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter your email"
                  className="w-full bg-raised border border-edge rounded-lg pl-10 pr-4 py-2.5 text-[0.8rem] text-text-main placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-display text-[0.65rem] font-bold tracking-[1.5px] uppercase hover:bg-amber-500 transition-colors whitespace-nowrap border-none cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Notify Me
              </motion.button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-ember text-[0.7rem] mt-2"
              >
                {error}
              </motion.div>
            )}

            <p className="text-[0.65rem] text-text-dim mt-3 flex items-center gap-1.5">
              <X className="w-3 h-3" />
              We'll only send one email when it's back. No spam, we promise.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-14 h-14 bg-jade/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-7 h-7 text-jade" />
            </motion.div>
            <h3 className="font-serif text-[1.2rem] text-text-main mb-2">
              You're on the list!
            </h3>
            <p className="text-[0.8rem] text-text-muted">
              We'll email <span className="text-gold">{email}</span> the moment <span className="text-text-main">{productName}</span> is restocked.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
