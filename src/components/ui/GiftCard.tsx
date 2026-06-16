import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, Check } from 'lucide-react';

export default function GiftCard() {
  const [amount, setAmount] = useState(500);
  const [recipient, setRecipient] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = `GIFT-${amount}-${Date.now().toString().slice(-6)}`;

  return (
    <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="max-w-[600px] mx-auto px-4">
        <h1 className="font-serif text-[2.5rem] text-center mb-8">Gift <em className="italic text-gold">Cards</em></h1>

        {!generated ? (
          <div className="bg-surface border border-edge rounded-2xl p-8">
            <div className="text-[0.7rem] text-text-dim uppercase tracking-wider mb-3">Choose Amount</div>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[299, 499, 999, 1999].map((amt) => (
                <button key={amt} onClick={() => setAmount(amt)}
                  className={`py-3 rounded-xl font-bold text-[0.9rem] border transition-all ${amount === amt ? 'bg-gold/10 border-gold text-gold' : 'border-edge bg-raised text-text-muted hover:border-gold/50'}`}>
                  ₹{amt}
                </button>
              ))}
            </div>

            <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient email (optional)"
              className="w-full bg-raised border border-edge rounded-lg px-4 py-3 text-[0.85rem] text-text-main outline-none focus:border-gold mb-4" />

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setGenerated(true)}
              className="w-full bg-gold text-void py-3 rounded-xl font-bold text-[0.8rem] border-none cursor-pointer flex items-center justify-center gap-2">
              <Gift size={18} /> Generate Gift Card
            </motion.button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-8 text-center">
            <Gift size={48} className="text-gold mx-auto mb-4" />
            <h2 className="font-serif text-[2rem] mb-2">₹{amount} Gift Card</h2>
            <p className="text-[0.85rem] text-text-muted mb-4">Share this code with your friend!</p>

            <div className="bg-raised border border-gold/30 rounded-xl px-6 py-4 mb-4 inline-flex items-center gap-3">
              <span className="font-display text-[1.3rem] text-gold font-black">{code}</span>
              <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="bg-gold/10 text-gold px-2 py-1 rounded border-none cursor-pointer text-[0.7rem]">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}