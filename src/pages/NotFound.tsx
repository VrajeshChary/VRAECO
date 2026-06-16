import { Helmet } from '../components/Helmet';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | VRAECO India</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse VRAECO's trending products instead." />
      </Helmet>
      <main className="min-h-[70vh] flex items-center justify-center pt-24">
        <div className="text-center max-w-md px-6">
          <div className="font-display text-[5rem] md:text-[8rem] font-bold text-gold/30 leading-none mb-2">404</div>
          <h1 className="font-serif text-[2rem] md:text-[2.5rem] mb-4">Page Not Found</h1>
          <p className="text-text-muted mb-10 text-[1rem]">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              Go Home
            </Link>
            <Link to="/shop" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
