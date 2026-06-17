import { Helmet } from '../components/Helmet';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | VRAECO — India</title>
        <meta name="description" content="Read VRAECO's terms of service. Governing law: India. Accurate pricing, intellectual property, and liability terms." />
        <link rel="canonical" href="https://vreco.vercel.app/terms-of-service" />
      </Helmet>
    <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="section-inner max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-edge p-8 md:p-12"
        >
          <h1 className="font-serif text-[2.5rem] mb-8 text-gold">Terms of Service</h1>
          <p className="text-text-dim text-[0.8rem] mb-12 uppercase tracking-[2px]">Last Updated: April 2026</p>
          
          <div className="space-y-10 text-text-muted text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">2. Use of Service</h2>
              <p className="mb-4">You agree to use our website only for lawful purposes. You are prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using the site in any way that violates any applicable local, state, national, or international law.</li>
                <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the site.</li>
                <li>Attempting to gain unauthorized access to our systems or networks.</li>
                <li>Using any automated system to access the site for any purpose.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">3. Intellectual Property</h2>
              <p>The content, features, and functionality of our website are owned by VRAECO and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">4. Product Information and Pricing</h2>
              <p>We strive to provide accurate product information and pricing. However, errors may occur. We reserve the right to correct any errors and to change or update information at any time without prior notice.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">5. Limitation of Liability</h2>
              <p>In no event shall VRAECO be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">6. Governing Law</h2>
              <p>These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">7. Changes to Terms</h2>
              <p>We reserve the right to modify or replace these terms at any time. Your continued use of the site after any changes constitutes acceptance of the new terms.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}
