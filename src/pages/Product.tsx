import { Helmet } from '../components/Helmet';
import ProductPage from '../components/product/ProductPage';
import TrustBar from '../components/home/TrustBar';
import Reviews from '../components/home/Reviews';
import { trackView } from '../utils/recentlyViewed';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getProductById } from '../data/products';

export default function Product() {
  const { id } = useParams();

  const product = useMemo(() => getProductById(id || ''), [id]);

  useEffect(() => {
    if (id) trackView(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{product ? `Buy ${product.name.split(' | ')[0]} — Best Price ₹${product.vraecoPrice} | VRAECO India` : 'VRAECO Product — Best Price in India'}</title>
        <meta name="description" content={product
          ? `${product.name} online at VRAECO. Was ₹${product.originalPrice}, Now ₹${product.vraecoPrice}. ${product.hookLine} Free shipping, COD available. ${product.rating}★ from ${product.reviews.toLocaleString()}+ reviews.`
          : 'Shop this viral product at VRAECO. Best price in India, free shipping, cash on delivery available. 7-day hassle-free returns.'
        } />
        <link rel="canonical" href={`https://vreco.vercel.app/product/${id}`} />
      </Helmet>
      <main>
        <ProductPage />
        <TrustBar />
        <Reviews />
      </main>
    </>
  );
}
