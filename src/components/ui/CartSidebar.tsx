import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { products } from '../../data/products';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const discount = useStore((state) => state.discount);
  const setDiscount = useStore((state) => state.setDiscount);
  const clearDiscount = useStore((state) => state.clearDiscount);
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [checkoutTimer, setCheckoutTimer] = useState(() => {
    const stored = localStorage.getItem('vraeco-cart-timer-start');
    if (stored) {
      const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000);
      return Math.max(600 - elapsed, 0);
    }
    if (cart.length > 0) return 600;
    return 0;
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    if (cart.length > 0 && checkoutTimer <= 0) {
      localStorage.setItem('vraeco-cart-timer-start', Date.now().toString());
    }
  }, [cart.length, checkoutTimer]);

  useEffect(() => {
    if (checkoutTimer <= 0) return;
    const interval = setInterval(() => {
      setCheckoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [checkoutTimer > 0]);

  const mins = Math.floor(checkoutTimer / 60);
  const secs = checkoutTimer % 60;
  const timerString = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  
  let discountAmount = 0;
  if (discount && discount.expiresAt > Date.now()) {
    discountAmount = Math.round(subtotal * (discount.percentage / 100));
  }
  
  const total = subtotal - discountAmount;

  return (
    <div 
      className={`fixed top-0 right-0 w-full md:w-[380px] h-[100vh] bg-surface border-l border-edge z-[400] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="p-6 border-b border-edge flex justify-between items-center">
        <span className="font-display text-[0.75rem] tracking-[3px] uppercase text-gold">
          Your Cart ({cartCount})
        </span>
        <button onClick={onClose} className="bg-transparent border-none text-text-muted text-[1.3rem] cursor-pointer hover:text-gold transition-colors" aria-label="Close cart sidebar">
          ✕
        </button>
      </div>
      
      <div className="p-4 px-6 bg-raised border-y border-edge">
        <div className="text-[0.65rem] uppercase tracking-[1.5px] text-gold mb-2.5 font-semibold">
          ⚡ Frequently bought together
        </div>
        <div className="flex items-center gap-3">
          {(() => {
            const crossSell = products.find(p => p.badge === 'bestseller') || products[0];
            return (
              <>
                <div className="w-11 h-11 bg-surface border border-edge flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                  <img src={crossSell.images[0]} alt={crossSell.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-[0.78rem]">
                  {crossSell.name.split(' | ')[0]}<br/>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gold font-serif">₹{crossSell.vraecoPrice}</span>
                    <span className="text-[0.65rem] text-text-dim line-through">₹{crossSell.originalPrice}</span>
                  </div>
                  <div className="text-[0.65rem] text-jade mt-0.5 font-semibold">Save ₹{crossSell.originalPrice - crossSell.vraecoPrice}</div>
                </div>
                <button
                  onClick={() => {
                    useStore.getState().addToCart({
                      id: crossSell.id,
                      name: crossSell.name.split(' | ')[0],
                      price: crossSell.vraecoPrice,
                      image: crossSell.images[0],
                      quantity: 1
                    });
                  }}
                  className="bg-transparent border border-gold-dim text-gold text-[0.65rem] px-3 py-1 cursor-pointer transition-all tracking-[1px] font-display hover:bg-gold hover:text-void"
                  aria-label={`Add ${crossSell.name.split(' | ')[0]} to cart`}
                >
                  + Add
                </button>
              </>
            );
          })()}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 px-6">
        {cart.length === 0 ? (
          <div className="text-center text-text-muted mt-10 text-[0.85rem]">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="flex gap-4 py-4 border-b border-edge">
              <div className="w-[60px] h-[60px] bg-raised flex items-center justify-center shrink-0 border border-edge overflow-hidden p-1">
                {typeof item.image === 'string' && item.image.startsWith('/') ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[1.5rem]">{item.image}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="text-[0.82rem] font-medium mb-1">{item.name}</div>
                {item.variant && <div className="text-[0.7rem] text-text-dim mb-1">Variant: {item.variant}</div>}
                <div className="text-[0.85rem] text-gold font-serif">₹{item.price}</div>
                  {(() => {
                    const product = products.find(p => p.id === item.id);
                    const savings = product ? (product.originalPrice - product.vraecoPrice) * item.quantity : 0;
                    return savings > 0 ? (
                      <div className="text-[0.6rem] text-jade font-semibold mt-0.5">You saved ₹{savings}</div>
                    ) : null;
                  })()}
                  {(() => {
                    const product = products.find(p => p.id === item.id);
                    return product && product.stockCount <= 15 ? (
                      <div className="text-[0.6rem] text-ember mt-0.5 font-medium">Only {product.stockCount} left</div>
                    ) : null;
                  })()}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-edge rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.variant, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-text-muted hover:text-gold"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >-</button>
                    <span className="text-[0.75rem] px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.variant, Math.min(item.quantity + 1, 10))}
                      className="px-2 py-1 text-text-muted hover:text-gold"
                      aria-label={`Increase quantity of ${item.name}`}
                    >+</button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id, item.variant)}
                className="bg-transparent border-none text-text-dim text-[0.75rem] cursor-pointer self-start p-0 transition-colors hover:text-ember"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="p-6 border-t border-edge">
        {/* Coupon Code Input */}
        {!discount && cart.length > 0 && (
          <div className="mb-4">
            <div className="text-[0.65rem] uppercase tracking-[1.5px] text-text-muted mb-2 font-semibold">
              Have a coupon code?
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase().trim());
                  setCouponError('');
                }}
                placeholder="VRA-XXXXXXX"
                maxLength={9}
                className="flex-1 bg-raised border border-edge rounded-lg px-3 py-2.5 text-[0.78rem] text-text-main placeholder:text-text-dim focus:outline-none focus:border-gold transition-colors uppercase font-display tracking-[1px]"
              />
              <button
                onClick={() => {
                  if (!/^VRA-[A-Z2-9]{4,8}$/.test(couponInput)) {
                    setCouponError('Invalid coupon code');
                    return;
                  }
                  setDiscount({ code: couponInput, percentage: 10, expiresAt: Date.now() + 600000 });
                  setCouponApplied(true);
                  setCouponError('');
                }}
                disabled={couponInput.length < 9 || couponApplied}
                className="bg-gold text-void px-4 py-2.5 rounded-lg text-[0.65rem] font-bold uppercase tracking-[1px] cursor-pointer hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-none font-display"
              >
                Apply
              </button>
            </div>
            {couponError && <div className="text-[0.6rem] text-ember mt-1">{couponError}</div>}
            {couponApplied && (
              <div className="text-[0.6rem] text-jade mt-1">Coupon applied! Discount auto-applied at checkout.</div>
            )}
          </div>
        )}
        {discount && discount.expiresAt > Date.now() && (
          <div className="mb-4 bg-jade/10 border border-jade/20 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="text-[0.7rem] text-jade font-semibold">Your exclusive 10% discount is unlocked!</div>
            <button
              onClick={() => {
                clearDiscount();
                setCouponApplied(false);
                setCouponInput('');
              }}
              className="text-[0.6rem] text-text-dim hover:text-ember cursor-pointer bg-transparent border-none transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        <div className="bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.15)] px-3 py-2 text-[0.72rem] text-jade flex items-center gap-1.5 mb-4">
          FREE shipping on your order
        </div>

        {/* Savings Summary */}
        {(() => {
          const totalSavings = cart.reduce((acc, item) => {
            const product = products.find(p => p.id === item.id);
            return acc + (product ? (product.originalPrice - product.vraecoPrice) * item.quantity : 0);
          }, 0);
          return totalSavings > 0 ? (
            <div className="mb-3 bg-gold/5 border border-gold/15 rounded-lg px-3 py-2 text-[0.75rem] text-gold font-semibold text-center">
              Total Savings: ₹{totalSavings + discountAmount}
            </div>
          ) : null;
        })()}

        <div className="flex justify-between text-[0.82rem] mb-2 text-text-muted">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-[0.82rem] mb-2 text-jade">
            <span>Discount applied</span>
            <span>₹{discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between mb-4 pt-3 border-t border-edge">
          <span className="text-[0.85rem] font-semibold">Total</span>
        <span className="font-serif text-[1.5rem] text-gold font-semibold">₹{total}</span>
      </div>
        {checkoutTimer > 0 && cart.length > 0 && (
          <div className="mb-3 bg-ember/10 border border-ember/20 rounded-lg px-3 py-2 text-[0.7rem] text-ember font-semibold text-center">
            Complete checkout in {timerString} to lock your prices
          </div>
        )}
      <button
        onClick={() => {
          onClose();
          navigate('/checkout');
        }}
        disabled={cart.length === 0}
        className={`w-full bg-gold text-void border-none p-4 font-display text-[0.7rem] font-bold tracking-[3px] uppercase transition-colors mb-3 cursor-pointer hover:bg-gold-light ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Proceed to Checkout
      </button>
      <div className="flex justify-center gap-6 text-[0.65rem] text-text-dim">
        <span>Secure</span>
        <span>COD Available</span>
        <span>Easy Returns</span>
      </div>
    </div>
  </div>
);
}
