import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import {
  Copy,
  Check,
  Share2,
  Gift,
  X,
  Sparkles,
  MessageCircle,
  Link as LinkIcon,
} from 'lucide-react';

interface ReferFriendProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferFriend({ isOpen, onClose }: ReferFriendProps) {
  const { sessionId } = useStore();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const referralCode = sessionId
    ? `VRA-${sessionId.slice(0, 6).toUpperCase()}`
    : `VRA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const shareMessage = encodeURIComponent(
    `Hey! I'm shopping on VRAECO and found amazing deals. Use my referral code ${referralCode} for ₹100 off your first order! Shop now: https://vraeco.in?ref=${referralCode}`
  );


  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setShowConfetti(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowConfetti(false), 3000);
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VRAECO - Shop Smart Deals',
        text: `Use my referral code ${referralCode} for ₹100 off!`,
        url: `https://vraeco.in?ref=${referralCode}`,
      });
    } else {
      handleCopy();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setShowConfetti(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-main/70 backdrop-blur-sm z-[500]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-surface border border-gold/20 rounded-2xl p-8 z-[501] glass-card shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-raised border border-edge rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-colors border-none cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {showConfetti && (
              <Confetti />
            )}

            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Gift className="w-8 h-8 text-void" />
              </motion.div>
              <h2 className="font-serif text-[1.6rem] text-text-main mb-2">
                Refer & Earn <span className="text-gold">₹100</span>
              </h2>
              <p className="text-text-muted text-[0.85rem]">
                ₹100 off for you <span className="text-gold font-bold mx-1">AND</span> your friend!
              </p>
            </div>

            <div className="bg-raised border border-gold/20 rounded-xl p-5 mb-6">
              <div className="text-[0.65rem] uppercase tracking-[1.5px] text-text-muted mb-3 font-semibold text-center">
                Your Referral Code
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="font-display text-[1.4rem] font-black text-gold tracking-[4px]">
                  {referralCode}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all duration-200 ${
                    copied
                      ? 'bg-jade/20 border border-jade/30 text-jade'
                      : 'bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20'
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-jade text-[0.75rem] text-center mt-2 font-medium"
                >
                  Code copied to clipboard!
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShareLink}
                className="flex items-center justify-center gap-2 bg-surface border border-gold/30 text-gold py-3 rounded-lg font-display text-[0.65rem] font-bold tracking-[1.5px] uppercase hover:bg-gold/10 transition-all cursor-pointer min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                Share Link
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="flex items-center gap-1.5 text-[0.72rem] text-text-muted">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Share with friends
              </div>
              <div className="w-1 h-1 bg-edge rounded-full" />
              <div className="flex items-center gap-1.5 text-[0.72rem] text-text-muted">
                <Gift className="w-3.5 h-3.5 text-gold" />
                Both get ₹100
              </div>
              <div className="w-1 h-1 bg-edge rounded-full" />
              <div className="flex items-center gap-1.5 text-[0.72rem] text-text-muted">
                <LinkIcon className="w-3.5 h-3.5 text-gold" />
                Unlimited referrals
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#c9a84c', '#e0c06e', '#22a87a', '#d4452b', '#3d98c4'][Math.floor(Math.random() * 5)],
    size: Math.random() * 6 + 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -10, x: `${piece.x}%`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', rotate: 360, opacity: 0 }}
          transition={{ duration: 2, delay: piece.delay, ease: 'linear' }}
          className="absolute"
          style={{
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
            borderRadius: 1,
            left: 0,
          }}
        />
      ))}
    </div>
  );
}
