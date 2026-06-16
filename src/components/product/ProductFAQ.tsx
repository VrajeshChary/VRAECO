import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productId: string;
  faqs: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  { question: 'How long does delivery take?', answer: 'We ship within 24 hours. Delivery takes 3-5 business days for most locations. Metro cities get orders in 2-3 days. You\'ll receive tracking details via email and SMS immediately after dispatch.' },
  { question: 'Can I pay using UPI?', answer: 'Yes! We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, wallets, and Cash on Delivery (COD) for orders above ₹499.' },
  { question: 'What is the return policy?', answer: 'We offer a hassle-free 7-day return policy. If you\'re not satisfied with your purchase, simply return it in its original condition. Full refund within 4-5 business days. No questions asked.' },
  { question: 'Is Cash on Delivery available?', answer: 'Yes, COD is available for orders above ₹499. We recommend prepaid orders as they ship faster and often have special discounts.' },
  { question: 'How do I track my order?', answer: 'After your order ships, you\'ll receive a tracking link via email and SMS. You can also track using the Order Tracking page with your order ID anytime.' },
];

export default function ProductFAQ({ faqs: customFaqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = customFaqs || defaultFAQs;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-gold" />
        <h3 className="font-serif text-[1.3rem] text-text-main">
          Frequently Asked <em className="italic text-gold">Questions</em>
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-raised border border-edge rounded-xl overflow-hidden transition-all"
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-[0.92rem] pr-4">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-dim flex-shrink-0" />
              )}
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 text-[0.85rem] text-text-muted leading-relaxed border-t border-edge pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-edge text-center">
        <p className="text-[0.78rem] text-text-dim">
          Still have questions?{' '}
          <a href="/contact" className="text-gold hover:underline underline-offset-4">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}