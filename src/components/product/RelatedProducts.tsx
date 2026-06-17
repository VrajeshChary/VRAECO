import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { products, Product, categoryLabels } from '../../data/products';
import { ShoppingCart } from 'lucide-react';

export default function RelatedProducts({ productId, category }: { productId: string; category: string }) {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);

  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== productId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const frequentlyBoughtTogether = products
    .filter((p) => p.id !== productId && Math.random() > 0.6)
    .slice(0, 2);

  if (relatedProducts.length === 0 && frequentlyBoughtTogether.length === 0) return null;

  return (
    <div className="mt-12 space-y-12">
      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="section-title text-xl mb-6">
            You May Also <em className="italic text-gold">Like</em>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} addToCart={addToCart} cart={cart} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {/* Frequently Bought Together */}
      {frequentlyBoughtTogether.length > 0 && (
        <div className="bg-surface/60 border border-edge rounded-2xl p-6">
          <h3 className="font-serif text-xl mb-4">Frequently Bought Together</h3>
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            {frequentlyBoughtTogether.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex items-center gap-3 bg-surface border border-edge rounded-xl p-3 cursor-pointer hover:border-gold/30 transition-colors flex-1 min-w-[200px]"
              >
                <div className="w-14 h-14 bg-raised rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.75rem] font-medium truncate">{product.name.split(' | ')[0]}</div>
                  <div className="font-serif text-gold">&#8377;{product.vraecoPrice}</div>
                </div>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                frequentlyBoughtTogether.forEach((p) =>
                  addToCart({
                    id: p.id,
                    name: p.name.split(' | ')[0],
                    price: p.vraecoPrice,
                    image: p.images[0],
                    quantity: 1,
                  })
                );
              }}
              className="bg-gold text-void px-6 py-3 rounded-xl text-[0.65rem] font-black tracking-[1px] uppercase border-none cursor-pointer whitespace-nowrap"
            >
              Add All to Cart
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, index, addToCart, cart, navigate }: {
  product: Product;
  index: number;
  addToCart: (item: any) => void;
  cart: any[];
  navigate: (path: string) => void;
}) {
  const existingCart = cart.find((item) => item.id === product.id);
  const discount = Math.round((1 - product.vraecoPrice / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-surface border border-edge rounded-xl overflow-hidden cursor-pointer group hover:border-gold/20 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square bg-raised p-3 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-2 left-2 bg-ember/90 text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded">
          {discount}% OFF
        </div>
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="text-[0.6rem] text-gold uppercase tracking-wider mb-0.5">{categoryLabels[product.category]}</div>
        <div className="text-[0.78rem] font-medium truncate mb-1 group-hover:text-gold transition-colors">{product.name.split(' | ')[0]}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-[1.1rem] text-gold font-bold">&#8377;{product.vraecoPrice}</span>
            <span className="text-[0.6rem] text-text-dim line-through">&#8377;{product.originalPrice}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gold text-[0.65rem]">{'\u2605'.repeat(Math.min(product.rating, 5))}</span>
            <span className="text-[0.55rem] text-text-dim">({product.reviews > 999 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
