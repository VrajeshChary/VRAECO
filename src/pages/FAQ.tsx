import { Helmet } from '../components/Helmet';

export default function FAQ() {
  const faqs = [
    { q: "How long does shipping take?", a: "We typically process orders within 24 hours. Delivery takes 3-5 business days depending on your location in India." },
    { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, we offer Cash on Delivery across most pin codes in India. A small COD surcharge may apply based on order value." },
    { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for unused items in their original packaging." },
    { q: "How can I track my order?", a: "Visit our Track Order page and enter your order ID to check the latest delivery status." },
    { q: "How do I get a discount?", a: "We frequently offer discounts through our spin wheel and flash sales. You can also check our Offers page for active promotions." },
    { q: "Are your products safe for daily use?", a: "Yes, all our products are made from food-grade and BPA-free materials. Quality tested and designed for everyday use." },
    { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking via Razorpay, and Cash on Delivery." }
  ];

  return (
    <>
      <Helmet>
        <title>VRAECO FAQ — Shipping, Returns, COD & Product Questions | India</title>
        <meta name="description" content="Answers to common questions about VRAECO orders, shipping times, returns, COD availability, and product details. Can't find what you need? Email us anytime." />
        <meta property="og:title" content="Frequently Asked Questions | VRAECO" />
        <meta property="og:url" content="https://vreco.vercel.app/faq" />
        <link rel="canonical" href="https://vreco.vercel.app/faq" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen">
      <div className="section-inner max-w-[800px]">
        <h1 className="font-serif text-[2.5rem] mb-8 text-center">Frequently Asked Questions</h1>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface border border-edge p-6">
              <h3 className="font-serif text-[1.2rem] text-gold mb-2">{faq.q}</h3>
              <p className="text-text-muted text-[0.9rem] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
