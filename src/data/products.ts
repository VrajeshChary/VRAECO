export type Category =
  | "kitchen-essentials"
  | "health-wellness"
  | "tech-productivity"
  | "home-decor"
  | "personal-care"
  | "fashion";

export interface Product {
  id: string;
  name: string;
  hookLine: string;
  category: Category;
  description: string;
  keyFeatures: string[];
  costPrice: number;
  amazonPriceMin: number;
  amazonPriceMax: number;
  flipkartPriceMin: number;
  flipkartPriceMax: number;
  vraecoPrice: number;
  originalPrice: number;
  sku: string;
  images: string[];
  emoji: string;
  badge: "hot" | "new" | "bestseller" | "trending";
  stockCount: number;
  reviews: number;
  rating: number;
  soldThisWeek: number;
  faq: { question: string; answer: string }[];
  videoUrl?: string;
}

export const categoryLabels: Record<Category, string> = {
  "kitchen-essentials": "Kitchen Essentials",
  "health-wellness": "Health & Wellness",
  "tech-productivity": "Tech & Productivity",
  "home-decor": "Home Decor",
  "personal-care": "Personal Care",
  fashion: "Fashion & Accessories",
};

export const products: Product[] = [
  {
    id: "fifa-world-cup-trophy-21cm",
    name: "FIFA World Cup Trophy 21cm | Premium Replica for True Fans",
    hookLine: "Bring the glory of the World Cup home.",
    category: "home-decor",
    description: "A premium 21cm replica of the iconic FIFA World Cup Trophy. Perfect for football fans, sports enthusiasts, and collectors. Makes a stunning centerpiece for your desk, shelf, or sports room. Built with high-quality materials and incredible attention to detail.",
    keyFeatures: [
      "21cm height — perfect display size",
      "Premium gold finish for authentic look",
      "Sturdy and durable build",
      "Perfect gift for football fans",
      "Great for sports room or office decor"
    ],
    costPrice: 800,
    amazonPriceMin: 2499,
    amazonPriceMax: 3999,
    flipkartPriceMin: 2299,
    flipkartPriceMax: 3499,
    vraecoPrice: 1999,
    originalPrice: 3999,
    sku: "VRA-SPO-01",
    images: [
      "/product-images/fifa-world-cup-trophy-21cm-hero.jpg",
      "/product-images/fifa-world-cup-trophy-21cm-lifestyle.jpg",
      "/product-images/fifa-world-cup-trophy-21cm-detail.jpg"
    ],
    emoji: "🏆",
    badge: "bestseller",
    stockCount: 50,
    reviews: 214,
    rating: 5,
    soldThisWeek: 89,
    faq: [
      { question: "Is it made of actual gold?", answer: "No, it is a high-quality replica with a premium gold finish." },
      { question: "Is it heavy?", answer: "It has a solid, premium weight to it, making it feel authentic." }
    ]
  },
  {
    id: "football-world-cup-trophy-keychain",
    name: "Football World Cup Trophy Keychain for Car Bike Keys Backpack Bag Hanging Accessory",
    hookLine: "Carry the champion's spirit wherever you go.",
    category: "fashion",
    description: "Show off your love for football with this stylish World Cup Trophy Keychain. Perfect for car keys, bike keys, backpacks, or as a bag hanging accessory. Made with eco-friendly PLA material, this keychain is both lightweight and highly durable. An excellent sustainable gift for any sports fan.",
    keyFeatures: [
      "Made with PLA — Biodegradable & Sustainable",
      "Eco-Friendly Product",
      "Lightweight & Durable construction",
      "Detailed miniature World Cup trophy design",
      "Perfect for car keys, bike keys, and backpacks"
    ],
    costPrice: 150,
    amazonPriceMin: 599,
    amazonPriceMax: 999,
    flipkartPriceMin: 499,
    flipkartPriceMax: 899,
    vraecoPrice: 499,
    originalPrice: 999,
    sku: "VRA-SPO-02",
    images: [
      "/product-images/football-world-cup-trophy-keychain-hero.jpg",
      "/product-images/football-world-cup-trophy-keychain-lifestyle.jpg",
      "/product-images/football-world-cup-trophy-keychain-detail.jpg"
    ],
    emoji: "🔑",
    badge: "new",
    stockCount: 120,
    reviews: 342,
    rating: 5,
    soldThisWeek: 156,
    faq: [
      { question: "Is the material eco-friendly?", answer: "Yes, it is made with PLA, making it biodegradable, sustainable, and eco-friendly." },
      { question: "Is it heavy on the keys?", answer: "No, its lightweight & durable design makes it perfectly balanced for everyday carry." }
    ]
  },
  // ===================== KITCHEN ESSENTIALS =====================
  {
    id: "veg-peeler-cutter",
    name: "Vegetable Peeler & Cutter 2-in-1 | Peel, Slice & Julienne in Seconds",
    hookLine: "Peel, slice, julienne — one tool, zero clutter.",
    category: "kitchen-essentials",
    description: "Struggling with knives that slip and peelers that leave peels everywhere? The 2-in-1 Veg Peeler & Cutter solves it all with a sharp stainless steel blade for peeling and a built-in julienne cutter. Lightweight, ergonomic grip, dishwasher-safe. Chop salad prep time by half.",
    keyFeatures: ["Sharp stainless steel blade for clean, effortless cuts", "Built-in julienne cutter for perfect vegetable strips", "Ergonomic anti-slip grip for comfortable handling", "Dishwasher safe for quick cleanup", "Compact design fits in any kitchen drawer"],
    costPrice: 90, amazonPriceMin: 150, amazonPriceMax: 299, flipkartPriceMin: 140, flipkartPriceMax: 349,
    vraecoPrice: 249, originalPrice: 499, sku: "VRA-KTN-01",
    images: ["/product-images/veg-peeler-cutter-hero.svg", "/product-images/veg-peeler-cutter-lifestyle.svg", "/product-images/veg-peeler-cutter-detail.svg"], emoji: "🔪", badge: "hot", stockCount: 23, reviews: 1847, rating: 5, soldThisWeek: 847,
    faq: [{ question: "Is the blade safe to handle?", answer: "Yes, the stainless steel blade has a protective guard to prevent accidental cuts during use." }, { question: "Can it go in the dishwasher?", answer: "Yes, top-rack dishwasher safe. Hand-washing recommended for longer blade life." }, { question: "What vegetables work best?", answer: "Works great on carrots, cucumbers, potatoes, zucchini, and most firm vegetables." }]
  },
  {
    id: "mini-chopper-450ml",
    name: "Compact Mini Chopper 450ml | Chop Onions in 3 Seconds — No Tears",
    hookLine: "Chop onions without tears in 3 seconds flat.",
    category: "kitchen-essentials",
    description: "Tired of crying every time you chop onions? This compact 450ml chopper with razor-sharp blades minces onions, garlic, and herbs in seconds. No electricity needed — just pull the cord. Perfect for Indian kitchens where onion and ginger-garlic paste are daily essentials.",
    keyFeatures: ["450ml capacity ideal for daily Indian cooking", "Sharp stainless steel blades for fine chop", "No electricity or batteries needed", "Easy pull-cord mechanism", "BPA-free food-grade plastic body", "Easy to clean — rinse under water"],
    costPrice: 110, amazonPriceMin: 180, amazonPriceMax: 399, flipkartPriceMin: 170, flipkartPriceMax: 449,
    vraecoPrice: 299, originalPrice: 599, sku: "VRA-KTN-02",
    images: ["/product-images/mini-chopper-450ml-hero.svg", "/product-images/mini-chopper-450ml-lifestyle.svg", "/product-images/mini-chopper-450ml-detail.svg"], emoji: "🧄", badge: "bestseller", stockCount: 18, reviews: 1247, rating: 5, soldThisWeek: 623,
    faq: [{ question: "Does it really work without electricity?", answer: "Yes, the pull-cord mechanism rotates the blades manually. Takes 3-4 pulls for perfect chop." }, { question: "Can it chop dry fruits?", answer: "Yes, it handles garlic, almonds, peanuts, and even ginger well." }, { question: "What is its capacity?", answer: "450ml — enough for 2-3 medium onions at once." }]
  },
  {
    id: "combo-chopper-1000ml",
    name: "Family Size Chopper 1000ml Pack | Double Capacity for Big Meals",
    hookLine: "Double the capacity, twice the convenience.",
    category: "kitchen-essentials",
    description: "Cooking for a family or hosting guests? The 1000ml combo chopper handles bulk chopping with ease. Includes a compact companion chopper for small tasks. Stainless steel blades handle vegetables, fruits, chutneys, and baby food effortlessly.",
    keyFeatures: ["1000ml large capacity for bulk prep", "Includes mini chopper for small portions", "Stainless steel blades for durability", "Perfect for chutneys, salads, salsas", "Non-slip base for safety", "Lightweight yet sturdy construction"],
    costPrice: 190, amazonPriceMin: 350, amazonPriceMax: 699, flipkartPriceMin: 320, flipkartPriceMax: 749,
    vraecoPrice: 499, originalPrice: 999, sku: "VRA-KTN-03",
    images: ["/product-images/combo-chopper-1000ml-hero.svg", "/product-images/combo-chopper-1000ml-lifestyle.svg", "/product-images/combo-chopper-1000ml-detail.svg"], emoji: "🥬", badge: "new", stockCount: 12, reviews: 892, rating: 5, soldThisWeek: 445,
    faq: [{ question: "What comes in this combo?", answer: "You get the main 1000ml chopper plus a compact mini chopper for smaller tasks." }, { question: "Is it good for making chutney?", answer: "Absolutely! Perfect for coconut chutney, green chutney, and garlic paste." }, { question: "Can elderly parents use it easily?", answer: "Yes, the pull mechanism is very light and easy to use for all ages." }]
  },
  {
    id: "push-chopper-handy",
    name: "Handy Push-Down Chopper | One Push Chop — No Pulling Needed",
    hookLine: "One push. Perfect chop. No electricity needed.",
    category: "kitchen-essentials",
    description: "Don't want to pull cords? This push-down chopper is even simpler — just press the top and blades do the work. 4 stainless steel blades mince onions, garlic, chilies, herbs in seconds. Great for quick tadka prep.",
    keyFeatures: ["Push-down mechanism — one hand operation", "4 stainless steel stainless blades for super fine chop", "Perfect for onion, garlic, chili, ginger", "Compact size — stores in any drawer", "No assembly required", "Easy to wash after use"],
    costPrice: 160, amazonPriceMin: 250, amazonPriceMax: 499, flipkartPriceMin: 230, flipkartPriceMax: 549,
    vraecoPrice: 399, originalPrice: 799, sku: "VRA-KTN-04",
    images: ["/product-images/push-chopper-handy-hero.svg", "/product-images/push-chopper-handy-lifestyle.svg", "/product-images/push-chopper-handy-detail.svg"], emoji: "🧅", badge: "hot", stockCount: 15, reviews: 967, rating: 5, soldThisWeek: 534,
    faq: [{ question: "How is this different from the pull chopper?", answer: "This one uses a push-down mechanism instead of a pull cord — even easier for quick tasks." }, { question: "How finely does it chop?", answer: "Very finely — perfect for onion-tomato-garlic mix for tadka." }, { question: "Is it durable?", answer: "Yes, built with quality plastic and stainless steel blades." }]
  },
  {
    id: "chopper-masher-combo",
    name: "Chopper + Masher Kitchen Combo | Your Countertop Power Couple",
    hookLine: "Chop AND mash — your countertop's power couple.",
    category: "kitchen-essentials",
    description: "Why buy two separate tools? This combo gives you a push chopper and a wooden potato masher — the two most-used tools in Indian kitchens. Make dal, mash boiled potatoes, chop onions — all with one set.",
    keyFeatures: ["Push chopper + wooden potato masher combo", "Stainless steel 5-blade cutter with peeler", "Wooden masher — gentle on cookware", "Perfect for dal, mashed potatoes, chutneys", "Space-saving 2-in-1 design"],
    costPrice: 215, amazonPriceMin: 390, amazonPriceMax: 799, flipkartPriceMin: 370, flipkartPriceMax: 849,
    vraecoPrice: 549, originalPrice: 1099, sku: "VRA-KTN-05",
    images: ["/product-images/chopper-masher-combo-hero.svg", "/product-images/chopper-masher-combo-lifestyle.svg", "/product-images/chopper-masher-combo-detail.svg"], emoji: "🥔", badge: "bestseller", stockCount: 9, reviews: 756, rating: 5, soldThisWeek: 378,
    faq: [{ question: "What exactly is included?", answer: "A push-down chopper and a wooden potato masher — both kitchen must-haves." }, { question: "Is the masher good for dal?", answer: "Yes, wooden mashers are perfect for dal without scratching your kadhai." }, { question: "Is the chopper large enough for daily use?", answer: "Yes, comfortably chops 2-3 medium onions or a bowl of chutney at a time." }]
  },
  {
    id: "high-speed-push-chopper",
    name: "High Speed Push Chopper Pro | Turbo Kitchen Prep",
    hookLine: "Turbo charge your kitchen prep.",
    category: "kitchen-essentials",
    description: "The upgraded version with sharper blades and faster chopping action. High-speed push mechanism handles tougher vegetables with less effort. Perfect for bulk meal prep and daily cooking.",
    keyFeatures: ["High-speed blade rotation for faster chopping", "Enhanced blade design for tougher vegetables", "Ergonomic push handle reduces hand fatigue", "Transparent body — see your chopped ingredients", "Non-slip rubber base for stability"],
    costPrice: 180, amazonPriceMin: 280, amazonPriceMax: 549, flipkartPriceMin: 260, flipkartPriceMax: 599,
    vraecoPrice: 449, originalPrice: 899, sku: "VRA-KTN-06",
    images: ["/product-images/high-speed-push-chopper-hero.svg", "/product-images/high-speed-push-chopper-lifestyle.svg", "/product-images/high-speed-push-chopper-detail.svg"], emoji: "🌶️", badge: "new", stockCount: 14, reviews: 567, rating: 4, soldThisWeek: 289,
    faq: [{ question: "What makes this different from the regular push chopper?", answer: "Sharper blades and a high-speed mechanism that chops 30% faster with less effort." }, { question: "Can it handle green chilies?", answer: "Yes, finely chops chilies, ginger, and even lemongrass." }]
  },
  {
    id: "manual-whisk-blender",
    name: "Manual Hand-Whisk Blender | Whisk, Blend, Froth — Hands-On Perfection",
    hookLine: "Whisk, blend, froth — hands-on perfection.",
    category: "kitchen-essentials",
    description: "No electricity? No problem. This manual whisk blender handles eggs, cream, lassi, and milkshakes with a simple up-down motion. Great for quick batters, chai froth, and smoothies.",
    keyFeatures: ["Up-down push-motion whisking action", "Perfect for eggs, cream, lassi, milkshakes", "Stainless steel whisk head", "Ergonomic comfortable grip", "No batteries or electricity needed", "Compact and portable"],
    costPrice: 90, amazonPriceMin: 140, amazonPriceMax: 299, flipkartPriceMin: 130, flipkartPriceMax: 329,
    vraecoPrice: 229, originalPrice: 459, sku: "VRA-KTN-07",
    images: ["/product-images/manual-whisk-blender-hero.svg", "/product-images/manual-whisk-blender-lifestyle.svg", "/product-images/manual-whisk-blender-detail.svg"], emoji: "🥄", badge: "bestseller", stockCount: 31, reviews: 1345, rating: 5, soldThisWeek: 678,
    faq: [{ question: "Does it really work without power?", answer: "Yes! The push-down mechanism spins the whisk head rapidly — perfect for eggs and cream." }, { question: "Can it make chai froth?", answer: "Absolutely — creates a nice frothy layer for cutting chai in seconds." }]
  },
  {
    id: "hand-blender",
    name: "Multi-Purpose Hand Blender | Smoothies, Soups, Sauces — One Hero Tool",
    hookLine: "Smoothies, soups, sauces — one hand-held hero.",
    category: "kitchen-essentials",
    description: "A versatile free hand blender that works without electricity. Perfect for making quick batters, churning butter from cream, mixing lassi, and blending soups. The multi-purpose design handles everything.",
    keyFeatures: ["Works without electricity or batteries", "Multi-purpose: batter, lassi, soup, churning", "Stainless steel whisk/churner head", "Comfortable ergonomic handle", "Easy to clean under running water", "Lightweight for daily use"],
    costPrice: 100, amazonPriceMin: 160, amazonPriceMax: 349, flipkartPriceMin: 150, flipkartPriceMax: 379,
    vraecoPrice: 269, originalPrice: 549, sku: "VRA-KTN-08",
    images: ["/product-images/hand-blender-hero.svg", "/product-images/hand-blender-lifestyle.svg", "/product-images/hand-blender-detail.svg"], emoji: "🫗", badge: "hot", stockCount: 27, reviews: 1123, rating: 5, soldThisWeek: 567,
    faq: [{ question: "Is this fully manual?", answer: "Yes, uses a push-pull mechanism — no plug or batteries needed." }, { question: "Can it churn butter from cream?", answer: "Yes! Works well for making makhan (butter) from fresh cream." }]
  },
  {
    id: "electric-coffee-frother",
    name: "Electric Coffee Frother & Mixer | Cafe Latte at Home in 15 Seconds",
    hookLine: "Cafe-style froth at home in 15 seconds.",
    category: "kitchen-essentials",
    description: "Turn your morning coffee into a cafe experience. This rechargeable electric frother creates rich, creamy microfoam for lattes, cappuccinos, and matcha in just 15 seconds. USB-rechargeable with a sleek stand.",
    keyFeatures: ["USB rechargeable — no batteries needed", "Creates rich microfoam in 15 seconds", "Works with latte, cappuccino, matcha, hot chocolate", "Includes elegant stand for counter display", "Whisper-quiet motor", "Waterproof head for easy rinsing"],
    costPrice: 165, amazonPriceMin: 250, amazonPriceMax: 599, flipkartPriceMin: 230, flipkartPriceMax: 649,
    vraecoPrice: 399, originalPrice: 799, sku: "VRA-KTN-09",
    images: ["/product-images/electric-coffee-frother-hero.svg", "/product-images/electric-coffee-frother-lifestyle.svg", "/product-images/electric-coffee-frother-detail.svg"], emoji: "☕", badge: "new", stockCount: 20, reviews: 789, rating: 5, soldThisWeek: 412,
    faq: [{ question: "How long does a charge last?", answer: "About 30-40 uses on a single charge. USB charging takes about 1-2 hours." }, { question: "Does it work with cold milk?", answer: "Yes, works with both hot and cold milk — perfect for iced lattes too." }]
  },

  // ===================== HEALTH & WELLNESS =====================
  {
    id: "posture-corrector-belt",
    name: "Posture Corrector Belt | Stand Tall — Fix Years of Bad Posture from Day One",
    hookLine: "Stand tall. Feel the difference from day one.",
    category: "health-wellness",
    description: "Hours at a desk are wrecking your posture. This adjustable belt gently pulls your shoulders back, training your muscles to hold the right position. Wear it 30 minutes daily and notice straighter posture, less neck pain, and more confidence within weeks.",
    keyFeatures: ["Invisible under clothes", "Adjustable straps for perfect fit", "Breathable comfortable material", "Unisex design for men and women", "Recommended 30 min daily use", "Lightweight — only 180g"],
    costPrice: 115, amazonPriceMin: 199, amazonPriceMax: 499, flipkartPriceMin: 180, flipkartPriceMax: 549,
    vraecoPrice: 299, originalPrice: 599, sku: "VRA-HLT-01",
    images: ["/product-images/posture-corrector-belt-hero.svg", "/product-images/posture-corrector-belt-lifestyle.svg", "/product-images/posture-corrector-belt-detail.svg"], emoji: "💪", badge: "bestseller", stockCount: 35, reviews: 1089, rating: 5, soldThisWeek: 545,
    faq: [{ question: "Can I wear it under my shirt?", answer: "Yes, it is designed to be slim and invisible under regular clothing." }, { question: "How long should I wear it daily?", answer: "Start with 30 minutes and gradually increase. Your muscles will naturally improve." }, { question: "Does it work for back pain too?", answer: "Many users report reduced upper back and neck pain from improved posture alignment." }]
  },
  {
    id: "acupressure-slippers",
    name: "Relieve Foot Pain in Minutes | Acupressure Therapy Slippers for Total Body Relaxation",
    hookLine: "Feel like a foot massage with every step.",
    category: "health-wellness",
    description: "Based on ancient acupressure principles, these slippers target 60+ pressure points on your soles. Just wear them indoors for 15-20 minutes daily — reduces foot pain, improves circulation, relieves stress, and promotes better sleep. Like a reflexology session at home.",
    keyFeatures: ["Targets 60+ acupressure points on feet", "Improves blood circulation", "Reduces foot pain, heel pain, and plantar fasciitis", "Promotes better sleep quality", "Magnetic therapy nodes for added benefit", "Unisex — fits size 3-9"],
    costPrice: 120, amazonPriceMin: 220, amazonPriceMax: 499, flipkartPriceMin: 200, flipkartPriceMax: 549,
    vraecoPrice: 329, originalPrice: 649, sku: "VRA-HLT-02",
    images: ["/product-images/acupressure-slippers-hero.svg", "/product-images/acupressure-slippers-lifestyle.svg", "/product-images/acupressure-slippers-detail.svg"], emoji: "🩰", badge: "hot", stockCount: 19, reviews: 934, rating: 4, soldThisWeek: 467,
    faq: [{ question: "How long should I wear them daily?", answer: "Start with 10-15 minutes and work up to 20-30 minutes for best results." }, { question: "Do they come with magnets?", answer: "Yes, each slipper has magnetic nodes that complement the acupressure points." }, { question: "Are they comfortable for beginners?", answer: "They feel intense at first but your feet adjust within a few uses." }]
  },
  {
    id: "ice-roller-jade-combo",
    name: "Ice Roller + Jade Roller Combo | De-Puff Face in 5 Minutes — Glass Skin Secret",
    hookLine: "De-puff, depolarize, de-stress — your 5-minute face glow ritual.",
    category: "health-wellness",
    description: "Ice roller reduces puffiness, tightens pores, and calms inflammation. Jade roller boosts circulation, reduces fine lines, and enhances product absorption. Together they are the ultimate skincare combo used by dermatologists and K-beauty enthusiasts.",
    keyFeatures: ["Silicone ice roller — reusable, hygienic, no messy ice", "Natural jade stone roller for facial massage", "Gua sha stone included for neck/jaw sculpting", "Reduces puffiness, dark circles, and acne swelling", "Enhances serum and moisturizer absorption", "Gift-ready elegant packaging"],
    costPrice: 200, amazonPriceMin: 350, amazonPriceMax: 799, flipkartPriceMin: 320, flipkartPriceMax: 849,
    vraecoPrice: 499, originalPrice: 999, sku: "VRA-HLT-03",
    images: ["/product-images/ice-roller-jade-combo-hero.svg", "/product-images/ice-roller-jade-combo-lifestyle.svg", "/product-images/ice-roller-jade-combo-detail.svg"], emoji: "✨", badge: "trending", stockCount: 11, reviews: 756, rating: 5, soldThisWeek: 389,
    faq: [{ question: "How do I prepare the ice roller?", answer: "Freeze it for 2-3 hours before use. One freeze lasts 15-20 minutes of rolling." }, { question: "In which order should I use both rollers?", answer: "Use ice roller first (morning for de-puffing), then jade roller with your serum or moisturizer." }, { question: "Is the jade stone natural?", answer: "Yes, authentic natural jade stone — not a plastic imitation." }]
  },
  {
    id: "hair-gloss-serum",
    name: "Hair Gloss Serum for Smooth Shine | Frizz-Free Glass Hair in 10 Seconds",
    hookLine: "Transform frizzy hair to salon-smooth gloss without the salon price.",
    category: "health-wellness",
    description: "Frizzy, dull hair ruining your look? This lightweight, non-sticky gloss serum coats each hair shaft with a smooth shine finish. Works on all hair types — straight, wavy, curly. Just 2 drops and you are ready.",
    keyFeatures: ["Lightweight non-sticky formula", "Works on all hair types", "Adds instant glass-hair shine", "Reduces frizz and flyaways", "Heat protection up to 200°C", "Pack of 2 x 30ml bottles"],
    costPrice: 85, amazonPriceMin: 150, amazonPriceMax: 399, flipkartPriceMin: 140, flipkartPriceMax: 449,
    vraecoPrice: 249, originalPrice: 499, sku: "VRA-HLT-04",
    images: ["/product-images/hair-gloss-serum-hero.svg", "/product-images/hair-gloss-serum-lifestyle.svg", "/product-images/hair-gloss-serum-detail.svg"], emoji: "💇", badge: "new", stockCount: 24, reviews: 567, rating: 4, soldThisWeek: 298,
    faq: [{ question: "How many drops should I use?", answer: "2-3 drops for medium hair, 4-5 for long or thick hair. Less is more." }, { question: "Does it make hair greasy?", answer: "No, the formula is specifically designed to be lightweight and non-greasy." }]
  },

  // ===================== TECH & PRODUCTIVITY =====================
  {
    id: "magnetic-phone-stand",
    name: "360° Magnetic Phone Stand | Shoot Reels Hands-Free — Anywhere, Anytime",
    hookLine: "Mount, shoot, go viral — your pocket studio.",
    category: "tech-productivity",
    description: "Need to shoot reels without holding your phone? This 360° magnetic stand snaps to any surface — desk, fridge, mirror — giving you the perfect angle for content creation, video calls, or hands-free navigation. Strong N52 magnets hold your phone secure even in a car.",
    keyFeatures: ["360° rotation for any angle", "Strong magnetic grip — holds phone securely", "Works on desk, wall, car dashboard, fridge", "Ultra-compact — fits in your pocket", "Compatible with MagSafe and magnetic cases", "Perfect for reels, video calls, recipes"],
    costPrice: 130, amazonPriceMin: 220, amazonPriceMax: 499, flipkartPriceMin: 200, flipkartPriceMax: 549,
    vraecoPrice: 329, originalPrice: 649, sku: "VRA-TCH-01",
    images: ["/product-images/magnetic-phone-stand-hero.svg", "/product-images/magnetic-phone-stand-lifestyle.svg", "/product-images/magnetic-phone-stand-detail.svg"], emoji: "🧲", badge: "trending", stockCount: 16, reviews: 678, rating: 5, soldThisWeek: 345,
    faq: [{ question: "Will it hold my phone with a case?", answer: "Yes, works with most cases. If your case is very thick, we include a thin metal plate to stick on it." }, { question: "Does it work in a car?", answer: "Yes, many users use it as a car phone mount. Magnets are strong enough for bumpy roads." }, { question: "Can I rotate it horizontally and vertically?", answer: "360° rotation in both portrait and landscape mode." }]
  },
  {
    id: "laptop-stand",
    name: "Adjustable Laptop Stand | Stop Neck Pain — Ergonomic WFH Setup in Seconds",
    hookLine: "Raise your laptop, save your neck, boost your productivity.",
    category: "tech-productivity",
    description: "Hunched over your laptop for hours? This adjustable aluminum stand raises your screen to eye level, improving posture and reducing neck and back pain instantly. Foldable, ventilated, and fits 10-15.6 inch laptops. The single best upgrade for any workspace.",
    keyFeatures: ["6-level adjustable height and angle", "Aluminum build for heat dissipation", "Folds flat for easy carrying", "Fits 10-15.6 inch laptops and tablets", "Anti-slip silicone padding", "Supports up to 8kg weight"],
    costPrice: 280, amazonPriceMin: 500, amazonPriceMax: 999, flipkartPriceMin: 450, flipkartPriceMax: 1099,
    vraecoPrice: 649, originalPrice: 1299, sku: "VRA-TCH-02",
    images: ["/product-images/laptop-stand-hero.svg", "/product-images/laptop-stand-lifestyle.svg", "/product-images/laptop-stand-detail.svg"], emoji: "💻", badge: "hot", stockCount: 10, reviews: 567, rating: 5, soldThisWeek: 289,
    faq: [{ question: "Will it fit my MacBook Air?", answer: "Yes, fits all laptops from 10 to 15.6 inches including MacBook Air and Pro." }, { question: "Is it stable while typing?", answer: "Yes, the anti-slip pads and sturdy aluminum design keep it rock-solid." }, { question: "Can I use it standing at a counter?", answer: "At the highest setting it raises the laptop about 6 inches — good for elevated desk use." }]
  },
  {
    id: "neck-fan",
    name: "Bladeless Neck Fan 360° Cooling | Hands-Free Relief from Indian Summer",
    hookLine: "Personal AC that goes wherever you go.",
    category: "tech-productivity",
    description: "Indian summers are brutal. This bladeless neck fan wraps around your neck with 360° cooling, whisper-quiet operation, and 3 speed settings. Rechargeable USB-C gives 4-8 hours of cooling. Perfect for commuting, cooking, workouts, or outdoor work.",
    keyFeatures: ["360° airflow around your neck", "3 speed settings for comfort levels", "Bladeless — safe and hair-friendly", "USB-C rechargeable, 4-8 hours battery", "Whisper-quiet motor — 25dB", "Lightweight design for all-day wear"],
    costPrice: 200, amazonPriceMin: 350, amazonPriceMax: 799, flipkartPriceMin: 320, flipkartPriceMax: 849,
    vraecoPrice: 499, originalPrice: 999, sku: "VRA-TCH-03",
    images: ["/product-images/neck-fan-hero.svg", "/product-images/neck-fan-lifestyle.svg", "/product-images/neck-fan-detail.svg"], emoji: "🌀", badge: "new", stockCount: 21, reviews: 723, rating: 5, soldThisWeek: 389,
    faq: [{ question: "How long does the battery last?", answer: "4-8 hours depending on speed. Speed 1 gives ~8 hours, Speed 3 gives ~4 hours." }, { question: "Is it loud?", answer: "No, only 25dB — quieter than a whisper. Perfect for office use." }, { question: "Is it safe around hair?", answer: "Yes, bladeless design means no hair entanglement risk." }]
  },

  // ===================== KITCHEN ADDITIONAL PRODUCTS =====================
  {
    id: "silicone-stretch-lids",
    name: "Silicone Stretch Lids (6 Pack) | No More Cling Film — Perfect Seal Every Time",
    hookLine: "No more messy cling film. These lids stretch to fit anything perfectly.",
    category: "kitchen-essentials",
    description: "Still wasting money on cling film that never works right? These reusable silicone lids stretch to seal any bowl, pot, cup, or container — round, square, or oval. Airtight, leakproof, BPA-free, and dishwasher safe. One set replaces 100 rolls of cling film.",
    keyFeatures: ["Universal stretch-to-fit — works on any shape", "6 lids in various sizes (2.5 to 8.3 inches)", "100% BPA-free food-grade silicone", "Airtight seal keeps food fresh longer", "Dishwasher and microwave safe", "Eco-friendly — replace cling film forever"],
    costPrice: 100, amazonPriceMin: 180, amazonPriceMax: 399, flipkartPriceMin: 160, flipkartPriceMax: 449,
    vraecoPrice: 249, originalPrice: 499, sku: "VRA-KTN-10",
    images: ["/product-images/silicone-stretch-lids-hero.svg", "/product-images/silicone-stretch-lids-lifestyle.svg", "/product-images/silicone-stretch-lids-detail.svg"], emoji: "🥣", badge: "hot", stockCount: 25, reviews: 890, rating: 4, soldThisWeek: 456,
    faq: [{ question: "Do they really fit different shapes?", answer: "Yes, the silicone stretches over round, square, and oval containers." }, { question: "How many sizes come in the pack?", answer: "6 different sizes covering containers from 2.5 to 8.3 inches." }, { question: "Are they safe for microwave?", answer: "Yes, heat-safe up to 230°C. Just don't stretch tightly for microwave use." }]
  },
  {
    id: "magnetic-cord-organizer",
    name: "Magnetic Cord Organizer Pack | No More Messy Cables — Tidy Desk in 10 Seconds",
    hookLine: "Tame the cable chaos — your desk will finally look clean.",
    category: "tech-productivity",
    description: "Cables everywhere — phone charger falling, earphone tangled, laptop cord dangling? These magnetic cord organizers stick to any surface and hold your cables neatly in place. Snap cables in or out with one hand. Instant desk makeover.",
    keyFeatures: ["Magnetic base — sticks to any metal surface", "8-pack for complete cable coverage", "Holds all cable types — USB, lightning, HDMI", "Self-adhesive for non-metal surfaces too", "One-hand cable snap in/out", "Durable silicone material"],
    costPrice: 60, amazonPriceMin: 120, amazonPriceMax: 299, flipkartPriceMin: 110, flipkartPriceMax: 349,
    vraecoPrice: 179, originalPrice: 359, sku: "VRA-TCH-04",
    images: ["/product-images/magnetic-cord-organizer-hero.svg", "/product-images/magnetic-cord-organizer-lifestyle.svg", "/product-images/magnetic-cord-organizer-detail.svg"], emoji: "🔌", badge: "trending", stockCount: 42, reviews: 534, rating: 5, soldThisWeek: 312,
    faq: [{ question: "Will the adhesive damage the wall?", answer: "No, the adhesive backing removes cleanly from most smooth surfaces." }, { question: "Does it hold thick charging cables?", answer: "Yes, works with thick USB-C, lightning, and even power cables." }, { question: "How many cables does one organizer hold?", answer: "Each clip holds 1 cable snugly or 2 thin cables side by side." }]
  },
  {
    id: "food-storage-containers",
    name: "Food Storage Containers Set (6 Pack) | Keep Veggies Fresh 3X Longer — Fridge Essential",
    hookLine: "No more spoiled food. Keep fruits, veggies, and leftovers fresh for days.",
    category: "kitchen-essentials",
    description: "Tired of finding spoiled veggies in the back of the fridge? These stackable storage containers with drain plates keep food fresh 3x longer. Built-in drainage prevents sogginess. Transparent design lets you see contents without opening. Perfect for meal prep.",
    keyFeatures: ["6 containers with removable drain plates", "Stackable design saves fridge space", "Transparent — see contents instantly", "Airtight lids keep food fresh 3x longer", "BPA-free food-grade plastic", "Perfect for fish, meat, vegetables, fruits"],
    costPrice: 180, amazonPriceMin: 300, amazonPriceMax: 699, flipkartPriceMin: 280, flipkartPriceMax: 749,
    vraecoPrice: 399, originalPrice: 799, sku: "VRA-KTN-11",
    images: ["/product-images/food-storage-containers-hero.svg", "/product-images/food-storage-containers-lifestyle.svg", "/product-images/food-storage-containers-detail.svg"], emoji: "🍱", badge: "new", stockCount: 17, reviews: 423, rating: 4, soldThisWeek: 234,
    faq: [{ question: "What are the drain plates for?", answer: "They collect excess moisture from food, preventing sogginess and extending freshness." }, { question: "Can I use these in the freezer?", answer: "Yes, freezer-safe for storing meat, fish, and frozen vegetables." }, { question: "How many containers in the set?", answer: "6 containers, each 1500ml capacity." }]
  },
  {
    id: "kitchen-storage-rack",
    name: "2-Tier Kitchen Storage Rack | Double Your Counter Space — Organize Everything",
    hookLine: "Cluttered kitchen counter? This shelf doubles your usable space instantly.",
    category: "kitchen-essentials",
    description: "Counter completely taken over by spice jars, jars, and appliances? This sleek 2-tier stainless steel rack instantly doubles your storage. Put spices on top, oils below. Or plates up, bowls down. Sturdy metal build holds up to 15kg. Fits in any kitchen corner.",
    keyFeatures: ["2-tier design doubles storage", "Stainless steel — rust-proof and sturdy", "Holds up to 15kg total weight", "Works for spices, plates, bottles, cosmetics", "Non-slip feet for stability", "Easy assembly — no tools needed"],
    costPrice: 170, amazonPriceMin: 280, amazonPriceMax: 549, flipkartPriceMin: 260, flipkartPriceMax: 599,
    vraecoPrice: 379, originalPrice: 749, sku: "VRA-KTN-12",
    images: ["/product-images/kitchen-storage-rack-hero.svg", "/product-images/kitchen-storage-rack-lifestyle.svg", "/product-images/kitchen-storage-rack-detail.svg"], emoji: "🏠", badge: "bestseller", stockCount: 22, reviews: 678, rating: 4, soldThisWeek: 345,
    faq: [{ question: "What material is it made of?", answer: "Mild steel with a durable powder-coated finish. Rust-resistant." }, { question: "Does it need assembly?", answer: "Minimal — just snap the legs onto the shelves. No tools needed." }, { question: "Can I use it outside the kitchen?", answer: "Yes, great for cosmetics, bathroom items, or living room decor too." }]
  },
  {
    id: "revolving-spice-rack",
    name: "Revolving Spice Rack 16-in-1 | Grab Any Spice in 1 Second — Turntable Magic",
    hookLine: "16 spices, 1 spin — your kitchen just went Michelin-star.",
    category: "kitchen-essentials",
    description: "Digging through 12 jars every time you need cumin? This 16-container revolving spice rack spins effortlessly. See all your spices at a glance, grab the right one in 1 second. Clear containers with shaker lids. Looks beautiful on your counter too.",
    keyFeatures: ["16 airtight spice containers included", "Smooth 360° turntable rotation", "Clear containers — see spice levels", "Includes shaker and pourer lids", "Non-slip base", "Fits standard Indian spice sizes"],
    costPrice: 350, amazonPriceMin: 550, amazonPriceMax: 999, flipkartPriceMin: 500, flipkartPriceMax: 1099,
    vraecoPrice: 699, originalPrice: 1399, sku: "VRA-KTN-13",
    images: ["/product-images/revolving-spice-rack-hero.svg", "/product-images/revolving-spice-rack-lifestyle.svg", "/product-images/revolving-spice-rack-detail.svg"], emoji: "🌿", badge: "trending", stockCount: 7, reviews: 345, rating: 5, soldThisWeek: 189,
    faq: [{ question: "Are the spice jars included?", answer: "Yes, 16 clear containers with lids are included." }, { question: "Does it spin smoothly?", answer: "Yes, the turntable base rotates 360° even when fully loaded." }, { question: "Can I label the jars?", answer: "Yes, smooth surface area on each jar for label stickers." }]
  },

  // ===================== HOME DECOR =====================
  {
    id: "crystal-ball-lamp",
    name: "3D Crystal Ball Night Lamp | Hold a Galaxy in Your Palm — Stunning Gift",
    hookLine: "Hold a galaxy in the palm of your hand.",
    category: "home-decor",
    description: "Transform any room into an enchanting space with this 3D crystal ball lamp. Precision laser-engraved patterns inside crystal create a mesmerizing holographic effect when the LED base lights up. Comes with a wooden base and colorful LED. The perfect gift for someone who has everything.",
    keyFeatures: ["Precision 3D laser engraving inside crystal", "Colorful LED wooden base", "4-inch diameter — perfect desk size", "USB powered — works day or night", "Comes in beautiful gift packaging", "Doubles as paperweight when off"],
    costPrice: 325, amazonPriceMin: 550, amazonPriceMax: 999, flipkartPriceMin: 500, flipkartPriceMax: 1099,
    vraecoPrice: 799, originalPrice: 1599, sku: "VRA-HD-01",
    images: ["/product-images/crystal-ball-lamp-hero.svg", "/product-images/crystal-ball-lamp-lifestyle.svg", "/product-images/crystal-ball-lamp-detail.svg"], emoji: "🔮", badge: "bestseller", stockCount: 8, reviews: 567, rating: 5, soldThisWeek: 289,
    faq: [{ question: "Can I customize the engraving?", answer: "This comes with a pre-designed pattern. Contact us for custom engraving options." }, { question: "How is it powered?", answer: "USB powered. The LED base connects to any USB port or adapter." }, { question: "Is it fragile?", answer: "The crystal is sturdy K9 crystal — not glass. Handle with care but it is resilient." }]
  },
  {
    id: "ocean-wave-projector",
    name: "Ocean Wave Projector Lamp | Bring the Ocean's Calm to Your Ceiling",
    hookLine: "Fall asleep to ocean waves — right in your bedroom.",
    category: "home-decor",
    description: "Can't sleep because your mind won't quiet down? This ocean wave projector casts realistic, moving ocean waves across your walls and ceiling. Creates an instant calming atmosphere. Remote-controlled with adjustable speed, brightness, and color. Therapeutic for kids and adults.",
    keyFeatures: ["Realistic moving ocean wave projection", "Remote control included", "Adjustable speed, brightness, and colors", "Timer function — auto shut-off", "Whisper-quiet operation", "Perfect for bedrooms, meditation rooms, nurseries"],
    costPrice: 275, amazonPriceMin: 450, amazonPriceMax: 899, flipkartPriceMin: 420, flipkartPriceMax: 949,
    vraecoPrice: 649, originalPrice: 1299, sku: "VRA-HD-02",
    images: ["/product-images/ocean-wave-projector-hero.svg", "/product-images/ocean-wave-projector-lifestyle.svg", "/product-images/ocean-wave-projector-detail.svg"], emoji: "🌊", badge: "hot", stockCount: 11, reviews: 456, rating: 5, soldThisWeek: 234,
    faq: [{ question: "How large is the projection area?", answer: "Covers a full room ceiling and walls — up to 20 sq meters from optimal distance." }, { question: "Does it need batteries?", answer: "Plug-in powered via USB. Remote uses 2 CR2025 batteries (included)." }, { question: "Does it make any noise?", answer: "Completely silent. The motor is whisper-quiet." }]
  },
  {
    id: "star-night-projector",
    name: "Star Night Sky Projector | Turn Any Room Into a Planetarium in Seconds",
    hookLine: "Sleep under the stars without leaving your bed.",
    category: "home-decor",
    description: "Transform your ceiling into a starry night sky. This projector casts hundreds of stars and nebula clouds across your room. 10 color options, rotating effect, and Bluetooth music sync. Kids love it, adults find it therapeutic. The ultimate bedtime upgrade.",
    keyFeatures: ["Realistic star field with nebula effects", "10 color modes and combinations", "Rotate function for dynamic sky effect", "Bluetooth speaker built-in", "Timer and remote control", "Perfect for kids' rooms and date nights"],
    costPrice: 375, amazonPriceMin: 600, amazonPriceMax: 1199, flipkartPriceMin: 550, flipkartPriceMax: 1299,
    vraecoPrice: 899, originalPrice: 1799, sku: "VRA-HD-03",
    images: ["/product-images/star-night-projector-hero.svg", "/product-images/star-night-projector-lifestyle.svg", "/product-images/star-night-projector-detail.svg"], emoji: "⭐", badge: "new", stockCount: 6, reviews: 389, rating: 5, soldThisWeek: 198,
    faq: [{ question: "Does it play music?", answer: "Yes, it has a built-in Bluetooth speaker so you can play music while the stars project." }, { question: "Is it suitable for toddlers?", answer: "Perfect! Very calming for kids. The dimmest setting is ideal for bedtime." }, { question: "How do I change the colors?", answer: "Use the included remote control to cycle through 10 color options." }]
  },
  {
    id: "panda-night-lamp",
    name: "Panda Silicone Night Lamp | The Cutest Bedtime Buddy Your Kid Will Love",
    hookLine: "The cutest bedtime companion — soft glow for sweet dreams.",
    category: "home-decor",
    description: "Your child scared of the dark? This adorable panda night lamp gives just enough soft, warm glow to feel safe without disrupting sleep. Squish the panda to change colors — 8 soothing colors. Made from soft, safe silicone kids love to touch. USB rechargeable.",
    keyFeatures: ["8 color-changing modes with tap control", "Soft, safe silicone — kid-friendly", "Rechargeable battery — lasts all night", "Warm, sleep-friendly light intensity", "Adorable panda design", "Perfect gift for kids' birthdays"],
    costPrice: 135, amazonPriceMin: 220, amazonPriceMax: 499, flipkartPriceMin: 200, flipkartPriceMax: 549,
    vraecoPrice: 349, originalPrice: 699, sku: "VRA-HD-04",
    images: ["/product-images/panda-night-lamp-hero.svg", "/product-images/panda-night-lamp-lifestyle.svg", "/product-images/panda-night-lamp-detail.svg"], emoji: "🐼", badge: "hot", stockCount: 22, reviews: 678, rating: 5, soldThisWeek: 345,
    faq: [{ question: "How do you change the color?", answer: "Tap the top of the panda gently to cycle through the 8 colors." }, { question: "How long does the battery last?", answer: "Up to 8-12 hours on lowest brightness. Charges via USB." }, { question: "Is it safe for babies?", answer: "Yes, soft food-grade silicone — safe for kids of all ages." }]
  },
  {
    id: "rope-led-lights",
    name: "3M Rope LED Strip Lights | Fairy-Light Your Balcony, Room, or Diwali Decor",
    hookLine: "Transform any boring wall into a magical Instagram backdrop.",
    category: "home-decor",
    description: "Your room feels dull? This 3-meter rope LED wraps around walls, mirrors, balconies, and beds to create the most magical ambient lighting. Warm white glow with 8 flashing modes. Waterproof for outdoor use. The easiest room makeover in 5 minutes.",
    keyFeatures: ["3-meter flexible rope length", "8 lighting modes including steady and twinkling", "Waterproof for balcony/outdoor use", "Easy peel-and-stick installation", "Low power — barely impacts electricity bill", "DIY-friendly — cuttable design"],
    costPrice: 80, amazonPriceMin: 150, amazonPriceMax: 349, flipkartPriceMin: 130, flipkartPriceMax: 399,
    vraecoPrice: 229, originalPrice: 449, sku: "VRA-HD-05",
    images: ["/product-images/rope-led-lights-hero.svg", "/product-images/rope-led-lights-lifestyle.svg", "/product-images/rope-led-lights-detail.svg"], emoji: "💡", badge: "trending", stockCount: 38, reviews: 890, rating: 4, soldThisWeek: 478,
    faq: [{ question: "Can I install it myself?", answer: "Yes, peel-and-stick adhesive backing makes it a 5-minute DIY job." }, { question: "Does it work in rain?", answer: "Yes, the waterproof coating handles rain and humidity." }, { question: "Can I cut it to a shorter length?", answer: "Yes, there are marked cutting points along the rope." }]
  },

  // ===================== PERSONAL CARE =====================
  {
    id: "bamboo-toothbrush",
    name: "Bamboo Toothbrush Pack (5) | Eco-Friendly Smile — Ditch Plastic Forever",
    hookLine: "Save your teeth AND the planet — 5 brushes, zero plastic.",
    category: "personal-care",
    description: "Still using a plastic toothbrush that won't decompose for 400 years? Switch to these eco-friendly bamboo toothbrushes with activated charcoal bristles. Naturally antibacterial, gentle on gums, and fully compostable. A pack of 5 lasts your whole family 6 months.",
    keyFeatures: ["100% natural biodegradable bamboo handle", "Activated charcoal bristles — naturally whitening", "Soft bristles — gentle on gums", "Antibacterial bamboo properties", "Pack of 5 — 6-month family supply", "Eco-friendly packaging"],
    costPrice: 60, amazonPriceMin: 120, amazonPriceMax: 299, flipkartPriceMin: 110, flipkartPriceMax: 329,
    vraecoPrice: 179, originalPrice: 359, sku: "VRA-PC-01",
    images: ["/product-images/bamboo-toothbrush-hero.svg", "/product-images/bamboo-toothbrush-lifestyle.svg", "/product-images/bamboo-toothbrush-detail.svg"], emoji: "🪥", badge: "hot", stockCount: 45, reviews: 567, rating: 4, soldThisWeek: 289,
    faq: [{ question: "Are the bristles really activated charcoal?", answer: "Yes, charcoal-infused bristles that provide natural whitening and deodorizing." }, { question: "How long does each brush last?", answer: "Same as a regular toothbrush — about 3 months. Replace when bristles splay." }, { question: "Is the handle truly compostable?", answer: "Yes, natural bamboo and the bristles are eco-friendly. Remove bristles before composting if desired." }]
  },
  {
    id: "sunscreen-spf50",
    name: "Dewy Sunscreen SPF 50 PA++++ | No White Cast, All Glow — India's Everyday SPF",
    hookLine: "Sun protection that actually makes your skin look better.",
    category: "personal-care",
    description: "Most Indian sunscreens leave a white cast and feel heavy. This dewy sunscreen with ceramides and Vitamin C gives you SPF 50 PA++++ protection against UVA, UVB, and blue light — with zero white cast and a dewy finish. Works under makeup, feels like moisturizer.",
    keyFeatures: ["SPF 50 PA++++ UVA/UVB protection", "Blue light protection for screen time", "Ceramides + Vitamin C for skin health", "Zero white cast — works on all Indian skin tones", "Lightweight dewy finish — not greasy", "Suitable for oily, dry, sensitive, and combo skin"],
    costPrice: 130, amazonPriceMin: 250, amazonPriceMax: 499, flipkartPriceMin: 230, flipkartPriceMax: 549,
    vraecoPrice: 329, originalPrice: 649, sku: "VRA-PC-02",
    images: ["/product-images/sunscreen-spf50-hero.svg", "/product-images/sunscreen-spf50-lifestyle.svg", "/product-images/sunscreen-spf50-detail.svg"], emoji: "☀️", badge: "trending", stockCount: 30, reviews: 456, rating: 5, soldThisWeek: 267,
    faq: [{ question: "Will it leave a white cast on darker skin?", answer: "No white cast. Formulated specifically for all Indian skin tones." }, { question: "Can I use it under makeup?", answer: "Yes, the dewy finish works beautifully under foundation." }, { question: "Does it work for oily skin?", answer: "Yes, lightweight formula absorbs quickly without making skin greasy." }]
  },

  // ===================== FASHION =====================
  {
    id: "diamond-jewellery-set",
    name: "American Diamond Jewellery Set | Red-Carpet Glamour Without the Red-Carpet Price",
    hookLine: "Red-carpet glamour without the red-carpet price.",
    category: "fashion",
    description: "Want to look stunning at every wedding, party, or dinner date without spending thousands? This American diamond jewellery set gives you the sparkle of real diamonds at a fraction of the price. Includes necklace, earrings, and maang tikka. Looks real, feels luxurious, costs less than a dinner out.",
    keyFeatures: ["Premium AAA-grade American diamonds", "Includes necklace, earrings, and maang tikka", "Gold-plated setting for luxurious look", "Tarnish-resistant coating", "Complimentary elegant jewelry box", "Perfect for weddings, parties, festivals"],
    costPrice: 225, amazonPriceMin: 450, amazonPriceMax: 899, flipkartPriceMin: 420, flipkartPriceMax: 949,
    vraecoPrice: 549, originalPrice: 1099, sku: "VRA-FAS-01",
    images: ["/product-images/diamond-jewellery-set-hero.svg", "/product-images/diamond-jewellery-set-lifestyle.svg", "/product-images/diamond-jewellery-set-detail.svg"], emoji: "💎", badge: "hot", stockCount: 13, reviews: 678, rating: 5, soldThisWeek: 345,
    faq: [{ question: "Will it look fake?", answer: "No, the AAA-grade stones are virtually indistinguishable from real diamonds to the naked eye." }, { question: "Does it tarnish over time?", answer: "Gold plating and anti-tarnish coating keeps it looking new for 12+ months with regular care." }, { question: "Is the jewelry box included?", answer: "Yes, comes in an elegant presentation box — perfect for gifting." }]
  },
  {
    id: "fancy-necklace-set",
    name: "Fancy Designer Necklace Set | Elevate Any Outfit With One Statement Piece",
    hookLine: "Elevate any outfit with one stunning piece.",
    category: "fashion",
    description: "That one accessory that transforms a simple outfit into a head-turner. This designer necklace set features intricate detailing, premium finishing, and an adjustable chain that sits perfectly every time. Lightweight enough for all-day wear, stunning enough for every occasion.",
    keyFeatures: ["Intricate designer detailing", "Lightweight for all-day comfort", "Adjustable chain length", "Includes matching earrings", "Premium alloy with gold plating", "Versatile — works with ethnic and western"],
    costPrice: 115, amazonPriceMin: 199, amazonPriceMax: 449, flipkartPriceMin: 180, flipkartPriceMax: 499,
    vraecoPrice: 279, originalPrice: 559, sku: "VRA-FAS-02",
    images: ["/product-images/fancy-necklace-set-hero.svg", "/product-images/fancy-necklace-set-lifestyle.svg", "/product-images/fancy-necklace-set-detail.svg"], emoji: "📿", badge: "new", stockCount: 28, reviews: 389, rating: 5, soldThisWeek: 198,
    faq: [{ question: "Is the length adjustable?", answer: "Yes, the chain extends to fit comfortably with any neckline." }, { question: "Can I wear it with a saree?", answer: "Absolutely — the design works beautifully with both Indian ethnic and western outfits." }, { question: "Are the earrings included?", answer: "Yes, matching earrings are included with the necklace." }]
  },

  // ===================== LAUNDRY & CLOTHES CARE =====================
  {
    id: "shoe-washing-bag",
    name: "Protective Shoe Washing Bag for Washing Machine | Clean Sneakers Without Damage",
    hookLine: "Wash your shoes in the machine — zero damage, zero effort.",
    category: "personal-care",
    description: "Stop hand-washing your sneakers! This premium shoe washing bag fits any shoe size — sneakers, running shoes, canvas, sports shoes. Just toss it in the washing machine. The protective mesh and soft inner lining keep your shoes safe from scratches, dents, and tangling while getting them spotless. Works with both front-load and top-load machines.",
    keyFeatures: ["Fits all shoe sizes — sneakers, running shoes, sports shoes", "Premium double-layer mesh — protects from scratches", "Soft inner cushioning prevents dents and deformation", "Durable waterproof zipper", "Reusable — use it hundreds of times", "Safe for front-load and top-load machines", "Also works as a drying/shadow-drying bag", "Machine washable and quick-drying"],
    costPrice: 65, amazonPriceMin: 199, amazonPriceMax: 499, flipkartPriceMin: 179, flipkartPriceMax: 449,
    vraecoPrice: 249, originalPrice: 699, sku: "VRA-LND-01",
    images: ["/product-images/shoe-washing-bag-hero.svg", "/product-images/shoe-washing-bag-lifestyle.svg", "/product-images/shoe-washing-bag-detail.svg"], emoji: "👟", badge: "hot", stockCount: 50, reviews: 452, rating: 5, soldThisWeek: 287,
    faq: [{ question: "What shoe sizes does it fit?", answer: "Fits all shoe sizes up to UK 11 / EU 46 — works for sneakers, running shoes, sports shoes, and canvas shoes." }, { question: "Will shoes get damaged?", answer: "No! The double-layer mesh and soft inner padding protect shoes from scratches, dents, and tangling." }, { question: "Does it work in top-load machines?", answer: "Yes, works perfectly with both front-load and top-load washing machines." }, { question: "Can it be used as a drying bag?", answer: "Yes! After washing, the bag can also be used for shadow-drying your shoes to maintain their shape and color." }, { question: "How many times can I reuse it?", answer: "Designed for hundreds of uses — it's durable, machine-washable, and quick-drying." }]
  }
];

// ===================== HELPER FUNCTIONS =====================

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== currentId && p.category === current.category)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

export const OLD_TO_NEW_ID_MAP: Record<string, string> = {
  "quick-chop-pro": "veg-peeler-cutter",
  "jade-roller": "ice-roller-jade-combo",
  "cloud-light": "panda-night-lamp",
  "posture-belt": "posture-corrector-belt",
  "fridge-organizer": "food-storage-containers",
  "neck-fan": "neck-fan",
  "spice-rack": "revolving-spice-rack",
  "oil-sprayer": "hand-blender",
  "silicone-lids": "silicone-stretch-lids",
  "posture-corrector": "posture-corrector-belt",
  "hair-growth": "hair-gloss-serum",
  "acupressure-slippers": "acupressure-slippers",
};

export function getStockMessage(stock: number, soldThisWeek: number): string {
  if (stock <= 10) return `Only ${stock} left — grab before it's gone!`;
  if (stock <= 20) return `Only ${stock} left in stock`;
  return `${soldThisWeek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sold this week`;
}