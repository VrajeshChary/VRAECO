// Coupon codes management
const coupons = {
  // System codes
  'WELCOME10': { discount: 10, type: 'percentage' as const, minCart: 0 },
  'VRAECO20': { discount: 20, type: 'percentage' as const, minCart: 500 },
  'SAVE50': { discount: 50, type: 'fixed' as const, minCart: 300 },
  'FLASH25': { discount: 25, type: 'percentage' as const, minCart: 0 },
  // Student
  'STUDENT15': { discount: 15, type: 'percentage' as const, minCart: 0 },
  // First order
  'FIRSTORDER': { discount: 100, type: 'fixed' as const, minCart: 200 },
  // Bulk
  'BULK10': { discount: 10, type: 'percentage' as const, minCart: 1000 },
  // Festival
  'DIWALI30': { discount: 30, type: 'percentage' as const, minCart: 500 },
  // Refer a friend
  'REFERFRIEND': { discount: 100, type: 'fixed' as const, minCart: 0 },
} as const;

export type CouponCode = keyof typeof coupons;

export function validateCoupon(code: string, cartTotal: number): { valid: boolean; discount: number; type: string; error?: string } {
  const upperCode = code.toUpperCase().trim();
  const coupon = (coupons as any)[upperCode];

  if (!coupon) {
    return { valid: false, discount: 0, type: 'none', error: 'Invalid coupon code' };
  }

  if (cartTotal < coupon.minCart) {
    return { valid: false, discount: 0, type: 'none', error: `Minimum cart value: ₹${coupon.minCart}` };
  }

  return { valid: true, discount: coupon.discount, type: coupon.type };
}

export function applyCoupon(code: string, cartTotal: number): number {
  const result = validateCoupon(code, cartTotal);
  if (!result.valid) return cartTotal;

  if (result.type === 'percentage') {
    return cartTotal - (cartTotal * result.discount) / 100;
  }
  return Math.max(0, cartTotal - result.discount);
}

export function getActiveCoupons(): { code: string; discount: string }[] {
  return Object.entries(coupons).map(([code, c]) => ({
    code,
    discount: c.type === 'percentage' ? `${c.discount}% OFF` : `₹${c.discount} OFF`,
  }));
}
