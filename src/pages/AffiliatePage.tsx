import { motion } from 'motion/react';
import { Helmet } from '../components/Helmet';
import { Link } from 'react-router-dom';
import { Users, Gift, TrendingUp, Check } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <>
      <Helmet>
        <title>VRAECO Affiliate Program — Earn 15% on Referrals</title>
        <link rel="canonical" href="https://vraeco.com/affiliate" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-[2.5rem] mb-3">Affiliate <em className="italic text-gold">Program</em></h1>
            <p className="text-text-muted text-[1.1rem] max-w-[500px] mx-auto">Earn 15% commission on every sale you drive. No upfront cost, no limits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Users, title: 'Share Your Link', desc: 'Get your unique affiliate link from our team.' },
              { icon: TrendingUp, title: 'Drive Sales', desc: 'Your followers shop via your link.' },
              { icon: Gift, title: 'Earn 15%', desc: 'Get 15% of every sale as commission, paid weekly.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-edge rounded-xl p-6 text-center"
              >
                <item.icon size={28} className="text-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-[0.78rem] text-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 mb-8">
            <h3 className="font-serif text-[1.2rem] mb-4">Who Can Join?</h3>
            <ul className="space-y-2">
              {['Influencers with 1K+ followers', 'YouTubers who review products', 'Instagram Reels creators', 'Bloggers & content writers', 'Anyone with an audience!'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[0.85rem]">
                  <Check size={14} className="text-jade shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <a href="mailto:vraeco.store@gmail.com?subject=Aff%20Program" className="btn-primary inline-block">Apply Now</a>
            <p className="text-[0.72rem] text-text-dim mt-4">Email us to get started — we respond within 24 hours.</p>
          </div>
        </div>
      </main>
    </>
  );
}