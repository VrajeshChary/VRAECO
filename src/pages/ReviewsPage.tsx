import { Helmet } from '../components/Helmet';
import Reviews from '../components/home/Reviews';

export default function ReviewsPage() {
  return (
    <>
      <Helmet>
        <title>Customer Reviews & Ratings | VRAECO — 4.8★ from 3,000+ Buyers</title>
        <meta name="description" content="Read verified reviews from real VRAECO customers. 4.8/5 average rating from 3,000+ happy buyers. See why customers love our viral products." />
        <link rel="canonical" href="https://vreco.vercel.app/reviews" />
      </Helmet>
      <main className="pt-32 pb-20 min-h-screen">
        <Reviews hideViewAll />
      </main>
    </>
  );
}
