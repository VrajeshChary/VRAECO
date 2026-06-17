import { useState } from 'react';
import { motion } from 'motion/react';

const tiers = [
  { name: 'Bronze', minSpend: 0, icon: '🥉', color: '#cd7f32', perks: ['Earn points on every order'] },
  { name: 'Silver', minSpend: 2000, icon: '🥈', color: '#c0c0c0', perks: ['Earn points', 'Early access to sales', 'Birthday bonus'] },
  { name: 'Gold', minSpend: 5000, icon: '🥇', color: '#c9a84c', perks: ['2x points', 'Free shipping forever', 'Priority support'] },
  { name: 'Diamond', minSpend: 15000, icon: '💎', color: '#b9f2ff', perks: ['3x points', 'VIP-only products', 'Personal shopping assistant'] },
];

export default function LoyaltyPage() {
  const [spent, setSpent] = useState(0);
  const currentTier = [...tiers].reverse().find(t => spent >= t.minSpend) || tiers[0];
  const nextTier = tiers.find(t => t.minSpend > spent);
  const progress = nextTier
    ? ((spent - currentTier.minSpend) / (nextTier.minSpend - currentTier.minSpend)) * 100
    : 100;

  return (
    <main className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="font-serif text-[2.5rem] text-center mb-8">VRAECO <em className="italic text-gold">Rewards</em></h1>

        {/* Current Tier Card */}
        <div className="bg-surface border border-gold/20 rounded-2xl p-8 mb-12 text-center">
          <div className="text-[3rem] mb-2">{currentTier.icon}</div>
          <h2 className="font-serif text-[1.8rem] mb-1" style={{ color: currentTier.color }}>{currentTier.name} Member</h2>
          <p className="text-[0.85rem] text-text-muted mb-4">You've earned ₹{spent} towards rewards</p>
          {nextTier && (
            <div className="mb-4">
              <div className="flex justify-between text-[0.7rem] text-text-dim mb-1">
                <span>₹{currentTier.minSpend}</span>
                <span>₹{nextTier.minSpend} — {nextTier.name}</span>
              </div>
              <div className="h-2 bg-edge rounded-full overflow-hidden">
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: nextTier.color }} className="rounded-full" />
              </div>
              <p className="text-[0.72rem] text-text-muted mt-2">
                Spend ₹{nextTier.minSpend - spent} more to reach {nextTier.name}
              </p>
            </div>
          )}
        </div>

        {/* All Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-surface border rounded-xl p-6 ${tier.name === currentTier.name ? 'border-gold/30 shadow-[0_0_20px_rgba(201,169,76,0.15)]' : 'border-edge'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[2rem]">{tier.icon}</span>
                <div>
                  <h3 className="font-bold text-[1.1rem]" style={{ color: tier.color }}>{tier.name}</h3>
                  <p className="text-[0.7rem] text-text-dim">From ₹{tier.minSpend} spent</p>
                </div>
              </div>
              <ul className="space-y-1">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="text-[0.78rem] text-text-muted flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span> {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 text-center">
          <h3 className="font-serif text-[1.2rem] mb-2">How to Earn Points</h3>
          <p className="text-[0.82rem] text-text-muted">₹1 spent = 1 point. 100 points = ₹10 reward. Write a review = 50 bonus points. Refer a friend = 100 bonus points.</p>
        </div>
      </div>
    </main>
  );
}
