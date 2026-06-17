import { Helmet } from '../components/Helmet';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About VRAECO — India's Viral Home Essentials Store</title>
        <meta name="description" content="Learn about VRAECO, India's top online destination for trending viral products, kitchen gadgets, wellness essentials, and home decor — all at unbeatable prices." />
        <meta property="og:title" content="About VRAECO" />
        <meta property="og:url" content="https://vreco.vercel.app/about" />
        <link rel="canonical" href="https://vreco.vercel.app/about" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen">
      <div className="section-inner max-w-[800px]">
        <h1 className="font-serif text-[2.5rem] mb-8">About VRAECO</h1>
        <div className="prose prose-[#0a0a0a] prose-gold">
          <p className="text-text-muted leading-relaxed mb-6">
            Welcome to VRAECO, your number one source for all things viral and essential. We're dedicated to giving you the very best of products, with a focus on dependability, customer service, and uniqueness.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Founded in 2024, VRAECO has come a long way from its beginnings. When we first started out, our passion for finding the most innovative products drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over India, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the e-commerce industry.
          </p>
          <p className="text-text-muted leading-relaxed">
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
