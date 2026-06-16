import { Helmet } from '../components/Helmet';
import CheckoutFlow from '../components/checkout/CheckoutFlow';

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Secure Checkout | VRAECO</title>
        <meta name="description" content="Complete your order securely. Free shipping, COD available, and easy returns on all VRAECO products." />
        <meta property="og:title" content="Secure Checkout | VRAECO India" />
        <meta property="og:url" content="https://vraeco.com/checkout" />
        <link rel="canonical" href="https://vraeco.com/checkout" />
      </Helmet>
      <main className="pt-20">
      <CheckoutFlow />
    </main>
    </>
  );
}
