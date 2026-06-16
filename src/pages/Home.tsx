import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from '../components/Helmet';
import { useRecentlyViewed } from '../utils/recentlyViewed';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import TrendingProducts from '../components/home/TrendingProducts';
import MysteryDiscount from '../components/home/MysteryDiscount';
import Bundles from '../components/home/Bundles';
import Reviews from '../components/home/Reviews';
import SocialFeed from '../components/ui/SocialFeed';
import PressMentions from '../components/ui/PressMentions';
import NewsletterInline from '../components/home/NewsletterInline';

export default function Home() {
  const { hash } = useLocation();
  const recentlyViewed = useRecentlyViewed();

  useEffect(() => {
    if (hash && window.location.pathname === '/') {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>Make Daily Tasks 10x Faster With Viral Tools | VRAECO India</title>
        <meta name="description" content="Shop India's trending viral products — kitchen gadgets, wellness essentials, decor. Flash sale live. 3,200+ orders. Trusted by 10,000+ customers. Free shipping, COD available." />
        <meta name="keywords" content="viral products india, trending kitchen gadgets, home essentials, best price online india, cash on delivery" />
        <meta property="og:title" content="VRAECO — India's #1 Viral Home Essentials Store" />
        <meta property="og:description" content="Shop trending viral products at unbeatable prices. Free shipping, COD. Trusted by 10,000+ customers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vraeco.com" />
        <link rel="canonical" href="https://vraeco.com" />
      </Helmet>
      <main>
      <Hero />

      {/* Feature 1: TrustBar + TrustBadges — dual trust layers */}
      <TrustBar />

      <div className="h-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-gold-soft/10 to-void"></div>
      </div>

      {/* Feature 2: Trending Products with urgency badges */}
      <TrendingProducts />

      {/* Feature 3: Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-16 bg-cream relative z-[2]">
          <div className="section-inner">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="section-label">Personalized For You</div>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light">
                  Recently <em className="italic text-sky">Viewed</em>
                </h2>
              </div>
              <Link to="/shop" className="text-[0.65rem] uppercase tracking-[2px] text-sky hover:text-gold transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recentlyViewed.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group bg-surface border border-edge rounded-xl p-4 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="aspect-square flex items-center justify-center mb-3 bg-raised rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="text-[0.82rem] font-medium mb-1 group-hover:text-gold transition-colors line-clamp-2">
                    {item.name.split(' | ')[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-gold">₹{item.vraecoPrice}</span>
                    <span className="text-[0.65rem] text-text-dim line-through">₹{item.originalPrice}</span>
                  </div>
                  <div className="mt-1 text-[0.6rem] text-jade font-medium">
                    {Math.round((1 - item.vraecoPrice / item.originalPrice) * 100)}% OFF
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="h-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-gold-soft/20 to-cream opacity-70"></div>
      </div>

      {/* Feature 4: Mystery Discount (Spin Wheel) */}
      <MysteryDiscount />

      <div className="h-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-gold-soft/15 to-surface"></div>
      </div>

      {/* Feature 5: Bundles */}
      <Bundles />

      {/* Feature 6: Why VRAECO */}
      <section className="py-20 bg-deep relative z-[2]">
        <div className="section-inner">
          <div className="text-center mb-12">
            <div className="section-label">Why VRAECO</div>
            <h2 className="section-title">Why <em className="italic text-gold">10,000+</em> Customers Trust Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Quality Verified', desc: 'Every product is personally tested by our team before we list it. No duds, no disappointments.' },
              { icon: '💰', title: 'Best Price Guarantee', desc: 'We price-match Amazon & Flipkart. If you find it cheaper elsewhere, we will match it and give an extra 5% off.' },
              { icon: '🤝', title: '7-Day No Questions Return', desc: 'Changed your mind? Just return within 7 days for a full refund. No forms, no hassle.' },
              { icon: '📦', title: 'Fast Pan-India Shipping', desc: '3-5 day delivery across India. Metro cities get orders in 2-3 days. Free shipping always.' },
              { icon: '🛡️', title: 'Secure Payments', desc: 'Razorpay encrypted. UPI, Cards, Wallets, Net Banking, and COD. Your data is safe.' },
              { icon: '💬', title: 'Human Support', desc: 'Real people, not bots. Email us and get a response within 4 hours. We care.' },
            ].map((item, i) => (
              <div key={i} className="bg-surface border border-edge rounded-2xl p-6 hover:border-gold/20 transition-all group">
                <div className="text-[2.5rem] mb-3">{item.icon}</div>
                <h3 className="font-serif text-[1.1rem] mb-2 text-text-main group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-[0.78rem] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 7: As Featured In (Press Mentions) */}
      <PressMentions />

      <div className="h-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-gold-soft/15 to-surface"></div>
      </div>

      {/* Feature 8: Customer Reviews */}
      <Reviews />

      {/* Feature 9: Instagram Social Feed */}
      <SocialFeed />

      {/* Feature 10: Newsletter Inline */}
      <NewsletterInline />

      {/* Feature 11: Quick Links Bar */}
      <section className="py-12 bg-deep border-t border-edge/50 relative z-[2]">
        <div className="section-inner text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap text-[0.78rem]">
            <Link to="/rewards" className="text-text-dim hover:text-gold transition-colors">🎁 Rewards Program</Link>
            <span className="text-edge">|</span>
            <a href="/blog" className="text-text-dim hover:text-gold transition-colors">📝 Blog</a>
            <span className="text-edge">|</span>
            <a href="/refer" className="text-text-dim hover:text-gold transition-colors">🤝 Refer a Friend</a>
            <span className="text-edge">|</span>
            <a href="/affiliate" className="text-text-dim hover:text-gold transition-colors">💼 Affiliate Program</a>
            <span className="text-edge">|</span>
            <a href="/gift-card" className="text-text-dim hover:text-gold transition-colors">🎴 Gift Cards</a>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}