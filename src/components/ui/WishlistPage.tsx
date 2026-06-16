import { motion } from 'motion/react';
import { Heart, ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const navigate = useNavigate();
  const [justMoved, setJustMoved] = useState<string | null>(null);

  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleMoveToCart = (product: typeof wishlistProducts[number]) => {
    toggleWishlist(product.id);
    addToCart({
      id: product.id,
      name: product.name.split(' | ')[0],
      price: product.vraecoPrice,
      image: product.images[0],
      quantity: 1,
    });
    setJustMoved(product.id);
    setTimeout(() => setJustMoved(null), 1500);
  };

  return (
    <div className="min-h-[80vh] bg-white py-16">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-gold fill-gold" />
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light text-text-main">
              My Wishlist
            </h1>
            <span className="bg-raised border border-edge text-text-muted text-[0.7rem] px-3 py-1 rounded-full font-display">
              {wishlistProducts.length}
            </span>
          </div>
          <p className="text-text-muted text-[0.9rem]">
            Saved items you love. Move them to cart before they sell out.
          </p>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-surface/30 rounded-2xl border border-edge glass-card"
          >
            <Heart className="w-16 h-16 text-gold/30 mx-auto mb-6" />
            <h3 className="font-serif text-[1.5rem] text-text-main mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-text-muted text-[0.85rem] mb-8 max-w-md mx-auto">
              Discover products you love and save them here for later. Tap the heart icon on any product to add it.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop')}
              className="bg-gold text-void px-8 py-3.5 rounded-lg font-display text-[0.7rem] font-bold tracking-[2px] uppercase hover:bg-gold-light transition-colors inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistProducts.map((product, index) => {
              const discount = Math.round((1 - product.vraecoPrice / product.originalPrice) * 100);
              const isInCart = useStore.getState().cart.some((c) => c.id === product.id);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-surface border border-edge rounded-xl overflow-hidden glass-card group hover:border-gold/30 transition-colors duration-300"
                >
                  <div
                    className="h-[180px] bg-raised relative overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-ember text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
                        {discount}% OFF
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-ember border-none cursor-pointer hover:bg-white/95 transition-colors"
                    >
                      {isInCart ? (
                        <ShoppingCart className="w-4 h-4" />
                      ) : (
                        <Heart className="w-4 h-4 fill-ember" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="font-serif text-[0.95rem] font-semibold text-text-main leading-snug mb-2 line-clamp-2">
                      {product.name.split(' | ')[0]}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-serif text-[1.2rem] text-gold font-bold">
                        ₹{product.vraecoPrice}
                      </span>
                      <span className="text-[0.75rem] text-text-dim line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleMoveToCart(product)}
                      disabled={isInCart}
                      className={`w-full py-2.5 rounded-lg font-display text-[0.65rem] font-bold tracking-[1.5px] uppercase transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                        isInCart
                          ? 'bg-jade/20 text-jade border border-jade/30 cursor-default'
                          : 'bg-gold text-void hover:bg-gold-light border-none cursor-pointer'
                      }`}
                    >
                      {justMoved === product.id ? (
                        <>Moved to Cart!</>
                      ) : isInCart ? (
                        <><ShoppingCart className="w-3.5 h-3.5" /> In Cart</>
                      ) : (
                        <><ShoppingCart className="w-3.5 h-3.5" /> Move to Cart</>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {wishlistProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/shop')}
              className="text-gold hover:underline inline-flex items-center gap-2 text-[0.85rem]"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
