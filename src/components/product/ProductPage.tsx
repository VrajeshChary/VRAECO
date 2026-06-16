import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { useToastStore } from "../../store/useToastStore";
import { Helmet } from "../../components/Helmet";
import SEO from "../SEO";
import StickyAtc from "./StickyAtc";
import {
  TrendingUp,
  Star,
  Clock,
  ArrowRightLeft,
  Sparkles,
  Camera,
} from "lucide-react";
import { getProductById, getRelatedProducts, categoryLabels, getStockMessage } from "../../data/products";
import RelatedProducts from "./RelatedProducts";
import ProductSpecs from "./ProductSpecs";
import VolumePricing from "./VolumePricing";
import ProductFAQ from "./ProductFAQ";
import PriceHistoryChart from "../../components/product/PriceHistoryChart";
import ReviewPhotoGrid from "../../components/product/ReviewPhotoGrid";
import ReviewFilterBar from "../../components/product/ReviewFilterBar";
import DeliveryEstimate from "../../components/product/DeliveryEstimate";
import { Share2, Link } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [urgencySecs, setUrgencySecs] = useState(2 * 3600 + 47 * 60 + 13);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = getProductById(id || "");
  if (!product) { navigate("/shop"); return null; }

  const [activeThumb, setActiveThumb] = useState(product.images[0]);
  const galleryThumbs = product.images;

  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);

  const [stockLeft, setStockLeft] = useState(product.stockCount);
  const [userLocation, setUserLocation] = useState("Mumbai");
  const [isVideoPlaying, setIsVideoPlaying] = useState(!!product.videoUrl);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 40) + 12);
  const [recentOrders, setRecentOrders] = useState(Math.floor(Math.random() * 15) + 3);

  useEffect(() => {
    const initialDelay = Math.random() * 15000 + 15000;
    const initialTimer = setTimeout(() => {
      if (stockLeft > 4) {
        setStockLeft((s) => Math.max(4, s - 1));
      }
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockLeft((s) => {
        if (s > 8) return s - 1;
        if (s > 5 && Math.random() > 0.7) return s - 1;
        return Math.max(4, s);
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (urgencySecs <= 0) return;
    const interval = setInterval(() => {
      setUrgencySecs((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [urgencySecs]);


  const h = Math.floor(urgencySecs / 3600);
  const m = Math.floor((urgencySecs % 3600) / 60);
  const s = urgencySecs % 60;
  const timeString = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const changeQty = (delta: number) => {
    setQty((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 10) return 10;
      return next;
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name.split(" | ")[0],
      price: product.vraecoPrice,
      image: activeThumb,
      quantity: qty,
    });
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id: product.id,
      name: product.name.split(" | ")[0],
      price: product.vraecoPrice,
      image: activeThumb,
      quantity: qty,
    });
    navigate("/checkout");
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <SEO
        title={`Buy ${product.name} India — Best Price ₹${product.vraecoPrice}`}
        description={`${product.name} online at VRAECO. Was ₹${product.originalPrice}, Now ₹${product.vraecoPrice}. ${product.hookLine} Best price in India. Free shipping, COD available. ${product.rating}★ rating from ${product.reviews.toLocaleString()}+ reviews.`}
        keywords={`buy ${product.name.toLowerCase()} india, ${product.name.toLowerCase()} online, ${product.name.toLowerCase()} best price, ${product.name.toLowerCase().split(' ')[0]} ${product.category.replace(/-/g, ' ')} india`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name.split(" | ")[0],
          image: product.images[0],
          description: product.description,
          brand: { "@type": "Brand", name: "VRAECO" },
          offers: {
            "@type": "Offer",
            price: product.vraecoPrice,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.toString(),
            reviewCount: product.reviews.toString(),
          },
        }}
        faq={product.faq}
      />
      <section
        className="py-20 bg-surface relative z-[2] pt-32"
        id="productpage"
      >
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-text-main/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 text-white text-[2rem] cursor-pointer hover:text-gold transition-colors"
              >
                ✕
              </button>
              {activeThumb.endsWith('.svg') || activeThumb.startsWith('/') || activeThumb.startsWith('http') ? (
                <img src={activeThumb} alt={product.name} className="w-[300px] md:w-[500px] object-contain select-none rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]" />
              ) : (
                <div className="text-[15rem] drop-shadow-[0_0_40px_rgba(201,169,110,0.4)] select-none">
                  {activeThumb}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-8"
          >
            Featured Product
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:sticky md:top-[100px]"
            >
              <div
                className="h-[300px] sm:h-[400px] md:h-[460px] mb-3 relative overflow-hidden group cursor-crosshair rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Gradient hero background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-cream"></div>
                <div className="absolute inset-0 opacity-30" style={{
                  background: `radial-gradient(circle at 30% 40%, rgba(184,144,42,0.15) 0%, transparent 50%),
                               radial-gradient(circle at 70% 60%, rgba(184,144,42,0.08) 0%, transparent 40%)`
                }}></div>

                {isVideoPlaying && product.videoUrl ? (
                  <video
                    src={product.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 select-none"
                    loading="eager"
                    decoding="async"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsZoomed(true);
                      }
                    }}
                  />
                )}

                {/* Product badge on image */}
                <div className="absolute top-4 left-4 bg-text-main/60 backdrop-blur-sm text-gold text-[0.6rem] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full border border-gold/20">
                  {product.badge === 'hot' ? '🔥 TRENDING' : product.badge === 'new' ? '✦ NEW' : product.badge === 'bestseller' ? '★ BESTSELLER' : '🔥 HOT SELLING'}
                </div>

                {/* Video button - only show when video available */}
                {product.videoUrl && !isVideoPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoPlaying(true);
                    }}
                    className="absolute bottom-4 right-4 bg-gold text-void px-3 py-1.5 rounded-full text-[0.6rem] font-bold uppercase tracking-[1px] shadow-lg z-[10] flex items-center gap-1.5"
                  >
                    <Camera size={12} /> Watch Demo
                  </motion.button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumb(thumb)}
                    className={`w-[70px] h-[70px] bg-raised border p-1.5 flex-shrink-0 cursor-pointer transition-all rounded-lg overflow-hidden ${activeThumb === thumb ? "border-gold" : "border-edge hover:border-gold/50"}`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pt-2"
            >
              <div className="text-[0.68rem] text-text-dim tracking-[1px] mb-4">
                {categoryLabels[product.category]}{" "}
                <span className="text-gold">/ {product.name.split(" | ")[0]}</span>
              </div>
              <h1 className="font-serif text-[2.2rem] font-light leading-[1.15] mb-2">
                {product.name.split(" | ")[0]}
              </h1>
              <div className="text-[0.88rem] text-text-muted mb-4">
                {product.hookLine}
              </div>

              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-edge flex-wrap">
                <span className="font-serif text-[1.2rem] text-gold font-semibold">
                  {product.rating}
                </span>
                <span className="text-gold text-[0.9rem]">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</span>
                <span className="text-[0.75rem] text-text-dim underline underline-offset-4 cursor-pointer">
                  {product.reviews.toLocaleString()} verified reviews
                </span>
                <span className="text-[0.72rem] text-text-muted pl-4 border-l border-edge">
                  {product.soldThisWeek.toLocaleString()} sold this week
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-[0.75rem] text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-jade animate-pulse"></span>
                  <strong>{viewers} people</strong>{" "}
                  are viewing this product right now
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] text-text-muted">
                  <span className="text-[1rem]">🔥</span>
                  <strong>
                    {recentOrders} orders
                  </strong>{" "}
                  placed in the last hour
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[0.85rem] text-text-dim line-through">
                    MRP ₹{product.originalPrice}
                  </span>
                  <span className="font-serif text-[2.5rem] text-gold font-semibold leading-none">
                    ₹{product.vraecoPrice}
                  </span>
                  <span className="bg-ember text-white text-[0.7rem] font-bold px-2.5 py-1 tracking-[1px]">
                    {Math.round(((product.originalPrice - product.vraecoPrice) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div className="text-[0.7rem] text-jade font-bold">You save ₹{product.originalPrice - product.vraecoPrice}</div>
                <div className="text-[0.65rem] text-ember-soft uppercase tracking-wider mt-1 urgent-pulse">Deal ends soon — price may increase anytime</div>

                {/* Market Price Comparison */}
                <div className="bg-raised border border-edge p-4 rounded-xl mb-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[0.6rem] font-bold px-2 py-1 uppercase tracking-[1px] rounded-bl-lg">
                    Price Comparison
                  </div>
                  <div className="text-[0.75rem] text-text-dim mb-3">
                    Market Price Comparison:
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-white rounded flex items-center justify-center text-[0.6rem] font-bold text-[#FF9900] border border-edge shadow-sm">
                          a
                        </span>
                        <span className="text-[0.8rem] text-text-muted">
                          Amazon Price
                        </span>
                      </div>
                      <span className="text-[0.85rem] text-text-muted font-medium">
                        ₹{product.amazonPriceMin} - ₹{product.amazonPriceMax}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#2874F0] rounded flex items-center justify-center text-[0.6rem] font-bold text-white border border-edge shadow-sm">
                          f
                        </span>
                        <span className="text-[0.8rem] text-text-muted">
                          Flipkart Price
                        </span>
                      </div>
                      <span className="text-[0.85rem] text-text-muted font-medium">
                        ₹{product.flipkartPriceMin} - ₹{product.flipkartPriceMax}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-edge/50">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-gold rounded flex items-center justify-center text-[0.6rem] font-bold text-void border border-gold/20 shadow-sm">
                          V
                        </span>
                        <span className="text-[0.8rem] text-gold font-bold">
                          VRAECO Price
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[0.95rem] text-gold font-bold">
                          ₹{product.vraecoPrice}
                        </span>
                        <span className="text-[0.6rem] text-jade font-bold uppercase tracking-[0.5px]">
                          Save up to ₹{product.amazonPriceMax - product.vraecoPrice}!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[0.75rem] text-jade flex items-center gap-1.5">
                  🎉 First order discount (10%) will be auto-applied at checkout
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[0.75rem] text-ember-soft flex justify-between mb-1.5">
                  <span>
                    🔥 Selling fast! Only <strong>{stockLeft} left</strong> at
                    this price
                  </span>
                  <span>{Math.round((1 - stockLeft / product.stockCount) * 100)}% claimed</span>
                </div>
                <div className="h-1.5 bg-edge rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((1 - stockLeft / product.stockCount) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-ember to-ember-soft rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Before vs After / Problem-Solution Section */}
              <div className="mb-8 bg-raised border border-edge rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-ember/5 to-jade/5 p-4 text-center">
                  <div className="text-[0.72rem] tracking-[1.5px] uppercase text-gold font-bold mb-1">
                    The {product.name.split(" | ")[0]} Difference
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-edge">
                  {/* Before - Problem */}
                  <div className="p-4 bg-ember/5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[1.3rem]">😩</span>
                      <div className="text-[0.72rem] tracking-[1px] uppercase text-ember-soft font-bold">
                        Without It
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      <li className="text-[0.78rem] text-text-dim flex items-start gap-1.5">
                        <span className="text-ember shrink-0 mt-0.5">✕</span>
                        {product.category === "kitchen-essentials"
                          ? "Struggling with dull knives, tears from onions, messy prep"
                          : product.category === "health-wellness"
                          ? "Pain, discomfort, and expensive spa visits"
                          : product.category === "home-decor"
                          ? "Boring, cluttered spaces that feel uninspired"
                          : product.category === "tech-productivity"
                          ? "Inefficient tools slowing you down daily"
                          : product.category === "personal-care"
                          ? "Using too many products with little result"
                          : "Settling for outdated, boring products"}
                      </li>
                      <li className="text-[0.78rem] text-text-dim flex items-start gap-1.5">
                        <span className="text-ember shrink-0 mt-0.5">✕</span>
                        {product.category === "kitchen-essentials"
                          ? "Spending 20+ mins on basic food prep"
                          : product.category === "health-wellness"
                          ? "Spending ₹1000s on one-time therapy sessions"
                          : "Dealing with frustration every single day"}
                      </li>
                      <li className="text-[0.78rem] text-text-dim flex items-start gap-1.5">
                        <span className="text-ember shrink-0 mt-0.5">✕</span>
                        Paying ₹500-₹1000+ on Amazon/Flipkart for similar quality
                      </li>
                    </ul>
                  </div>
                  {/* After - Solution */}
                  <div className="p-4 bg-jade/5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[1.3rem]">✨</span>
                      <div className="text-[0.72rem] tracking-[1px] uppercase text-jade font-bold">
                        With VRAECO
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      <li className="text-[0.78rem] text-text-main flex items-start gap-1.5">
                        <span className="text-jade shrink-0 mt-0.5">✓</span>
                        {product.hookLine}
                      </li>
                      <li className="text-[0.78rem] text-text-main flex items-start gap-1.5">
                        <span className="text-jade shrink-0 mt-0.5">✓</span>
                        {product.category === "kitchen-essentials"
                          ? "Cut prep time in half — 5 mins instead of 20"
                          : product.category === "health-wellness"
                          ? "Daily comfort and relief in just 10-15 minutes"
                          : product.category === "home-decor"
                          ? "Transform any space in under 5 minutes"
                          : product.category === "tech-productivity"
                          ? "Save 30+ mins daily with smarter workflow"
                          : product.category === "personal-care"
                          ? "Salon results at home in under 10 minutes"
                          : "Get premium results in half the time"}
                      </li>
                      <li className="text-[0.78rem] text-text-main flex items-start gap-1.5">
                        <span className="text-jade shrink-0 mt-0.5">✓</span>
                        Only ₹{product.vraecoPrice} with free shipping
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Features Section */}
              <div className="mb-6">
                <div className="text-[0.72rem] tracking-[1.5px] uppercase text-text-muted mb-3">
                  Key Features
                </div>
                <ul className="space-y-2">
                  {product.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.8rem] text-text-muted">
                      <span className="text-gold mt-0.5 shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[rgba(255,69,0,0.08)] border border-[rgba(255,69,0,0.2)] px-4 py-2.5 text-[0.75rem] text-ember-soft flex items-center gap-2 mb-5">
                ⏱️ Order within <strong>&nbsp;{timeString}&nbsp;</strong> for
                delivery to <strong>{userLocation}</strong> by{" "}
                <strong>Sunday</strong>
              </div>

              {/* Delivery Estimate */}
              <DeliveryEstimate />

              {/* Price History */}
              <PriceHistoryChart currentPrice={product.vraecoPrice} originalPrice={product.originalPrice} />

              {/* Volume Pricing */}
              <VolumePricing
                price={product.vraecoPrice}
                onQuantityChange={(qty) => {
                  setQty(qty);
                }}
              />

              {/* EMI Badge */}
              <div className="mb-4 flex items-center gap-2 bg-raised border border-edge rounded-xl px-4 py-3">
                <span className="text-[1rem]">💳</span>
                <span className="text-[0.75rem] text-text-muted">
                  EMI available from <strong className="text-gold">&#8377;{Math.round(product.vraecoPrice / 3)}</strong>/month
                </span>
                <span className="bg-gold/10 text-gold text-[0.55rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ml-auto">
                  No Cost EMI
                </span>
              </div>

              <div className="mb-6">
                <div className="flex gap-3 mb-3">
                  {cart.find(
                    (item) => item.id === product.id,
                  ) ? (
                    <div className="flex-1 flex items-center gap-3 bg-raised border border-gold/30 rounded-lg px-4 py-3 justify-between h-[52px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const item = cart.find(
                            (i) => i.id === product.id,
                          );
                          if (item && item.quantity > 1) {
                            updateQuantity(product.id, item.variant, item.quantity - 1);
                          } else {
                            removeFromCart(product.id, item?.variant);
                          }
                        }}
                        className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                      >
                        −
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="font-display text-[1.1rem] font-black text-gold leading-none">
                          {cart.find((i) => i.id === product.id)?.quantity}
                        </span>
                        <span className="text-[0.5rem] text-gold/60 uppercase tracking-[1px] mt-1">
                          In Cart
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const item = cart.find((i) => i.id === product.id);
                          if (item) {
                            updateQuantity(product.id, item.variant, Math.min(item.quantity + 1, 10));
                          }
                        }}
                        className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full transition-colors font-bold text-xl border-none bg-transparent cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center border border-edge overflow-hidden">
                        <button
                          onClick={() => changeQty(-1)}
                          className="w-10 h-[52px] bg-raised border-none text-text-main text-[1.1rem] cursor-pointer transition-colors hover:bg-whisper"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={qty}
                          readOnly
                          className="w-[50px] h-[52px] bg-transparent border-none border-x border-edge text-text-main text-center text-[1rem] font-sans outline-none"
                        />
                        <button
                          onClick={() => changeQty(1)}
                          className="w-10 h-[52px] bg-raised border-none text-text-main text-[1.1rem] cursor-pointer transition-colors hover:bg-whisper"
                        >
                          +
                        </button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#d4b47a" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="flex-1 bg-gold text-void border-none h-[52px] font-display text-[0.68rem] font-bold tracking-[3px] uppercase cursor-pointer transition-all hover:shadow-[0_4px_25px_rgba(201,169,110,0.4)] relative overflow-hidden group"
                      >
                        <span className="relative z-[2]">Get This Deal Now</span>
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gold/15 skew-x-12 z-[1]"
                        />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-[52px] h-[52px] bg-raised border border-edge flex items-center justify-center text-[1.2rem] cursor-pointer transition-colors ${isWishlisted ? "text-ember border-ember" : "hover:border-gold hover:text-gold"}`}
                    title="Add to Wishlist"
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </motion.button>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleBuyNow}
                    className="flex-[2] bg-gold text-void border-none h-[48px] font-display text-[0.68rem] font-bold tracking-[2px] uppercase cursor-pointer transition-all shadow-[0_4px_20px_rgba(201,169,110,0.3)] hover:bg-gold-light"
                  >
                    Buy Now — ₹{product.vraecoPrice}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      const text = `Check out this ${product.name.split(" | ")[0]} from VRAECO! ${product.hookLine}\n\n${window.location.href}`;
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(text)}`,
                        "_blank",
                      );
                    }}
                    className="flex-1 bg-[#25D366] text-white border-none h-[48px] font-display text-[0.6rem] font-bold tracking-[1px] uppercase cursor-pointer flex items-center justify-center gap-2 rounded hover:opacity-90"
                  >
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8 p-4 bg-gold/5 border border-gold/20 rounded-lg">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-[1.5rem]">
                  🛡️
                </div>
                <div>
                  <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[1px]">
                    100% Money Back Guarantee
                  </div>
                  <div className="text-[0.7rem] text-text-muted">
                    Not satisfied? Return within 7 days for a full refund.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-raised border border-edge p-3 flex items-center gap-2.5">
                  <span className="text-[1.2rem]">🔄</span>
                  <div className="text-[0.72rem] text-text-muted">
                    <strong className="block text-text-main text-[0.75rem]">
                      7-Day Returns
                    </strong>
                    Not happy? Full refund.
                  </div>
                </div>
                <div className="bg-raised border border-edge p-3 flex items-center gap-2.5">
                  <span className="text-[1.2rem]">🚚</span>
                  <div className="text-[0.72rem] text-text-muted">
                    <strong className="block text-text-main text-[0.75rem]">
                      Free Shipping
                    </strong>
                    Pan-India delivery.
                  </div>
                </div>
                <div className="bg-raised border border-edge p-3 flex items-center gap-2.5">
                  <span className="text-[1.2rem]">💰</span>
                  <div className="text-[0.72rem] text-text-muted">
                    <strong className="block text-text-main text-[0.75rem]">
                      COD Available
                    </strong>
                    Pay when delivered.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-raised border border-edge p-3 flex items-center gap-2.5">
                  <span className="text-[1.2rem]">🔒</span>
                  <div className="text-[0.72rem] text-text-muted">
                    <strong className="block text-text-main text-[0.75rem]">
                      Secure Checkout
                    </strong>
                    Razorpay encrypted.
                  </div>
                </div>
                <div className="bg-raised border border-edge p-3 flex items-center gap-2.5">
                  <span className="text-[1.2rem]">✅</span>
                  <div className="text-[0.72rem] text-text-muted">
                    <strong className="block text-text-main text-[0.75rem]">
                      Authentic Product
                    </strong>
                    Quality verified.
                  </div>
                </div>
              </div>

              <div className="text-[0.65rem] text-text-dim mb-6">SKU: {product.sku}</div>

              <hr className="border-edge/60 my-8" />

              {/* Dynamic FAQ Section */}
              <ProductFAQ productId={product.id} faqs={product.faq} />

              <hr className="border-edge/60 my-8" />

              {/* Frequently Bought Together */}
              <div className="mt-8 border border-edge p-6 bg-raised">
                <h3 className="font-serif text-[1.3rem] mb-5">
                  Frequently Bought Together
                </h3>
                {(() => {
                  const related = getRelatedProducts(product.id, 2);
                  const bundleItems = [product, ...related];
                  const bundleTotal = bundleItems.reduce((sum, p) => sum + p.vraecoPrice, 0);
                  const bundleOriginal = bundleItems.reduce((sum, p) => sum + p.originalPrice, 0);
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-5 overflow-x-auto pb-2">
                        {bundleItems.map((item, i) => (
                          <div key={i}>
                            <div className="w-[70px] h-[70px] shrink-0 bg-surface border border-edge flex items-center justify-center overflow-hidden rounded-lg p-1">
                              <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            {i < bundleItems.length - 1 && (
                              <div className="text-[1.2rem] text-text-muted shrink-0 text-center mt-1">+</div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 mb-6">
                        {bundleItems.map((item, i) => (
                          <label key={i} className="flex items-center gap-3 text-[0.85rem] cursor-pointer">
                            <input type="checkbox" checked readOnly className="accent-gold w-4 h-4" />
                            <span>
                              {i === 0 ? <strong>This item:</strong> : null} {item.name.split(" | ")[0]} -{" "}
                              <span className="text-gold">₹{item.vraecoPrice}</span>
                            </span>
                          </label>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-edge">
                        <div>
                          <div className="text-[0.75rem] text-text-muted mb-1">
                            Total Bundle Price:
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-[1.6rem] text-gold font-semibold">
                              ₹{bundleTotal}
                            </span>
                            <span className="text-[0.85rem] text-text-dim line-through">
                              ₹{bundleOriginal}
                            </span>
                          </div>
                          <div className="text-[0.75rem] text-jade font-semibold mt-0.5">
                            You save ₹{bundleOriginal - bundleTotal}!
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            bundleItems.forEach((item) => {
                              addToCart({
                                id: item.id,
                                name: item.name.split(" | ")[0],
                                price: item.vraecoPrice,
                                image: item.images[0],
                                quantity: 1,
                              });
                            });
                          }}
                          className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-void transition-colors py-3 px-6 font-display text-[0.65rem] font-bold tracking-[2px] uppercase cursor-pointer"
                        >
                          Add Bundle to Cart
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Customer Reviews Section */}
              <div className="mt-12 border-t border-edge pt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                  <div>
                    <h3 className="font-serif text-[2.2rem] mb-2">
                      Real Customer Stories
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex text-gold text-[1.2rem]">★★★★★</div>
                      <div className="text-[0.85rem] text-text-muted">
                        {product.rating}/5 based on {product.reviews.toLocaleString()} verified reviews
                      </div>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-surface bg-raised flex items-center justify-center text-[1.2rem] shadow-xl"
                      >
                        {["👨", "👩", "🧑", "👧", "👦"][i - 1]}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-surface bg-gold flex items-center justify-center text-[0.7rem] font-bold text-void shadow-xl">
                      +1k
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      author: "Anjali R.",
                      initials: "A",
                      rating: 5,
                      date: "2 days ago",
                      text: `Genuinely surprised by the quality of ${product.name.split(" | ")[0]}. Works exactly as described — ${product.keyFeatures[0]?.toLowerCase() || "very well made"}. Best purchase this year!`,
                      verified: true,
                      location: "Mumbai",
                      hasPhoto: true,
                    },
                    {
                      author: "Karan S.",
                      initials: "K",
                      rating: 5,
                      date: "1 week ago",
                      text: `${product.hookLine.split("—")[0]?.trim() || "Really lives up to the hype"}. The build quality feels premium for this price range. Fast delivery too — arrived in 3 days.`,
                      verified: true,
                      location: "Delhi",
                      hasPhoto: false,
                    },
                    {
                      author: "Megha P.",
                      initials: "M",
                      rating: 4,
                      date: "2 weeks ago",
                      text: `Good product overall. Delivery was fast. Quality matches the description. Only wish it came in more color options, but functionality is solid.`,
                      verified: true,
                      location: "Bangalore",
                      hasPhoto: false,
                    },
                    {
                      author: "Rahul V.",
                      initials: "R",
                      rating: 5,
                      date: "3 weeks ago",
                      text: `Ordered via COD, no issues at all. ${product.name.split(" | ")[0]} works great right out of the box. Already recommended to my parents.`,
                      verified: true,
                      location: "Pune",
                      hasPhoto: true,
                    },
                    {
                      author: "Priya K.",
                      initials: "P",
                      rating: 3,
                      date: "1 month ago",
                      text: `Product is decent for the price. Took a bit longer to arrive than expected. The quality is okay — nothing extraordinary but does what it says.`,
                      verified: true,
                      location: "Hyderabad",
                      hasPhoto: false,
                    },
                    {
                      author: "Arjun M.",
                      initials: "A",
                      rating: 5,
                      date: "1 month ago",
                      text: `Second time ordering from VRAECO. ${product.name.split(" | ")[0]} is even better than expected. ${product.keyFeatures[1]?.toLowerCase() || "Great addition"} is a real game changer.`,
                      verified: true,
                      location: "Chennai",
                      hasPhoto: false,
                    },
                  ].map((review, i) => (
                    <div
                      key={i}
                      className="bg-raised border border-edge p-6 rounded-2xl relative group hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold-dim/20 rounded-full flex items-center justify-center border border-edge text-[0.7rem] font-bold text-gold">
                            {review.initials}
                          </div>
                          <div>
                            <div className="text-[0.85rem] font-bold flex items-center gap-2">
                              {review.author}
                              {review.verified && (
                                <span className="flex items-center gap-1 text-[0.6rem] bg-jade/10 text-jade px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.5px]">
                                  <span className="w-1 h-1 bg-jade rounded-full animate-pulse"></span>
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="text-[0.65rem] text-text-dim flex items-center gap-2">
                              <span>{review.location} · {review.date}</span>
                              {review.hasPhoto && (
                                <span className="text-[0.55rem] bg-surface text-text-dim px-1.5 py-0.5 rounded border border-edge">📷 Photo</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-gold text-[0.75rem]">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="text-[0.85rem] text-text-muted italic leading-relaxed group-hover:text-text-main transition-colors">
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-4 border border-edge text-[0.75rem] font-bold uppercase tracking-[2px] text-text-muted hover:text-gold hover:border-gold transition-all rounded-xl hover:bg-gold/5">
                  Read All {product.reviews.toLocaleString()} Reviews
                </button>
              </div>
            </motion.div>
          </div>

          {/* Dynamic Related Products */}
          <div className="mt-24 border-t border-edge pt-16">
            <RelatedProducts productId={product.id} category={product.category} />
          </div>

          {/* Product Specifications */}
          <div className="mt-16">
            <ProductSpecs product={product} />
          </div>

          {/* Recently Viewed - also dynamic but broader selection */}
          <div className="mt-24 border-t border-edge pt-16">
            <h3 className="font-serif text-[2rem] mb-8 text-center">
              You Might Also Enjoy
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {getRelatedProducts(product.id, 4).map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="bg-raised border border-edge aspect-square flex items-center justify-center mb-4 rounded-lg overflow-hidden p-2 transition-all group-hover:border-gold">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-[0.85rem] font-medium mb-1 group-hover:text-gold transition-colors line-clamp-2">
                    {item.name.split(" | ")[0]}
                  </div>
                  <div className="font-serif text-gold">₹{item.vraecoPrice}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <StickyAtc
          productId={product.id}
          productName={product.name.split(" | ")[0]}
          productPrice={product.vraecoPrice}
          productImage={product.images[0]}
          isInStock={stockLeft > 0}
        />
      </section>
    </>
  );
}
