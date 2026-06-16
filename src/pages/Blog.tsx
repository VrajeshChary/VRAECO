import { motion } from 'motion/react';
import { Helmet } from '../components/Helmet';
import { PenTool, Calendar, User } from 'lucide-react';

const posts = [
  { id: 1, title: '10 Kitchen Gadgets That Will Change Your Cooking Forever', date: 'Mar 28, 2026', author: 'VRAECO', category: 'Kitchen', excerpt: 'From choppers to frothers — discover the tools making Indian kitchens smarter.' },
  { id: 2, title: 'Why Self-Care Sunday Is the New Normal Among Millennials', date: 'Apr 1, 2026', author: 'VRAECO', category: 'Wellness', excerpt: 'Jade rollers, ice globes, and the skincare ritual taking over Instagram.' },
  { id: 3, title: 'How to Make Your Space Look Pinterest-Worthy on a Budget', date: 'Apr 3, 2026', author: 'VRAECO', category: 'Home Decor', excerpt: 'Crystal lamps, projectors, and 5 products that transform any corner.' },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>VRAECO Blog — Tips, Trends & Product Guides</title>
        <link rel="canonical" href="https://vraeco.com/blog" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="section-inner max-w-[900px] mx-auto">
          <h1 className="font-serif text-[2.5rem] text-center mb-3">The <em className="italic text-gold">VRAECO</em> Journal</h1>
          <p className="text-text-muted text-center mb-12 max-w-[500px] mx-auto">Product guides, trends, and lifestyle tips from the VRAECO team.</p>

          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-edge rounded-xl p-6 hover:border-gold/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3 text-[0.65rem] text-text-dim uppercase tracking-wider">
                  <span className="bg-gold/10 text-gold px-2 py-0.5 rounded">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                </div>
                <h2 className="font-serif text-[1.3rem] mb-2 group-hover:text-gold transition-colors">{post.title}</h2>
                <p className="text-[0.82rem] text-text-muted mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] text-text-dim flex items-center gap-1"><User size={12} /> {post.author}</span>
                  <span className="text-[0.72rem] text-gold font-bold">Read More →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}