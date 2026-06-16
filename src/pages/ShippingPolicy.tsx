import { Helmet } from '../components/Helmet';
import { motion } from 'motion/react';

export default function ShippingPolicy() {
  return (
    <>
      <Helmet>
        <title>Shipping Policy | VRAECO — Free Standard Shipping Pan-India</title>
        <meta name="description" content="VRAECO ships across India. Free standard shipping on all orders (3-5 days). Express shipping (1-2 days) ₹149. Cash on Delivery with ₹50 surcharge." />
        <link rel="canonical" href="https://vraeco.com/shipping-policy" />
      </Helmet>
    <main className="pt-32 pb-20 min-h-screen bg-void">
      <div className="section-inner max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-edge p-8 md:p-12"
        >
          <h1 className="font-serif text-[2.5rem] mb-8 text-gold">Shipping Policy</h1>
          <p className="text-text-dim text-[0.8rem] mb-12 uppercase tracking-[2px]">Last Updated: April 2026</p>
          
          <div className="space-y-10 text-text-muted text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">1. Order Processing Time</h2>
              <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">2. Shipping Rates & Delivery Estimates</h2>
              <p className="mb-4">Shipping charges for your order will be calculated and displayed at checkout. We offer the following shipping methods:</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-edge text-[0.85rem]">
                  <thead>
                    <tr className="bg-raised">
                      <th className="border border-edge p-3 text-left">Shipping Method</th>
                      <th className="border border-edge p-3 text-left">Estimated Delivery</th>
                      <th className="border border-edge p-3 text-left">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-edge p-3">Standard Shipping</td>
                      <td className="border border-edge p-3">3-5 Business Days</td>
                      <td className="border border-edge p-3">Free</td>
                    </tr>
                    <tr>
                      <td className="border border-edge p-3">Express Shipping</td>
                      <td className="border border-edge p-3">1-2 Business Days</td>
                      <td className="border border-edge p-3">₹149</td>
                    </tr>
                    <tr>
                      <td className="border border-edge p-3">Cash on Delivery</td>
                      <td className="border border-edge p-3">3-5 Business Days</td>
                      <td className="border border-edge p-3">₹50 Surcharge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">3. Shipment Confirmation & Order Tracking</h2>
              <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">4. Customs, Duties, and Taxes</h2>
              <p>VRAECO is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">5. Damages</h2>
              <p>VRAECO is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
            </section>

            <section>
              <h2 className="text-text-main font-serif text-[1.5rem] mb-4">6. International Shipping Policy</h2>
              <p>We currently only ship within India. We do not offer international shipping at this time.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}
