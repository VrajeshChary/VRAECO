import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { products, Product, Category, categoryLabels, getStockMessage } from '../../data/products';

export default function TrendingProducts({ hideHeader = false, categoryFilter }: { hideHeader?: boolean; categoryFilter?: Category | 'all' }) {
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'all' || !categoryFilter || product.category === categoryFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                          product.hookLine.toLowerCase().includes(searchQuery) ||
                          categoryLabels[product.category].toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`relative z-[2] ${hideHeader ? 'py-0' : 'py-20'}`} id="products">
      <div className="section-inner">
        {!hideHeader && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              Curated Finds
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Trending Right <em>Now</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-sub"
            >
              Products going viral on Instagram Reels. High-demand. Limited-quantity. Move fast.
            </motion.p>
          </>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-[1.1rem]">No products found matching your search.</p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 text-gold hover:underline"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${hideHeader ? 'mt-0' : 'mt-12'}`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % 3) }}
                className="bg-surface border border-edge glass-card overflow-hidden relative transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(201,169,110,0.3)] hover:shadow-card-premium cursor-pointer group"
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
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/70 border border-edge rounded-full flex items-center justify-center text-[0.9rem] cursor-pointer z-[3] transition-colors hover:bg-ember"
                  >
                    ♡
                  </button>
                </div>

                <div className="p-5">
                  <div className="text-[0.62rem] tracking-[2px] uppercase text-gold mb-1.5">{categoryLabels[product.category]}</div>
                  <div className="font-serif text-[1.1rem] font-semibold leading-[1.25] mb-1.5 text-text-main">{product.name}</div>
                  <div className="text-[0.78rem] text-text-muted mb-3 leading-[1.55]">{product.hookLine}</div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-gold text-[0.75rem] tracking-[1px]">{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
                    <span className="text-[0.68rem] text-text-dim">{product.reviews.toLocaleString()} reviews</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[0.65rem] text-text-dim line-through">MRP ₹{product.originalPrice}</span>
                        <span className="font-serif text-[1.4rem] text-gold font-bold">₹{product.vraecoPrice}</span>
                      </div>
                      <div className="text-[0.6rem] text-jade font-bold uppercase tracking-[0.5px] mt-0.5">
                        You Save ₹{product.originalPrice - product.vraecoPrice}
                      </div>
                      <div className="text-[0.58rem] text-ember-soft uppercase tracking-wider mt-1 urgent-pulse">Deal ends soon</div>
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
                                updateQuantity(product.id, undefined, Math.min(item.quantity + 1, 10));
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
                          Get This Deal Now
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
    </section>
  );
}
