import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Gift } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateDiscountCode } from '../../utils/discountCode';

export default function EmailCapturePopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Check if already captured locally
  useEffect(() => {
    const captured = localStorage.getItem('vraeco-email-captured');
    if (captured) return;

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Show after 30s or 60% scroll depth (whichever is first)
    const timer = setTimeout(() => {
      if (scrollPercentage >= 60 || window.scrollY > document.body.scrollHeight * 0.5) {
        setShow(true);
      }
    }, 30000);

    // Re-check scroll every 5s
    const scrollChecker = setInterval(() => {
      if (scrollPercentage >= 60) {
        setShow(true);
        clearInterval(scrollChecker);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(scrollChecker);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPercentage]);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      // Store locally
      localStorage.setItem('vraeco-email-captured', email);

      // Send to abandoned cart API (triggers email follow-up)
      const sessionId = useStore.getState().sessionId;
      const cart = useStore.getState().cart;

      if (cart.length > 0) {
        fetch('/api/cart/abandoned', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, items: cart, source: 'popup-signup' }),
        }).catch(() => {});
      }

      // Analytics
      if (window.fbq) {
        window.fbq('track', 'Lead', { source: 'email-popup' });
      }
      if (window.gtag) {
        window.gtag('event', 'sign_up', { method: 'email-popup' });
      }

      // Generate unique discount code
      const code = generateDiscountCode();
      const expiresAt = Date.now() + 10 * 60 * 1000;
      useStore.getState().setDiscount({ code, percentage: 10, expiresAt });
      localStorage.setItem('vraeco-discount', JSON.stringify({ code, percentage: 10, expiresAt }));

      setSubmitted(true);
      setTimeout(() => setShow(false), 4000);
    } catch {
      // fail silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-text-main/70 backdrop-blur-sm z-[5000] flex items-end sm:items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          {/* Dismiss button */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-6 right-6 text-text-dim hover:text-gold transition-colors bg-transparent border-none cursor-pointer z-[10]"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="bg-surface border border-gold/20 max-w-[440px] w-full rounded-2xl p-8 relative shadow-[0_0_80px_rgba(201,169,110,0.15)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-jade/10 rounded-full mb-4">
                  <Gift size={28} className="text-jade" />
                </div>
                <h3 className="font-serif text-[1.5rem] mb-2 text-text-main">Your exclusive 10% discount is unlocked!</h3>
                <p className="text-[0.75rem] text-text-dim mt-2">Auto-applied at checkout (valid for 10 minutes)</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full mb-3">
                    <Mail size={24} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-[1.8rem] leading-tight mb-2 text-text-main">
                    Get <em className="italic text-gold">10% OFF</em><br/>Your First Order
                  </h3>
                  <p className="text-[0.85rem] text-text-muted leading-relaxed">
                    Join 10,000+ savvy shoppers. Get exclusive deals, early access to new products, and your first email gets a discount code.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      className="w-full bg-raised border border-edge rounded-xl px-4 py-3.5 text-[0.9rem] text-text-main placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors"
                      autoFocus
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !email.includes('@')}
                    className={`w-full bg-gold text-void py-3.5 font-display text-[0.7rem] font-bold tracking-[2px] uppercase rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      isSubmitting || !email.includes('@')
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gold-light'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Gift size={14} />
                        Unlock My 10% OFF
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[0.65rem] text-text-dim">
                    No spam, ever. Unsubscribe anytime.
                  </span>
                </div>

                <button
                  onClick={() => setShow(false)}
                  className="text-[0.7rem] text-text-dim hover:text-text-muted transition-colors underline underline-offset-4 bg-transparent border-none cursor-pointer mt-3 block mx-auto"
                >
                  No thanks, I'll pay full price
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
