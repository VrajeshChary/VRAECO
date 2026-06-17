import { Helmet } from '../components/Helmet';

export default function Policies() {
  return (
    <>
      <Helmet>
        <title>VRAECO Store Policies — Privacy, Refunds, Terms & Shipping</title>
        <meta name="description" content="Read VRAECO's transparent store policies on shipping, returns, refunds, privacy, and terms of service. Customer-first approach with 7-day hassle-free returns." />
        <meta property="og:title" content="VRAECO Store Policies" />
        <meta property="og:url" content="https://vreco.vercel.app/policies" />
        <link rel="canonical" href="https://vreco.vercel.app/policies" />
      </Helmet>
  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="section-inner max-w-[800px]">
        <h1 className="font-serif text-[2.5rem] mb-8">Store Policies</h1>
        
        <div className="bg-surface border border-edge p-8 mb-8">
          <h2 className="font-serif text-[1.8rem] text-gold mb-4">Privacy Policy</h2>
          <p className="text-text-muted text-[0.9rem] leading-relaxed mb-4">
            We value your privacy. We do not sell or share your personal information with third parties except as necessary to fulfill your order (e.g., sharing your address with our shipping partners).
          </p>
        </div>

        <div className="bg-surface border border-edge p-8 mb-8">
          <h2 className="font-serif text-[1.8rem] text-gold mb-4">Refund Policy</h2>
          <p className="text-text-muted text-[0.9rem] leading-relaxed mb-4">
            If you are not entirely satisfied with your purchase, we're here to help. You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.
          </p>
        </div>

        <div className="bg-surface border border-edge p-8">
          <h2 className="font-serif text-[1.8rem] text-gold mb-4">Terms of Service</h2>
          <p className="text-text-muted text-[0.9rem] leading-relaxed mb-4">
            By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
