import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface Review {
  id: string;
  text: string;
  rating: number;
  author: string;
  initial: string;
  location: string;
  image?: string;
  verified?: boolean;
}

interface ExtendedReview extends Review {
  date?: string;
  product?: string;
}

const reviews: ExtendedReview[] = [
  {
    id: '1',
    text: "I've ordered from VRAECO twice now. The vegetable chopper changed my morning routine completely. My mother asked me where I got it within 2 days of using it.",
    rating: 5,
    author: 'Priya M.',
    initial: 'P',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?w=400&q=80',
    verified: true,
    date: '3 days ago',
    product: 'Veg Peeler & Cutter'
  },
  {
    id: '2',
    text: "The jade roller set is UNREAL at this price. I've seen similar ones for \u20B92500 on other sites. My skin looks depuffed and my jawline is more defined after just 2 weeks.",
    rating: 5,
    author: 'Aarohi S.',
    initial: 'A',
    location: 'Bangalore',
    verified: true,
    date: '5 days ago',
    product: 'Ice Roller + Jade Roller'
  },
  {
    id: '3',
    text: "Fast delivery, COD available, and the product quality is genuinely premium. The crystal lamp I ordered for my daughter's room \u2014 she absolutely loves it. Ordering again for gifts.",
    rating: 5,
    author: 'Rahul K.',
    initial: 'R',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80',
    verified: true,
    date: '1 week ago',
    product: 'Crystal Ball Lamp'
  },
  {
    id: '4',
    text: "Spun the wheel and got 15% off my first order. The posture corrector actually works \u2014 I sit straighter without thinking about it now. WFH essential.",
    rating: 4,
    author: 'Sneha D.',
    initial: 'S',
    location: 'Hyderabad',
    verified: true,
    date: '1 week ago',
    product: 'Posture Corrector Belt'
  },
  {
    id: '5',
    text: "The neck fan during Delhi summers is my new best friend. People at the office literally stopped to ask where I got it from. Ordered two more for my parents.",
    rating: 5,
    author: 'Vikram T.',
    initial: 'V',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1521556658425-4e351f04505f?w=400&q=80',
    verified: true,
    date: '2 weeks ago',
    product: 'Neck Fan 360\u00B0'
  },
  {
    id: '6',
    text: "I was skeptical but COD made it risk-free to try. The fridge organizer set transformed my kitchen into something from Pinterest. Genuinely shocked at the quality.",
    rating: 5,
    author: 'Meera R.',
    initial: 'M',
    location: 'Chennai',
    verified: true,
    date: '2 weeks ago',
    product: 'Food Storage Containers'
  },
  {
    id: '7',
    text: "Bought the laptop stand on a recommendation from my colleague. My neck pain reduced noticeably within a week. The build quality is solid for the price \u2014 feels premium.",
    rating: 5,
    author: 'Arjun P.',
    initial: 'A',
    location: 'Pune',
    verified: true,
    date: '3 weeks ago',
    product: 'Laptop Stand'
  },
  {
    id: '8',
    text: "The sunscreen has become my daily go-to. Zero white cast on my skin tone which is rare for Indian sunscreens. Lightweight and doesn't feel heavy under makeup.",
    rating: 5,
    author: 'Kavya N.',
    initial: 'K',
    location: 'Kochi',
    verified: true,
    date: '3 weeks ago',
    product: 'Dewy Sunscreen SPF 50'
  },
  {
    id: '9',
    text: "Got the acupressure slippers for my dad's foot pain. He says it feels like a massage every time he walks. He wears them every evening now. Worth every rupee.",
    rating: 4,
    author: 'Rohan S.',
    initial: 'R',
    location: 'Jaipur',
    verified: true,
    date: '1 month ago',
    product: 'Acupressure Slippers'
  },
  {
    id: '10',
    text: "The American diamond set I ordered for a wedding looked absolutely stunning. Everyone thought it was real! Got so many compliments. Coming back for more jewelry.",
    rating: 5,
    author: 'Ananya G.',
    initial: 'A',
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a4d49?w=400&q=80',
    verified: true,
    date: '1 month ago',
    product: 'Diamond Jewellery Set'
  },
  {
    id: '11',
    text: "The ocean wave projector makes my son's bedroom so peaceful at night. He falls asleep faster now. The remote control is handy \u2014 can adjust brightness and color from bed.",
    rating: 5,
    author: 'Deepak V.',
    initial: 'D',
    location: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
    verified: true,
    date: '1 month ago',
    product: 'Ocean Wave Projector'
  },
  {
    id: '12',
    text: "Bought 5 bamboo toothbrushes for the whole family. Everyone loves the charcoal bristles \u2014 they actually feel cleaner. And it feels good to reduce plastic waste.",
    rating: 4,
    author: 'Shreya M.',
    initial: 'S',
    location: 'Lucknow',
    verified: true,
    date: '1 month ago',
    product: 'Bamboo Toothbrush Pack'
  }
];

export default function Reviews({ hideViewAll = false }: { hideViewAll?: boolean }) {
  return (
    <section className="py-20 relative z-[2] overflow-hidden" id="reviews">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(245,240,232,0.6) 0%, #faf5eb 50%, rgba(245,240,232,0.6) 100%)' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(201,169,76,0.05) 0%, transparent 70%)' }}></div>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Social Proof
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Real People. <em>Real Results.</em>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index % 3), duration: 0.6 }}
              whileHover={{ y: -10, borderColor: 'rgba(201,169,110,0.3)' }}
              className="bg-raised border border-edge p-8 rounded-3xl relative flex flex-col group transition-all duration-500 shadow-2xl"
            >
              <div className="absolute top-6 right-8 text-gold/10 text-[4rem] font-serif pointer-events-none group-hover:text-gold/20 transition-colors">"</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-gold text-[0.85rem] tracking-[2px]">
                  {'\u2605'.repeat(review.rating)}{'\u2606'.repeat(5-review.rating)}
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-[0.55rem] text-jade uppercase tracking-[1px] font-bold">
                    <span className="w-1.5 h-1.5 bg-jade rounded-full"></span>
                    Verified
                  </span>
                )}
              </div>
              <p className="text-[1rem] leading-relaxed text-text-muted mb-6 font-serif italic relative z-[2] flex-1 group-hover:text-text-main transition-colors">
                {review.text}
              </p>
              {review.image && (
                <div className="w-full h-[160px] mb-6 overflow-hidden rounded-2xl border border-edge relative z-[2] group-hover:border-gold/20 transition-colors">
                  <img src={review.image} alt="Review" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-main/50 to-transparent"></div>
                </div>
              )}
              <div className="flex items-center gap-4 relative z-[2]">
                <div className="w-12 h-12 rounded-full bg-surface border border-gold/20 flex items-center justify-center text-[1rem] font-bold text-gold shrink-0 shadow-inner">
                  {review.initial}
                </div>
                <div>
                  <div className="text-[0.95rem] font-bold text-text-main">{review.author}</div>
                  <div className="text-[0.7rem] text-text-dim flex items-center gap-2 uppercase tracking-[1px] font-bold">
                    {review.location}
                    {review.verified && (
                      <span className="flex items-center gap-1 text-jade">
                        <span className="w-1.5 h-1.5 bg-jade rounded-full animate-pulse"></span>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-edge bg-surface flex items-center justify-center text-[1.2rem] shadow-2xl overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-[0.9rem] text-text-muted">Join <strong className="text-gold">12,400+</strong> happy customers across India</p>
            {!hideViewAll && (
              <Link to="/reviews" className="btn-primary px-10 py-4 mt-2 inline-block">
                View All Reviews
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
