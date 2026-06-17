import { Helmet } from './Helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  canonical?: string;
  structuredData?: Record<string, unknown>;
  product?: {
    name: string;
    price: number;
    oldPrice: number;
    description: string;
    rating?: number;
    reviews?: number;
  };
  faq?: { question: string; answer: string }[];
}

export default function SEO({
  title = 'VRAECO — India\'s #1 Viral Home Essentials Store',
  description = 'Shop trending, viral home essentials at unbeatable prices. Free shipping on all orders. Cash on Delivery available. Trusted by 10,000+ customers across India.',
  keywords = 'viral products india, trending home essentials, kitchen gadgets online, wellness products, best price india, cash on delivery',
  image = '/og-image.jpg',
  type = 'website',
  canonical,
  structuredData,
  product,
  faq
}: SEOProps) {
  const url = canonical || `https://vreco.vercel.app`;
  const siteName = 'VRAECO';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="theme-color" content="#f8f0e0" />

      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              url,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating || 4.8,
              reviewCount: product.reviews || 1247,
            },
          })}
        </script>
      )}

      {faq && faq.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          })}
        </script>
      )}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
