interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

import { Product } from "../data/products";

interface ProductSEO {
  name: string;
  description: string;
  price: number;
  oldPrice: number;
}

export const defaultSEO: SEOOptions = {
  title: "VRAECO — Viral Home Essentials at Best Prices in India",
  description: "Shop India's trending viral products for kitchen, wellness, decor & more. Free shipping, COD available. Trusted by 10,000+ customers. Best prices guaranteed!",
  keywords: "viral products, home essentials, kitchen gadgets, wellness products, decor, online shopping India, best price, cash on delivery",
  type: "website"
};

export const pageSEO: Record<string, SEOOptions> = {
  home: {
    title: "VRAECO — Make Daily Tasks 10x Faster With Viral Tools | Best Prices",
    description: "Discover India's best selling viral products — kitchen gadgets, wellness essentials, decor. Flash sale live now. 3,200+ happy orders. Shop trending products at lowest prices!",
    keywords: "viral products india, trending kitchen gadgets, wellness essentials, best home decor, flash sale, cash on delivery india"
  },
  shop: {
    title: "Shop All Viral Products | VRAECO India — Kitchen, Wellness, Decor",
    description: "Browse our complete collection of viral products at unbeatable prices. Quick delivery pan-India. COD available. 4.8★ avg rating from 3,000+ verified customers.",
    keywords: "shop online india, viral products collection, kitchen tools, wellness gadgets, home decor deals"
  },
  checkout: {
    title: "Secure Checkout | VRAECO — Complete Your Order",
    description: "Complete your VRAECO order securely. Cash on Delivery available. Your order will be delivered in 3-5 business days. 100% money back guarantee.",
    keywords: ""
  },
  about: {
    title: "About VRAECO — India's Trusted Viral Products Store",
    description: "Learn about VRAECO's mission to bring the best viral products to Indian homes. Quality curated products at honest prices with fast delivery and easy returns."
  },
  contact: {
    title: "Contact VRAECO Support — vraeco.store@gmail.com",
    description: "Get in touch with VRAECO customer support. Email us at vraeco.store@gmail.com. We respond within 24 hours."
  },
  faq: {
    title: "Frequently Asked Questions | VRAECO — Shipping, Returns, Orders",
    description: "Find answers to common questions about VRAECO orders, shipping, returns, refunds, and delivery timelines. Can't find what you need? Email us anytime."
  },
  reviews: {
    title: "Customer Reviews & Ratings | VRAECO — 4.8★ from 3,000+ Buyers",
    description: "Read honest reviews from real VRAECO customers. 4.8/5 average rating. See why 10,000+ customers love our viral products."
  },
  bundles: {
    title: "Value Bundles | VRAECO — Save More With Curated Sets",
    description: "Shop curated bundles at VRAECO and save big. Combos of our best-selling viral products at unbeatable bundle prices."
  },
  offers: {
    title: "Exclusive Offers & Mystery Discount | VRAECO — Spin & Win!",
    description: "Unlock exclusive deals and mystery discounts at VRAECO. Spin the wheel for extra 5-50% off on your next order. Limited-time flash sales."
  },
  orderTracking: {
    title: "Track Your Order | VRAECO — Real-Time Delivery Status",
    description: "Track your VRAECO order in real-time. Enter your order ID to get the latest delivery status updates."
  },
  policies: {
    title: "Store Policies | VRAECO — Transparent & Customer-First",
    description: "Read VRAECO's customer-first policies on shipping, returns, refunds, terms, and privacy. We prioritize your satisfaction."
  },
};

export function getProductSEO(product: Product): SEOOptions {
  const discount = Math.round((1 - product.vraecoPrice / product.originalPrice) * 100);
  return {
    title: `Buy ${product.name} Online India — Best Price ₹${product.vraecoPrice} | VRAECO`,
    description: `${product.name} — Was ₹${product.originalPrice}, Now Only ₹${product.vraecoPrice} (${discount}% off). ${product.hookLine} Buy online at VRAECO. Free shipping. COD available. ${product.rating}★ from ${product.reviews.toLocaleString()}+ verified buyers.`,
    keywords: `buy ${product.name.toLowerCase().replace(/\s+/g, ' ')}, ${product.name.toLowerCase()} online india, best price ${product.name.toLowerCase()}, ${product.category.replace(/-/g, ' ')} ${product.name.toLowerCase().split(' ')[0]} india`
  };
}
