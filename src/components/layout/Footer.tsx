import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeMsg, setSubscribeMsg] = useState('');

  const handleSubscribe = () => {
    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      setSubscribeMsg('Please enter a valid email');
      return;
    }
    setSubscribeMsg('Thanks! You\'re in!');
    setSubscribeEmail('');
    setTimeout(() => setSubscribeMsg(''), 4000);
  };

  return (
    <footer className="bg-cream border-t border-gold/15 pt-20 px-10 pb-12 relative z-[2]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="font-display text-[0.65rem] tracking-[4px] uppercase text-gold mb-8">Shop</h4>
          <ul className="list-none space-y-4">
            <li><Link to="/shop" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">All Products</Link></li>
            <li><Link to="/category/kitchen-essentials" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Kitchen Finds</Link></li>
            <li><Link to="/category/health-wellness" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Wellness</Link></li>
            <li><Link to="/category/home-decor" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Home Decor</Link></li>
            <li><Link to="/category/personal-care" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Personal Care</Link></li>
            <li><Link to="/bundles" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Bundles</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-[0.65rem] tracking-[4px] uppercase text-gold mb-8">Help</h4>
          <ul className="list-none space-y-4">
            <li><Link to="/order-tracking" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Track Order</Link></li>
            <li><Link to="/returns-refunds" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/faq" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Contact Us</Link></li>
            <li><a href="mailto:vraeco.store@gmail.com" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Email Support</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-[0.65rem] tracking-[4px] uppercase text-gold mb-8">Legal</h4>
          <ul className="list-none space-y-4">
            <li><Link to="/privacy-policy" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link to="/shipping-policy" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Shipping Policy</Link></li>
            <li><Link to="/refund-policy" className="text-[0.85rem] text-text-dim hover:text-gold transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-display text-[0.65rem] tracking-[4px] uppercase text-gold mb-8">Stay in the Loop</h4>
          <p className="text-[0.8rem] text-text-dim mb-6 leading-relaxed">Join 12,000+ insiders for exclusive drops and secret discounts.</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              className="bg-surface border border-edge px-4 py-3 text-[0.85rem] text-text-main outline-none focus:border-gold transition-colors rounded-sm"
            />
            <button onClick={handleSubscribe} className="btn-primary w-full py-3 text-[0.6rem]">Subscribe</button>
            {subscribeMsg && (
              <div className="text-[0.7rem] text-center text-jade">{subscribeMsg}</div>
            )}
          </div>
          <div className="mt-8 flex gap-4">
            {['Instagram', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] text-text-dim hover:text-gold transition-colors uppercase tracking-[1px] font-bold">{social}</a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trust & Payment Badges */}
      <div className="max-w-[1200px] mx-auto pb-10 pt-8 border-t border-edge/50 flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-[1.5rem]">🔒</div>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-text-dim font-bold">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-[1.5rem]">🚚</div>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-text-dim font-bold">Pan-India Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-[1.5rem]">💳</div>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-text-dim font-bold">COD Available</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-[1.5rem]">🔄</div>
            <span className="text-[0.6rem] uppercase tracking-[1px] text-text-dim font-bold">Easy Returns</span>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <span className="text-[0.6rem] uppercase tracking-[1px] text-text-dim mr-2">Pay With:</span>
          {['UPI', 'Visa', 'Mastercard', 'COD', 'Razorpay'].map(pay => (
            <span key={pay} className="bg-surface/50 border border-edge/50 px-3 py-1.5 text-[0.55rem] font-bold rounded text-text-dim uppercase tracking-wider">{pay}</span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-10 border-t border-edge flex flex-col md:flex-row justify-between items-center gap-8 text-[0.7rem] text-text-dim/60">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="font-display tracking-[4px] text-gold text-[0.8rem] font-bold">VRAECO</span>
          <div className="flex gap-6">
            <span>© 2025. All rights reserved.</span>
            <span className="hidden md:inline">Made with 💛 in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
