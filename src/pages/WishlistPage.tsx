import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { products } from '../data/products';
import { Helmet } from '../components/Helmet';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <Helmet>
        <title>My Wishlist | VRAECO — Save Your Favorites</title>
        <link rel="canonical" href="https://vreco.vercel.app/wishlist" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Heart size={24} className="text-ember" />
            <h1 className="font-serif text-[2.2rem]">My Wishlist</h1>
            <span className="text-text-dim text-[0.9rem]">({wishlistProducts.length} items)</span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-text-dim mx-auto mb-4" />
              <h2 className="font-serif text-[1.5rem] mb-2">Your wishlist is empty</h2>
              <p className="text-text-muted mb-6">Save products you love and they'll appear here.</p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((product, i) => {
                const discount = Math.round((1 - product.vraecoPrice / product.originalPrice) * 100);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface border border-edge rounded-xl overflow-hidden group hover:border-gold/30 transition-all"
                  >
                    <div className="relative">
                      <div
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="aspect-square bg-raised flex items-center justify-center p-3 cursor-pointer"
                      >
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-void/80 rounded-full flex items-center justify-center text-ember hover:scale-110 transition-transform border-none cursor-pointer"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                      <div className="absolute top-2 left-2 bg-ember text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded">
                        {discount}% OFF
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[0.72rem] font-medium line-clamp-2 mb-1 group-hover:text-gold transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                        {product.name.split(' | ')[0]}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-[1.1rem] text-gold font-bold">&#8377;{product.vraecoPrice}</span>
                        <span className="text-[0.6rem] text-text-dim line-through">&#8377;{product.originalPrice}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name.split(' | ')[0],
                            price: product.vraecoPrice,
                            image: product.images[0],
                            quantity: 1,
                          });
                        }}
                        className="w-full mt-3 bg-gold text-void border-none py-2 text-[0.6rem] font-black tracking-[1px] uppercase cursor-pointer rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={12} /> Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
