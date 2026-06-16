import { useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { useToastStore } from '../../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, BadgeCheck, RotateCcw, Loader2, CheckCircle, Tag, Check } from 'lucide-react';
import { validateCoupon } from '../../utils/coupons';

// Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  description: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal: {
    ondismiss?: () => void;
    escape: boolean;
    backdropclose: boolean;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

const getCODSurcharge = (subtotal: number) => {
  if (subtotal < 300) return 30;
  if (subtotal < 600) return 50;
  if (subtotal < 1000) return 80;
  return 100;
};

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return reject(new Error('Payment gateway failed to load. Switching to Cash on Delivery...'));
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load payment gateway. Please try Cash on Delivery instead.'));
    document.body.appendChild(script);
  });
}

export default function CheckoutFlow() {
  const cart = useStore((state) => state.cart);
  const discount = useStore((state) => state.discount);
  const clearCart = useStore((state) => state.clearCart);
  const clearDiscount = useStore((state) => state.clearDiscount);
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();
  const sessionId = useStore((state) => state.sessionId);

  const [step, setStep] = useState(1);
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [retryMessage, setRetryMessage] = useState('');
  const maxAttempts = 3;
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    house: '',
    road: '',
    colony: '',
    pincode: '',
    city: '',
    state: '',
    landmark: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ valid: boolean; error?: string; discount?: number; type?: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setTimeout(() => {
      const result = validateCoupon(couponCode, subtotal);
      setCouponApplied(result);
      setCouponLoading(false);
    }, 500);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const codSurcharge = getCODSurcharge(subtotal);

  let discountAmount = 0;
  if (discount && discount.expiresAt > Date.now()) {
    discountAmount = Math.round(subtotal * (discount.percentage / 100));
  }

  // Coupon discount
  let couponDiscount = 0;
  if (couponApplied?.valid && couponApplied.discount) {
    couponDiscount = couponApplied.type === 'percentage'
      ? Math.round(subtotal * (couponApplied.discount / 100))
      : couponApplied.discount;
  }

  const total = subtotal - discountAmount - couponDiscount;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.house.trim()) newErrors.house = 'House/Building is required';
    if (!formData.road.trim()) newErrors.road = 'Road/Area is required';
    if (!formData.colony.trim()) newErrors.colony = 'Colony is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      if (formData.email.trim()) {
        fetch('/api/cart/abandoned', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, items: cart }),
        }).catch(() => {});
      }
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePincodeLookup = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, pincode: e.target.value }));
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // ignore non-numeric input
    if (errors.pincode) setErrors(prev => ({ ...prev, pincode: '' }));
    if (value.length === 6) {
      setPincodeLoading(true);
      try {
        const res = await fetch(`/api/pincode/${value}`);
        const data = await res.json();
        if (data.success) {
          setFormData(prev => ({ ...prev, city: data.city, state: data.state }));
          addToast(`Location found: ${data.city}, ${data.state}`, 'success');
        } else {
          addToast('Pincode not found. Please enter it manually.', 'error');
        }
      } catch {
        addToast('Could not verify pincode. Please enter city and state manually.', 'error');
      }
      setPincodeLoading(false);
    }
  };

  const handleCODCheckout = async () => {
    if (cart.length === 0) { addToast("Your cart is empty!", "error"); return; }
    
    if (!window.confirm(`Are you sure you want to place this order using Cash on Delivery?\n\nAn additional surcharge of ₹${codSurcharge} applies.\nOur team may call you to verify this order.`)) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: { house: formData.house, road: formData.road, colony: formData.colony, city: formData.city, state: formData.state, pincode: formData.pincode, landmark: formData.landmark },
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, variant: item.variant || '' })),
        subtotal,
        discountCode: discount?.code || '',
        discountAmount,
        couponCode: couponApplied?.valid ? couponCode : '',
        couponDiscount,
        paymentMethod: 'COD',
      };

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, orderData })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to place order');
      }

      const data = await response.json();
      const orderId = data.orderId?.startsWith('VRA-') ? data.orderId : `VRA-${data.orderId}`;

      if (window.fbq) window.fbq('track', 'Purchase', { value: total + codSurcharge, currency: 'INR' });
      if (window.gtag) window.gtag('event', 'purchase', { transaction_id: orderId, value: total + codSurcharge, currency: 'INR' });

      clearCart();
      clearDiscount();
      addToast("Order placed successfully!", "success");
      navigate(`/order-success/${orderId}`);
    } catch (err: any) {
      addToast(err.message || "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayCheckout = async () => {
    if (cart.length === 0) { addToast("Your cart is empty!", "error"); return; }
    if (paymentAttempts >= maxAttempts) {
      setRetryMessage("Too many attempts. Please try Cash on Delivery instead.");
      setShowRetry(true);
      return;
    }

    setIsSubmitting(true);
    setShowRetry(false);
    setRetryMessage('');

    try {
      // 1. Create Razorpay order on backend
      const orderData = {
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: { house: formData.house, road: formData.road, colony: formData.colony, city: formData.city, state: formData.state, pincode: formData.pincode, landmark: formData.landmark },
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, variant: item.variant || '' })),
        subtotal,
        discountCode: discount?.code || '',
        discountAmount,
        couponCode: couponApplied?.valid ? couponCode : '',
        couponDiscount,
        paymentMethod: 'RAZORPAY',
      };

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, orderData })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create order');
      }

      const { orderId, razorpayOrderId, amountInPaise, key_id } = await response.json();

      // 2. Load Razorpay SDK
      await loadRazorpayScript();
      if (!window.Razorpay) {
        throw new Error('Unable to load payment gateway. Switching to Cash on Delivery...');
      }

      // 3. Open Razorpay popup
      const options: RazorpayOptions = {
        key: key_id,
        amount: amountInPaise as number,
        currency: 'INR',
        name: 'VRAECO',
        order_id: razorpayOrderId,
        description: `Order #VRA-${orderId}`,
        handler: async function (rzpResponse: any) {
          try {
            // 4. Verify payment on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_signature: rzpResponse.razorpay_signature,
                orderId,
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPaymentAttempts(0); // Reset on success
              setShowRetry(false);
              if (window.fbq) window.fbq('track', 'Purchase', { value: total, currency: 'INR' });
              if (window.gtag) window.gtag('event', 'purchase', { transaction_id: `VRA-${orderId}`, value: total, currency: 'INR' });

              clearCart();
              clearDiscount();
              addToast("Payment successful! Order confirmed.", "success");
              navigate(`/order-success/VRA-${orderId}`);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (err: any) {
            const newAttempts = paymentAttempts + 1;
            setPaymentAttempts(newAttempts);

            if (newAttempts >= maxAttempts) {
              setRetryMessage("Multiple attempts failed. We recommend trying Cash on Delivery.");
              setShowRetry(true);
            } else {
              setRetryMessage(`Payment could not be processed. You can retry (${maxAttempts - newAttempts} attempt${maxAttempts - newAttempts > 1 ? 's' : ''} left) or switch to Cash on Delivery.`);
              setShowRetry(true);
            }

            addToast(err.message || "Payment could not be processed", "error");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email || '',
          contact: formData.phone,
        },
        theme: { color: '#c9a84c' },
        modal: {
          ondismiss: () => {
            // Dismiss is NOT counted as an attempt — user can still retry
            setIsSubmitting(false);
            const remaining = maxAttempts - paymentAttempts;
            if (remaining > 0) {
              setRetryMessage("Payment window closed. You can retry opening the payment gateway or switch to Cash on Delivery.");
              setShowRetry(true);
            } else {
              setRetryMessage("No retry attempts left. Please use Cash on Delivery to complete your order.");
              setShowRetry(true);
            }
          },
          escape: true,
          backdropclose: false,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      addToast(err.message || "Something went wrong", "error");
      setIsSubmitting(false);
    }
  };

  const handleRetryPayment = () => {
    setShowRetry(false);
    setRetryMessage('');
    handleRazorpayCheckout();
  };

  return (
    <div className="min-h-screen bg-raised">
      {isSubmitting && (
        <div className="fixed inset-0 bg-text-main/60 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-white animate-spin mb-4" />
          <div className="text-white text-lg font-medium animate-pulse">Processing your order...</div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-sm text-jade font-medium mb-2">
            <ShieldCheck size={16} />
            Secure Checkout
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold">Complete Your Order</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 max-w-md mx-auto">
          {[
            { num: 1, label: 'Contact' },
            { num: 2, label: 'Shipping' },
            { num: 3, label: 'Payment' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${step >= s.num ? 'bg-gold-dim text-void' : 'bg-deep text-text-muted'}`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs ml-2 hidden md:inline ${step >= s.num ? 'text-gold font-medium' : 'text-text-dim'}`}>{s.label}</span>
              {i < 2 && <div className={`flex-1 h-[2px] mx-2 md:mx-4 ${step > s.num ? 'bg-gold' : 'bg-deep'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="bg-surface border border-edge rounded-xl p-6">
                  <h3 className="font-serif text-xl font-semibold mb-5">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.fullName ? 'border-ember' : 'border-edge'}`} />
                      {errors.fullName && <span className="text-ember text-xs mt-1 block">{errors.fullName}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number (10 digits) *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} inputMode="tel" className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.phone ? 'border-ember' : 'border-edge'}`} />
                      {errors.phone && <span className="text-ember text-xs mt-1 block">{errors.phone}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email (Optional)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} inputMode="email" className="w-full border border-edge rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy" />
                    </div>
                  </div>
                  <button onClick={handleNextStep} className="w-full mt-6 bg-gold text-void py-3 rounded-lg font-medium text-sm hover:bg-gold-dim transition-colors">Continue to Shipping</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="bg-surface border border-edge rounded-xl p-6">
                  <h3 className="font-serif text-xl font-semibold mb-5">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">House / Building Name *</label>
                      <input type="text" name="house" value={formData.house} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.house ? 'border-ember' : 'border-edge'}`} />
                      {errors.house && <span className="text-ember text-xs mt-1 block">{errors.house}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Road / Area *</label>
                      <input type="text" name="road" value={formData.road} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.road ? 'border-ember' : 'border-edge'}`} />
                      {errors.road && <span className="text-ember text-xs mt-1 block">{errors.road}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Colony / Locality *</label>
                      <input type="text" name="colony" value={formData.colony} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.colony ? 'border-ember' : 'border-edge'}`} />
                      {errors.colony && <span className="text-ember text-xs mt-1 block">{errors.colony}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode (6 digits) *</label>
                      <div className="relative">
                        <input type="text" name="pincode" value={formData.pincode} maxLength={6} onChange={handlePincodeLookup} inputMode="numeric" className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${pincodeLoading ? 'pr-10' : ''} ${errors.pincode ? 'border-ember' : 'border-edge'}`} />
                        {pincodeLoading && <span className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-text-dim">⏳</span>}
                      </div>
                      {errors.pincode && <span className="text-ember text-xs mt-1 block">{errors.pincode}</span>}
                      {formData.city && formData.state && (
                        <span className="text-xs text-jade mt-1 block">Auto-filled: {formData.city}, {formData.state}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.city ? 'border-ember' : 'border-edge'}`} />
                        {errors.city && <span className="text-ember text-xs mt-1 block">{errors.city}</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">State *</label>
                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy ${errors.state ? 'border-ember' : 'border-edge'}`} />
                        {errors.state && <span className="text-ember text-xs mt-1 block">{errors.state}</span>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
                      <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="w-full border border-edge rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy" />
                    </div>
                  </div>
                  <button onClick={handleNextStep} className="w-full mt-6 bg-gold text-void py-3 rounded-lg font-medium text-sm hover:bg-gold-dim transition-colors">Continue to Payment</button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="bg-surface border border-edge rounded-xl p-6">
                  {/* Heading with urgency */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-semibold">Payment</h3>
                    <span className="text-[0.65rem] text-jade font-semibold uppercase tracking-wider bg-jade/10 px-3 py-1 rounded-full">&#10003; Your order is almost done!</span>
                  </div>

                  {codSurcharge > 0 && (
                    <div className="mb-4 bg-gold/8 border border-gold/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <span className="text-sm">&#128161;</span>
                      <p className="text-[0.82rem] text-gold font-medium">
                        Pay online & save <strong>&#8377;{codSurcharge}</strong> — no COD surcharge!
                      </p>
                    </div>
                  )}

                  {/* Retry / Recovery Banner */}
                  <AnimatePresence>
                    {showRetry && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mb-4 bg-jade/5 border border-jade/20 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-jade shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-text-main mb-3">{retryMessage}</p>
                            <div className="flex gap-2 flex-wrap">
                              {paymentAttempts < maxAttempts && (
                                <button
                                  onClick={handleRetryPayment}
                                  disabled={isSubmitting}
                                  className="bg-jade text-void px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-jade/90 transition-all cursor-pointer disabled:opacity-50 shadow-[0_4px_16px_rgba(61,220,151,0.3)]"
                                >
                                  Retry Payment (&#8377;{maxAttempts - paymentAttempts} left)
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setShowRetry(false);
                                  setRetryMessage('');
                                  handleCODCheckout();
                                }}
                                disabled={isSubmitting}
                                className="bg-surface text-text-main border border-edge px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:border-gold hover:text-gold transition-all cursor-pointer disabled:opacity-50"
                              >
                                Pay on Delivery Instead
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Payment Options */}
                  <div className="space-y-3 mt-4">
                    {/* Razorpay Online — Primary CTA */}
                    <motion.div
                      whileHover={!isSubmitting && paymentAttempts < maxAttempts ? { scale: 1.005, y: -1 } : {}}
                      whileTap={!isSubmitting && paymentAttempts < maxAttempts ? { scale: 0.995 } : {}}
                    >
                      <button
                        onClick={handleRazorpayCheckout}
                        disabled={isSubmitting || paymentAttempts >= maxAttempts}
                        className={`w-full bg-gradient-to-r from-gold via-gold-light to-gold text-void py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-[0_8px_32px_rgba(201,168,76,0.3)] relative overflow-hidden ${isSubmitting || paymentAttempts >= maxAttempts ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className="relative z-10 flex items-center gap-2.5">
                          <ShieldCheck size={18} />
                          Pay Online &#8594; UPI, Cards, NetBanking
                          {codSurcharge > 0 && (
                            <span className="bg-white/90 text-gold-dim text-[0.55rem] font-bold px-2 py-0.5 rounded-full">
                              Save &#8377;{codSurcharge}
                            </span>
                          )}
                        </span>
                      </button>
                      <div className="flex items-center justify-center gap-4 mt-2 text-[0.6rem] text-text-dim">
                        <span className="flex items-center gap-1"><ShieldCheck size={10} /> 100% Secure</span>
                        <span className="flex items-center gap-1"><BadgeCheck size={10} /> Instant Confirmation</span>
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-edge" />
                      <span className="text-[0.7rem] text-text-dim uppercase tracking-wider">or</span>
                      <div className="flex-1 h-px bg-edge" />
                    </div>

                    {/* COD — Secondary */}
                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.005, borderColor: 'rgba(201,168,76,0.4)' } : {}}
                      whileTap={!isSubmitting ? { scale: 0.995 } : {}}
                      onClick={handleCODCheckout}
                      disabled={isSubmitting}
                      className={`w-full bg-surface border-2 border-edge text-text-main py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="text-lg">&#128230;</span>
                      Cash on Delivery
                      {codSurcharge > 0 && <span className="text-[0.6rem] text-ember bg-ember/10 px-2 py-0.5 rounded-full">+&#8377;{codSurcharge}</span>}
                    </motion.button>
                  </div>

                  {/* Delivery + Trust */}
                  <div className="mt-5 bg-raised rounded-xl p-4 flex items-center gap-3">
                    <Truck size={18} className="text-jade shrink-0" />
                    <span className="text-sm text-text-muted">Expected delivery in <strong className="text-text-main">3-5 business days</strong></span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {[
                      { icon: <ShieldCheck size={16} />, label: 'Secure SSL' },
                      { icon: <BadgeCheck size={16} />, label: 'COD' },
                      { icon: <RotateCcw size={16} />, label: '7-Day Returns' },
                      { icon: <Truck size={16} />, label: 'Pan-India' },
                    ].map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                        <span className="text-text-dim">{b.icon}</span>
                        <span className="text-[0.55rem] text-text-dim uppercase tracking-wide">{b.label}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={handlePrevStep} className="text-sm text-text-dim hover:text-text-muted mt-4 underline text-center block w-full">
                    Back to Shipping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-edge rounded-xl p-5 sticky top-24">
              <h3 className="font-semibold mb-4 pb-3 border-b border-edge">Order Summary</h3>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-sm text-text-dim">Your cart is empty</p>
                ) : (
                  cart.map(item => (
                    <div key={`${item.id}-${item.variant}`} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-deep rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                          {typeof item.image === 'string' && item.image.startsWith('/') ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg">{item.image}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-text-dim">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Code */}
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon Code"
                    className="flex-1 bg-raised border border-edge rounded-lg px-3 py-2 text-[0.8rem] text-text-main placeholder:text-text-dim outline-none focus:border-gold uppercase tracking-wider"
                  />
                  {couponApplied?.valid ? (
                    <div className="bg-jade/10 border border-jade/20 text-jade px-3 py-2 rounded-lg text-[0.7rem] font-bold flex items-center gap-1">
                      <Check size={14} /> Applied
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={applyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-gold text-void px-4 rounded-lg font-bold text-[0.7rem] border-none cursor-pointer disabled:opacity-50 flex items-center gap-1"
                    >
                      {couponLoading ? <Loader2 size={14} className="animate-spin" /> : <Tag size={14} />} Apply
                    </motion.button>
                  )}
                </div>
                {couponApplied && !couponApplied.valid && (
                  <div className="text-[0.65rem] text-ember mt-1">✕ {couponApplied.error}</div>
                )}
                {couponApplied?.valid && (
                  <div className="text-[0.65rem] text-jade mt-1">✓ {couponApplied.type === 'percentage' ? `${couponApplied.discount}% OFF` : `₹${couponApplied.discount} OFF`} applied!</div>
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-edge pt-3">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-jade">
                    <span>Spin Discount ({discount?.percentage}%)</span>
                    <span>−₹{discountAmount}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-jade">
                    <span>Coupon Discount</span>
                    <span>−₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-jade">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t border-edge pt-3 mt-3">
                <span>Total</span>
                <span className="font-serif text-xl text-gold">₹{total}</span>
              </div>

              {codSurcharge > 0 && (
                <>
                  <div className="mt-3 bg-ember/10 border border-ember/20 rounded-lg p-3 text-center">
                    <div className="text-[0.72rem] text-text-muted">
                      Cash on Delivery total: <span className="font-bold text-text-main">₹{total + codSurcharge}</span>{' '}
                      <span className="text-ember">(+₹{codSurcharge} surcharge)</span>
                    </div>
                  </div>
                  <div className="mt-2 bg-gold/8 border border-gold/20 rounded-lg p-3 text-center">
                    <div className="text-[0.72rem] text-gold-dim font-medium">
                      Pay online for just <span className="font-bold text-gold">₹{total}</span> — save ₹{codSurcharge}!
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
