import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Instagram } from 'lucide-react';

const posts = [
  { product: products[0], img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', caption: 'Game changer in the kitchen! 🔥' },
  { product: products[7], img: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&q=80', caption: 'Self-care Sunday essentials ✨' },
  { product: products[12], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', caption: 'Best purchase this month 💪' },
  { product: products[15], img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80', caption: 'My room looks so cozy now 🌊' },
  { product: products[3], img: 'https://images.unsplash.com/photo-1556910103-1c02745a8724?w=400&q=80', caption: 'Quick meal prep hack! 🧅' },
  { product: products[18], img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', caption: 'Glass skin is real now ✨' },
];

export default function SocialFeed() {
  return (
    <section className="py-20 relative z-[2] overflow-hidden bg-deep">
      <div className="section-inner">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
            Community Love
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title">
            As Seen On <em className="italic text-gold">Instagram</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="section-sub">
            Real customers sharing their real results. Tag @vraeco to be featured!
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300 ${i % 3 === 0 ? 'md:row-span-2' : ''}`}
            >
              <Link to={`/product/${post.product.id}`}>
                <div className={`${i % 3 === 0 ? 'h-[240px] md:h-[400px]' : 'h-[200px] md:h-[240px]'}`}>
                  <img src={post.img} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-main/70 via-text-main/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Instagram size={14} className="text-gold" />
                      <span className="text-[0.65rem] text-gold font-bold tracking-wider">@vraeco</span>
                    </div>
                    <p className="text-[0.82rem] text-text-main font-medium mb-1">{post.caption}</p>
                    <p className="text-[0.7rem] text-text-dim">Shop: {post.product.name.split(' | ')[0]} →</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com/vraeco"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Instagram size={18} /> Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
