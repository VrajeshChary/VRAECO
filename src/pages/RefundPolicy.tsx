import { Helmet } from '../components/Helmet';
import { motion } from 'motion/react';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund & Return Policy | VRAECO — 7-Day Hassle-Free Returns</title>
        <meta name="description" content="VRAECO offers 7-day hassle-free returns. Unused items in original packaging eligible for full refund. Read our complete refund policy." />
        <link rel="canonical" href="https://vraeco.com/refund-policy" />
      </Helmet>
    <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="section-inner max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-edge p-8 md:p-12"
        >
          <h1 className="font-serif text-[2.5rem] mb-8 text-gold">Refund Policy</h1>
          <p className="text-text-dim text-[0.8rem] mb-12 uppercase tracking-[2px]">Last Updated: April 2026</p>
          
          <div className="space-y-10 text-text-muted text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">1. Returns</h2>
              <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">2. Refunds</h2>
              <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">3. Shipping Costs</h2>
              <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">4. Damaged or Defective Items</h2>
              <p>If you receive a damaged or defective item, please contact us immediately. We will arrange for a replacement or a full refund, including shipping costs, for any damaged or defective products.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">5. Non-Returnable Items</h2>
              <p className="mb-4">Certain items are non-returnable for hygiene and safety reasons. These include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal care items (skincare, cosmetics)</li>
                <li>Used kitchenware</li>
                <li>Items on final sale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">6. Contact Us</h2>
              <p>If you have any questions on how to return your item to us, please contact our support team via the contact page or email us at vraeco.store@gmail.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}
