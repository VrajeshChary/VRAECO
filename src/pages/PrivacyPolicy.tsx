import { Helmet } from '../components/Helmet';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | VRAECO — Your Data is Safe & Secure</title>
        <meta name="description" content="Read how VRAECO collects, uses, and protects your personal information. We value your privacy and never sell your data to third parties." />
        <link rel="canonical" href="https://vreco.vercel.app/privacy-policy" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="section-inner max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-edge p-8 md:p-12"
        >
          <h1 className="font-serif text-[2.5rem] mb-8 text-gold">Privacy Policy</h1>
          <p className="text-text-dim text-[0.8rem] mb-12 uppercase tracking-[2px]">Last Updated: April 2026</p>
          
          <div className="space-y-10 text-text-muted text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us when you make a purchase, sign up for our newsletter, or contact our support team. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely via our payment partners)</li>
                <li>Order history and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Communicate with you about products, services, and promotions</li>
                <li>Improve our website and customer experience</li>
                <li>Prevent fraudulent transactions and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">4. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">5. Cookies</h2>
              <p>We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">6. Contact Us</h2>
              <p>If there are any questions regarding this privacy policy, you may contact us using the information on our contact page.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}
