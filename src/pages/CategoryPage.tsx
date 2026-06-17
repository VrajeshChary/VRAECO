import { Helmet } from '../components/Helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, Grid, List } from 'lucide-react';
import { Category, categoryLabels, products, getStockMessage } from '../data/products';
import { useStore } from '../store/useStore';

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const validCategories = Object.keys(categoryLabels);
  const isValidCategory = validCategories.includes(category || '');
  if (!isValidCategory && category) {
    navigate('/shop');
    return null;
  }
  const displayName = categoryLabels[category as Category];

  const [sort, setSort] = useState('popular');
  const [showSort, setShowSort] = useState(false);

  const categoryProducts = products.filter(p => p.category === category);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.vraecoPrice - b.vraecoPrice;
    if (sort === 'price-desc') return b.vraecoPrice - a.vraecoPrice;
    if (sort === 'newest') return products.indexOf(b) - products.indexOf(a);
    // popular: sort by reviews desc
    return b.reviews - a.reviews;
  });

  return (
    <>
      <Helmet>
        <title>{displayName} | VRAECO — Best Prices, Free Shipping & COD</title>
        <meta name="description" content={`Shop ${displayName.toLowerCase()} at VRAECO. Hand-picked viral products at unbeatable prices. Free shipping, cash on delivery, 7-day returns.`} />
        <link rel="canonical" href={`https://vreco.vercel.app/category/${category}`} />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="section-label">Category</div>
            <h1 className="font-serif text-[3rem] md:text-[3.5rem] mb-4 text-gold">{displayName}</h1>
            <p className="text-text-muted max-w-[600px] mx-auto">Hand-picked viral products for your {category} needs. Quality tested and trend approved.</p>
          </motion.div>

          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-8 border-b border-edge pb-4">
            <span className="text-[0.8rem] text-text-dim">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            </span>

            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 bg-raised border border-edge rounded-lg px-4 py-2 text-[0.75rem] text-text-main hover:border-gold transition-colors"
              >
                <Grid size={14} className="text-gold" />
                {sort === 'price-asc' && 'Price: Low to High'}
                {sort === 'price-desc' && 'Price: High to Low'}
                {sort === 'newest' && 'Newest First'}
                {sort === 'popular' && 'Most Popular'}
                <ChevronDown size={14} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>

              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-surface border border-edge rounded-xl shadow-2xl overflow-hidden z-10"
                >
                  {[
                    { value: 'popular', label: 'Most Popular' },
                    { value: 'newest', label: 'Newest First' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[0.75rem] border-b border-edge last:border-none cursor-pointer transition-colors ${sort === opt.value ? 'bg-gold/10 text-gold font-medium' : 'text-text-muted hover:bg-raised'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-muted text-[1.1rem]">No products in this category yet.</p>
              <button
                onClick={() => navigate('/shop')}
                className="mt-4 text-gold hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-surface border border-edge overflow-hidden relative transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/20 hover:shadow-[0_0_40px_rgba(201,169,110,0.15)] cursor-pointer group"
                >
                  {product.badge === 'hot' && (
                    <div className="absolute top-3 left-3 bg-ember text-white text-[0.58rem] font-bold tracking-[1.5px] px-2.5 py-1 z-[2]">
                      🔥 TRENDING
                    </div>
                  )}
                  {product.badge === 'new' && (
                    <div className="absolute top-3 left-3 bg-gold text-void text-[0.58rem] font-bold tracking-[1.5px] px-2.5 py-1 z-[2]">
                      ✦ NEW
                    </div>
                  )}
                  {product.badge === 'bestseller' && (
                    <div className="absolute top-3 left-3 bg-gold text-void text-[0.58rem] font-bold tracking-[1.5px] px-2.5 py-1 z-[2]">
                      ★ BESTSELLER
                    </div>
                  )}
                  {product.badge === 'trending' && (
                    <div className="absolute top-3 left-3 bg-ember text-white text-[0.58rem] font-bold tracking-[1.5px] px-2.5 py-1 z-[2]">
                      🔥 HOT SELLING
                    </div>
                  )}

                  <div className="h-[200px] bg-raised flex items-center justify-center relative overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500" loading={index < 3 ? "eager" : "lazy"} decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent to-40% pointer-events-none"></div>
                  </div>

                  <div className="p-5">
                    <div className="text-[0.62rem] tracking-[2px] uppercase text-gold mb-1.5">{categoryLabels[product.category]}</div>
                    <div className="font-serif text-[1.1rem] font-semibold leading-[1.25] mb-1.5 text-text-main">{product.name}</div>
                    <div className="text-[0.78rem] text-text-muted mb-3 leading-[1.55]">{product.hookLine}</div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-gold text-[0.75rem] tracking-[1px]">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</span>
                      <span className="text-[0.68rem] text-text-dim">{product.reviews.toLocaleString()} reviews</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-[1.4rem] text-gold font-bold">₹{product.vraecoPrice}</span>
                          <span className="text-[0.78rem] text-text-dim line-through">₹{product.originalPrice}</span>
                        </div>
                        <div className="text-[0.6rem] text-jade font-bold uppercase tracking-[0.5px] mt-0.5">
                          You Save ₹{product.originalPrice - product.vraecoPrice}
                        </div>
                      </div>
                      <div className="bg-ember/10 text-ember text-[0.6rem] font-bold px-2 py-1 rounded border border-ember/20">
                        {Math.round((1 - product.vraecoPrice / product.originalPrice) * 100)}% OFF
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-edge flex items-center justify-between gap-4">
                      <div className="text-[0.68rem] text-text-dim flex items-center gap-1.5 shrink-0">
                        <span className="animate-pulse">{product.stockCount <= 10 ? '⚡' : '🔥'}</span>
                        <span className="font-medium">{getStockMessage(product.stockCount, product.soldThisWeek)}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-end">
                        {cart.find(item => item.id === product.id) ? (
                          <div className="flex items-center gap-3 bg-raised border border-gold/30 rounded-lg px-2 py-1 flex-1 justify-between h-[42px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const item = cart.find(i => i.id === product.id);
                                if (item && item.quantity > 1) {
                                  updateQuantity(product.id, undefined, item.quantity - 1);
                                } else {
                                  removeFromCart(product.id);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-lg border-none bg-transparent cursor-pointer"
                            >
                              −
                            </button>
                            <span className="font-display text-[0.9rem] font-black text-gold">{cart.find(i => i.id === product.id)?.quantity}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const item = cart.find(i => i.id === product.id);
                                if (item) {
                                  updateQuantity(product.id, undefined, item.quantity + 1);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-lg border-none bg-transparent cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#d4b47a' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                name: product.name.split(' | ')[0],
                                price: product.vraecoPrice,
                                image: product.images[0],
                                quantity: 1
                              });
                            }}
                            className="bg-gold text-void border-none px-5 py-3 font-display text-[0.65rem] font-black tracking-[2px] uppercase cursor-pointer transition-all rounded-lg shadow-xl shadow-gold/10 flex-1 min-h-[44px]"
                          >
                            Add to Cart
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
