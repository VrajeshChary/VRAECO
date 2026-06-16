import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterInline({ variant = 'gold' }: { variant?: 'gold' | 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className={`py-16 ${variant === 'dark' ? 'bg-deep' : 'bg-surface'}`}>
        <div className="section-inner text-center">
          <div className="text-[1.5rem] text-jade mb-2">✅ You're in!</div>
          <p className="text-text-muted">Check your inbox for a welcome surprise.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 ${variant === 'dark' ? 'bg-deep border-y border-edge' : 'bg-surface border-y border-gold/20'}`}>
      <div className="section-inner text-center max-w-[500px] mx-auto">
        <Mail size={32} className={`mx-auto mb-4 ${variant === 'dark' ? 'text-gold' : 'text-gold'}`} />
        <h3 className="font-serif text-[1.5rem] mb-2">Get 15% Off Your First Order</h3>
        <p className="text-[0.85rem] text-text-muted mb-6">Join 12,000+ VRAECO insiders for exclusive drops, secret sales, and early access.</p>
        <div className="flex gap-2 max-w-[400px] mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={`flex-1 bg-raised border rounded-lg px-4 py-3 text-[0.85rem] text-text-main outline-none focus:border-gold transition-colors`}
          />
          <button
            onClick={() => email.includes('@') && setSubmitted(true)}
            className="bg-gold text-void px-6 rounded-lg font-bold text-[0.8rem] border-none cursor-pointer hover:bg-gold-light whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}