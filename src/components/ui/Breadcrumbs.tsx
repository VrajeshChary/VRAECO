import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  '/shop': [{ label: 'Home', path: '/' }, { label: 'Shop' }],
  '/bundles': [{ label: 'Home', path: '/' }, { label: 'Bundles' }],
  '/offers': [{ label: 'Home', path: '/' }, { label: 'Offers' }],
  '/reviews': [{ label: 'Home', path: '/' }, { label: 'Reviews' }],
  '/about': [{ label: 'Home', path: '/' }, { label: 'About Us' }],
  '/contact': [{ label: 'Home', path: '/' }, { label: 'Contact' }],
  '/faq': [{ label: 'Home', path: '/' }, { label: 'FAQ' }],
  '/order-tracking': [{ label: 'Home', path: '/' }, { label: 'Track Order' }],
  '/order-success': [{ label: 'Home', path: '/' }, { label: 'Order Confirmed' }],
  '/privacy-policy': [{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }],
  '/terms-of-service': [{ label: 'Home', path: '/' }, { label: 'Terms of Service' }],
  '/shipping-policy': [{ label: 'Home', path: '/' }, { label: 'Shipping Policy' }],
  '/refund-policy': [{ label: 'Home', path: '/' }, { label: 'Refund Policy' }],
  '/returns-refunds': [{ label: 'Home', path: '/' }, { label: 'Returns & Refunds' }],
};

export default function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname.replace(/\/product\/.{1,50}/, '');
  let crumbs = routeMap[path] || [];

  // Product pages
  if (location.pathname.startsWith('/product/')) {
    const parts = location.pathname.split('/');
    const productId = parts[2];
    const label = productId ? productId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Product';
    crumbs = [
      { label: 'Home', path: '/' },
      { label: 'Shop', path: '/shop' },
      { label },
    ];
  }

  // Category pages
  if (location.pathname.startsWith('/category/')) {
    const category = location.pathname.split('/category/')[1];
    const label = category
      ? category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Category';
    crumbs = [
      { label: 'Home', path: '/' },
      { label: 'Shop', path: '/shop' },
      { label },
    ];
  }

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-[1200px] mx-auto px-4 py-3">
      <ol className="flex items-center gap-1.5 text-[0.7rem] text-text-dim flex-wrap">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-text-dim/50" />}
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-gold transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-text-main">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
