import { Helmet } from '../components/Helmet';
import Bundles from '../components/home/Bundles';

export default function BundlesPage() {
  return (
    <>
      <Helmet>
        <title>VRAECO Value Bundles — Save More With Curated Product Sets | India</title>
        <meta name="description" content="Shop curated bundles at VRAECO and save big. Combos of our best-selling viral products at unbeatable bundle prices. Free shipping on bundles!" />
        <link rel="canonical" href="https://vraeco.com/bundles" />
      </Helmet>
      <main className="pt-20 min-h-screen">
        <Bundles />
      </main>
    </>
  );
}
