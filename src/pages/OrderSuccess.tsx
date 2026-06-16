import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle, ArrowLeft, Truck, Package, Gift, Clock, Heart, MessageCircle, Share2, Copy, Check, Users } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  customerName: string;
  phone: string;
  paymentMethod: string;
  total: number;
  items: OrderItem[];
}

export default function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(undefined as unknown as OrderData | null);
  const displayId = orderId?.startsWith('VRA-') ? orderId : `VRA-${orderId}`;
  const addToast = useToastStore((state) => state.addToast);
  const [upsellClaimed, setUpsellClaimed] = useState(() =>
    typeof window !== 'undefined' && !!localStorage.getItem('vraeco-upsell-claimed')
  );

  const [upsellProduct, setUpsellProduct] = useState(() => {
    const cheapProducts = products.filter(p => p.vraecoPrice <= 449);
    return cheapProducts[Math.floor(Math.random() * cheapProducts.length)] || products[0];
  });

  const [referralCopied, setReferralCopied] = useState(false);
  const referralCode = `VRA-${orderId?.slice(0, 8) || Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const referralLink = `https://vraeco.com?ref=${referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  useEffect(() => {
    confetti({ particleCount: 150, spread: 70, startVelocity: 30, origin: { y: 0.6 } });

    if (orderId) {
      fetch(`/api/orders/${orderId.replace('VRA-', '')}`)
        .then(res => res.json())
        .then(data => setOrderData(data))
        .catch(() => {});
    }
  }, [orderId]);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);
  const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-jade/10 rounded-full mb-4">
            <CheckCircle size={48} className="text-jade" />
          </div>
          <h1 className="font-serif text-[2.5rem] leading-tight mb-3">Order Confirmed!</h1>
          <p className="text-text-muted text-[1rem]">Thank you for choosing VRAECO</p>
        </motion.div>

        {/* Order Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-edge rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package size={20} className="text-gold" />
            <h2 className="font-serif text-[1.3rem]">Order #{displayId}</h2>
          </div>
          <div className="space-y-3 text-[0.9rem]">
            {orderData === undefined ? (
              <p className="text-text-dim text-center py-4">Loading order details...</p>
            ) : orderData?.customerName ? (
              <>
                <div className="flex justify-between"><span className="text-text-dim">Customer</span><span className="font-medium">{orderData.customerName}</span></div>
                <div className="flex justify-between"><span className="text-text-dim">Phone</span><span>{orderData.phone}</span></div>
                <div className="flex justify-between"><span className="text-text-dim">Payment</span><span className={`font-semibold ${orderData.paymentMethod === 'COD' ? 'text-gold-dim' : 'text-jade'}`}>{orderData.paymentMethod}</span></div>
                <div className="border-t border-edge pt-3 mt-3 flex justify-between items-center">
                  <span className="font-semibold text-text-main">Total Paid</span>
                  <span className="font-serif text-[1.8rem] text-gold">&#8377;{orderData.total}</span>
                </div>
                {orderData.items && orderData.items.length > 0 && (
                  <div className="border-t border-edge pt-3 mt-3">
                    <div className="text-text-dim text-xs uppercase tracking-wider mb-2">Items Ordered</div>
                    {orderData.items.map((item: OrderItem, i: number) => (
                      <div key={i} className="flex justify-between py-1">
                        <span className="text-text-muted">{item.quantity}x {item.name}</span>
                        <span className="font-medium">&#8377;{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-text-main font-medium mb-2">Order confirmed!</p>
                <p className="text-text-dim">Check your email for full order details and tracking information.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Delivery Estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-jade/5 border border-jade/20 rounded-2xl p-6 mb-8 flex items-start gap-3"
        >
          <Truck size={24} className="text-jade shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-text-main mb-1">Estimated Delivery</div>
            <div className="font-serif text-[1.3rem] text-jade">{fmt(minDate)} – {fmt(maxDate)}</div>
            <div className="text-text-dim text-[0.8rem] mt-1">3-5 business days via our shipping partner</div>
          </div>
        </motion.div>

        {/* Upsell */}
        {!upsellClaimed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-edge rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-jade to-transparent"></div>
          <div className="flex items-center gap-2 mb-3">
            <Gift size={20} className="text-jade shrink-0" />
            <div className="text-[0.65rem] tracking-[2px] uppercase text-jade font-bold">Thank You Gift — A Special Offer For You</div>
          </div>

          {(() => {
            const upsellPrice = Math.round(upsellProduct.vraecoPrice * 0.4);
            return (
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="w-20 h-20 bg-raised border border-jade/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden p-1">
                  <img src={upsellProduct.images[0]} alt={upsellProduct.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-[1.1rem] mb-1">{upsellProduct.name.split(' | ')[0]}</h3>
                  <p className="text-[0.78rem] text-text-muted mb-2">{upsellProduct.hookLine}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-[0.75rem] text-text-dim line-through">₹{upsellProduct.vraecoPrice}</span>
                    <span className="font-serif text-[1.4rem] text-gold font-bold">₹{upsellPrice}</span>
                    <span className="bg-jade/10 text-jade text-[0.55rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">EXCLUSIVE DEAL</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    useStore.getState().addToCart({
                      id: upsellProduct.id,
                      name: upsellProduct.name.split(' | ')[0],
                      price: upsellPrice,
                      image: upsellProduct.images[0],
                      quantity: 1,
                    });
                    addToast('Exclusive deal added at 60% OFF!', 'success');
                  }}
                  className="bg-gradient-to-r from-jade to-jade/80 text-void py-3 px-6 font-display text-[0.6rem] font-bold tracking-[2px] uppercase rounded-xl cursor-pointer shadow-[0_8px_25px_rgba(34,168,122,0.3)] whitespace-nowrap"
                >
                  Get This Deal ₹{upsellPrice}
                </motion.button>
              </div>
            );
          })()}
          <div className="mt-4 flex items-center justify-center gap-4 text-[0.65rem] text-text-dim">
            <span className="flex items-center gap-1"><Clock size={12} /> Valid for your next order</span>
            <span>•</span>
            <span>🔒 60% OFF thank-you exclusive</span>
          </div>
        </motion.div>
        )}

        {/* Refer a Friend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-surface border border-edge rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-gold" />
            <h3 className="font-serif text-[1.2rem]">Share the Love — Get ₹100 Off</h3>
          </div>
          <p className="text-[0.82rem] text-text-muted mb-4">When your friend uses your link, they get ₹100 off AND you get ₹100 reward!</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-raised border border-gold/30 rounded-lg px-3 py-2 text-[0.72rem] text-gold font-mono truncate">
              {referralLink}
            </div>
            <button
              onClick={copyReferral}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[0.7rem] font-bold border-none cursor-pointer ${referralCopied ? 'bg-jade/20 text-jade' : 'bg-gold/10 text-gold hover:bg-gold/20'}`}
            >
              {referralCopied ? <Check size={14} /> : <Copy size={14} />} {referralCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                if (navigator.share) { navigator.share({ title: 'VRAECO', text: `Use code ${referralCode}`, url: referralLink }); }
              }}
              className="bg-sky/20 text-sky px-4 py-2 rounded-lg text-[0.7rem] font-bold flex items-center gap-1.5 hover:bg-sky/30 cursor-pointer"
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link to="/order-tracking" className="flex items-center justify-center gap-2 bg-surface border border-edge text-text-main py-3 px-6 rounded-xl text-[0.8rem] hover:border-gold hover:text-gold transition-colors flex-1">
            <Truck size={16} /> Track Order
          </Link>
          <Link to="/" className="btn-primary flex items-center justify-center gap-2 flex-1">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-[0.85rem] text-text-dim"
        >
          You're one of <strong className="text-text-main">2,847</strong> happy customers this week
        </motion.div>
      </div>
    </main>
  );
}