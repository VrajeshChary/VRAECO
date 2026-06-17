import { useState, FormEvent } from 'react';
import { Helmet } from '../components/Helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Loader2, Home, Clock, MapPin, Mail, Phone } from 'lucide-react';

const trackingStages = [
  { status: 'Order Confirmed', icon: CheckCircle, color: 'text-jade', date: 'Apr 4, 2:30 PM', detail: 'Payment received. Order is being prepared.' },
  { status: 'Processing', icon: Package, color: 'text-gold', date: 'Apr 5, 10:00 AM', detail: 'Your items have been packed and labelled.' },
  { status: 'Shipped', icon: Truck, color: 'text-sky', date: 'Apr 5, 4:15 PM', detail: 'Package picked up by our courier partner.' },
  { status: 'Out for Delivery', icon: MapPin, color: 'text-ember', date: 'Expected: Apr 7', detail: 'Your order will arrive between Apr 7-9.' },
  { status: 'Delivered', icon: Home, color: 'text-text-dim', date: 'Pending', detail: 'Your order will be marked delivered upon arrival.' },
];

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);

  const handleTrackOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setOrderFound(true);
    setIsSearching(false);
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | VRAECO — Real-Time Delivery Status India</title>
        <meta name="description" content="Track your VRAECO order in real-time. Enter your order ID to get the latest delivery status updates." />
        <link rel="canonical" href="https://vreco.vercel.app/order-tracking" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
        <div className="section-inner max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-edge rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <h1 className="font-serif text-[2.5rem] text-center mb-3 leading-tight">
              Track Your Order
            </h1>
            <p className="text-text-muted text-center mb-10 text-[1rem] max-w-[500px] mx-auto">
              Enter your order ID to check the latest delivery status.
            </p>

            <form onSubmit={handleTrackOrder} className="flex gap-3 mb-8">
              <input
                type="text"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setOrderFound(false); }}
                placeholder="Order ID (e.g., VRA-XXXXXXX)"
                className="flex-1 bg-raised border border-edge rounded-lg px-4 py-3 text-[0.9rem] text-text-main placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors"
                aria-label="Order ID"
              />
              <button
                type="submit"
                disabled={isSearching || !orderId.trim()}
                className="bg-gold text-void px-6 py-3 rounded-lg font-display text-[0.7rem] font-bold tracking-[2px] uppercase cursor-pointer hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-none flex items-center gap-2"
              >
                {isSearching ? <><Loader2 size={16} className="animate-spin" /> Tracking...</> : <><Search size={16} /> Track</>}
              </button>
            </form>

            {/* Visual Timeline */}
            {orderFound && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                  <Package size={18} className="text-gold" />
                  <span className="text-[0.7rem] uppercase tracking-[2px] text-text-dim">Order Timeline</span>
                </div>

                {trackingStages.map((stage, i) => {
                  const isComplete = i < 3;
                  const isCurrent = i === 3;
                  const isFuture = i > 3;
                  const Icon = stage.icon;

                  return (
                    <div key={i} className="flex gap-4 relative">
                      {/* Timeline connector */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          isComplete ? 'bg-jade/10 border-jade' : isCurrent ? 'bg-gold/10 border-gold animate-pulse' : 'bg-raised border-edge'
                        }`}>
                          <Icon size={16} className={isComplete ? 'text-jade' : isCurrent ? 'text-gold' : 'text-text-dim'} />
                        </div>
                        {i < trackingStages.length - 1 && (
                          <div className={`w-0.5 h-16 ${isComplete ? 'bg-jade' : 'bg-edge'}`} />
                        )}
                      </div>

                      <div className={`pb-10 ${isFuture ? 'opacity-40' : ''}`}>
                        <div className="font-bold text-[0.9rem] flex items-center gap-2">
                          <span className={isComplete ? 'text-jade' : isCurrent ? 'text-gold' : 'text-text-dim'}>{stage.status}</span>
                          {isCurrent && <span className="text-[0.55rem] bg-gold text-void px-2 py-0.5 rounded-full font-bold">CURRENT</span>}
                        </div>
                        <div className="text-[0.7rem] text-text-dim mt-0.5">{stage.date}</div>
                        <div className="text-[0.75rem] text-text-muted mt-1">{stage.detail}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Support */}
                <div className="mt-6 bg-raised border border-edge rounded-xl p-4">
                  <p className="text-[0.8rem] text-text-muted mb-3">Need help with this order?</p>
                  <div className="flex items-center gap-4">
                    <a href="mailto:vraeco.store@gmail.com" className="flex items-center gap-2 text-[0.75rem] text-gold hover:text-gold-light">
                      <Mail size={14} /> Email Support
                    </a>
                    <Link to="/contact" className="flex items-center gap-2 text-[0.75rem] text-sky hover:text-sky/80">
                      <Phone size={14} /> Contact Us
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {!orderFound && !isSearching && (
              <div className="text-center py-4 text-[0.75rem] text-text-dim">
                Demo mode — enter any order ID to see the tracking timeline
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
