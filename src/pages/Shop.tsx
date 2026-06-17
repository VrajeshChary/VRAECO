import { Helmet } from '../components/Helmet';
import TrendingProducts from '../components/home/TrendingProducts';

export default function Shop() {
  return (
    <>
      <Helmet>
        <title>Shop All Viral Products | Best Prices in India — VRAECO</title>
        <meta name="description" content="Browse 100+ trending products at VRAECO. Kitchen, wellness, decor & more. Best prices, free shipping, COD available. Shop now!" />
        <meta property="og:title" content="Shop All Viral Products | VRAECO India" />
        <meta property="og:url" content="https://vreco.vercel.app/shop" />
        <link rel="canonical" href="https://vreco.vercel.app/shop" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen">
      <div className="section-inner">
        <h1 className="font-serif text-[2.5rem] mb-8 text-center">Shop All</h1>
        <p className="text-text-muted text-center mb-12">Our full collection of viral products.</p>
        <TrendingProducts hideHeader={true} />
      </div>
    </main>
    </>
  );
}
