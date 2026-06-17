import { Helmet } from '../components/Helmet';
import MysteryDiscount from '../components/home/MysteryDiscount';

export default function OffersPage() {
  return (
    <>
      <Helmet>
        <title>Exclusive Offers & Discounts | VRAECO — Spin & Win Up to 50% Off!</title>
        <meta name="description" content="Unlock exclusive deals at VRAECO. Spin the wheel for 5-50% off. Limited-time flash sales and secret discounts. Shop now and save!" />
        <link rel="canonical" href="https://vreco.vercel.app/offers" />
      </Helmet>
      <main className="pt-20 min-h-screen">
        <MysteryDiscount />
      </main>
    </>
  );
}
