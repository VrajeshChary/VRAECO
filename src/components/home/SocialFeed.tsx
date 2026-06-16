import { motion } from 'motion/react';
import { ExternalLink, Camera, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';

const feedItems = [
  {
    id: 1,
    productId: products[0].id,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop',
    caption: 'Kitchen game changer.',
    likes: 1243,
    span: 'row-span-2',
  },
  {
    id: 2,
    productId: products[1].id,
    image: 'https://images.unsplash.com/photo-1556909172-c3e2e89e5c66?w=400&h=250&fit=crop',
    caption: 'Prep like a pro.',
    likes: 892,
    span: '',
  },
  {
    id: 3,
    productId: products[2].id,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop',
    caption: 'Must-have combo.',
    likes: 1567,
    span: '',
  },
  {
    id: 4,
    productId: products[5].id,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=250&fit=crop',
    caption: 'Self-care essentials.',
    likes: 2103,
    span: '',
  },
  {
    id: 5,
    productId: products[8].id,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop',
    caption: 'Home upgrade goals.',
    likes: 1789,
    span: 'row-span-2',
  },
  {
    id: 6,
    productId: products[11].id,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop',
    caption: 'Everyday luxury.',
    likes: 3201,
    span: '',
  },
];

export default function SocialFeed() {
  const navigate = useNavigate();

  return (
    <section className="relative z-[2] py-20 bg-surface/30" id="social">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-label flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            Instagram
          </div>
          <h2 className="section-title text-center">
            As Seen On <em>Instagram</em>
          </h2>
          <p className="section-sub mx-auto text-center">
            Real customers, real results. Tag us @{process.env.REACT_APP_INSTAGRAM_HANDLE || '@vraeco.in'} to get featured.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px]">
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`${item.span} relative group cursor-pointer overflow-hidden rounded-xl border border-edge bg-raised glass-card`}
              onClick={() => navigate(`/product/${item.productId}`)}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-main/70 via-text-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-text-main text-[0.8rem] mb-1.5">
                  <Heart className="w-3.5 h-3.5 text-ember fill-ember" />
                  <span>{item.likes.toLocaleString()}</span>
                </div>
                <p className="text-[0.78rem] text-text-muted">{item.caption}</p>
                <div className="flex items-center gap-1 mt-2 text-gold text-[0.7rem] font-semibold">
                  <ExternalLink className="w-3 h-3" />
                  View Product
                </div>
              </div>
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gold/90 text-void text-[0.55rem] font-bold tracking-[1px] px-2 py-0.5 rounded-full uppercase font-display">
                  Product
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/vraeco.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface border border-gold/30 text-gold px-8 py-3 rounded-full inline-flex items-center gap-2 font-display text-[0.7rem] tracking-[2px] uppercase hover:bg-gold hover:text-void transition-all duration-300 glass-card"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow @vraeco.in
          </a>
        </motion.div>
      </div>
    </section>
  );
}
