import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Helmet } from '../components/Helmet';
import { Link } from 'react-router-dom';
import { Gift, Copy, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReferFriendPage() {
  const { sessionId } = useStore((state) => state);
  const referralCode = sessionId ? `VRA-${sessionId.slice(0, 8).toUpperCase()}` : 'VRA-FRIEND2024';
  const [copied, setCopied] = useState(false);
  const referralLink = `https://vraeco.com?ref=${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.5 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `Hey! Check out VRAECO - amazing viral products at great prices! Use my code ${referralCode} for ₹100 OFF your first order.\n\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    confetti({ particleCount: 40, spread: 40, origin: { y: 0.5 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Refer a Friend | VRAECO — Get ₹100 OFF When You Share</title>
        <meta name="description" content="Share VRAECO with friends. They get ₹100 off, you get ₹100 off. Win-win." />
        <link rel="canonical" href="https://vraeco.com/refer" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="max-w-[600px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-edge rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <Gift size={48} className="text-gold mx-auto mb-4" />
            <h1 className="font-serif text-[2.5rem] leading-tight mb-3">Refer & Earn</h1>
            <p className="text-text-muted text-[1rem] mb-8">Give ₹100. Get ₹100. Simple as that.</p>

            <div className="mb-6">
              <div className="text-[0.7rem] text-text-dim uppercase tracking-wider mb-2">Your Referral Code</div>
              <div className="bg-raised border-2 border-gold/30 rounded-xl px-6 py-4 mb-3">
                <span className="font-display text-[1.8rem] text-gold font-black tracking-[3px]">{referralCode}</span>
              </div>
              <button
                onClick={copyCode}
                className={`border-none cursor-pointer flex items-center gap-2 mx-auto py-2 px-5 rounded-lg transition-all ${
                  copied ? 'bg-jade/20 text-jade' : 'bg-gold/10 text-gold hover:bg-gold/20'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="space-y-3 mb-8">
              <button
                onClick={shareViaLink}
                className="w-full bg-gold/10 text-gold py-3 rounded-xl font-bold text-[0.8rem] border border-gold/20 cursor-pointer flex items-center justify-center gap-2 hover:bg-gold/20"
              >
                <Share2 size={16} /> Share Link
              </button>
            </div>

            <div className="text-[0.75rem] text-text-dim">
              Your friend gets <strong className="text-jade">₹100 OFF</strong>. You get <strong className="text-jade">₹100 reward</strong>. No limits.
            </div>
          </motion.div>

          <div className="text-center mt-6">
            <Link to="/shop" className="text-gold hover:underline text-[0.85rem]">Continue Shopping →</Link>
          </div>
        </div>
      </main>
    </>
  );
}
