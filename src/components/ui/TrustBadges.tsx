import { Shield, Truck, CreditCard, RotateCcw, CheckCircle, Star } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Secure Payment', sub: '256-bit SSL encryption' },
  { icon: Truck, label: 'Free Shipping', sub: 'Pan-India delivery' },
  { icon: CreditCard, label: 'COD Available', sub: 'Pay on delivery' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '7-day hassle-free' },
  { icon: CheckCircle, label: 'Quality Verified', sub: 'Every product tested' },
  { icon: Star, label: '4.8/5 Rating', sub: '3,200+ reviews' },
];

export default function TrustBadges() {
  return (
    <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-y border-gold/20 py-3">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-center gap-6 md:gap-10 flex-wrap">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div key={i} className="flex items-center gap-2 group">
              <Icon size={16} className="text-gold group-hover:scale-110 transition-transform" />
              <div className="text-[0.6rem] text-text-muted">
                <span className="text-text-main font-bold block leading-none">{badge.label}</span>
                <span className="text-text-dim">{badge.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
