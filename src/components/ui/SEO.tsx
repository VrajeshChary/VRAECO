import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function SEO({ title = 'VRAECO — India\'s #1 Viral Home Essentials Store', description = 'Shop India\'s trending viral products. Free shipping, COD available. Trusted by 10,000+ customers.', keywords = 'viral products india, trending products, home essentials', image = 'https://vraeco.com/og-image.jpg' }: SEOProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VRAECO",
    url: "https://vraeco.com",
    logo: "https://vraeco.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "N/A",
      email: "vraeco.store@gmail.com",
      contactType: "customer service",
      availableLanguage: "English"
    },
    sameAs: [
      "https://instagram.com/vraeco",
      "https://twitter.com/vraeco",
      "https://facebook.com/vraeco"
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}