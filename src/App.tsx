import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from './store/useStore';
import CustomCursor from './components/ui/CustomCursor';
import ScrollToTop from './components/ui/ScrollToTop';
import AnnouncementBar from './components/layout/AnnouncementBar';
import FloatingCartButton from './components/ui/FloatingCartButton';
import Breadcrumbs from './components/ui/Breadcrumbs';
import UrgencyBanner from './components/ui/UrgencyBanner';
import LiveChat from './components/ui/LiveChat';
import TrustBadges from './components/ui/TrustBadges';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/ui/CartSidebar';

import ToastContainer from './components/ui/ToastContainer';

import EmailCapturePopup from './components/ui/EmailCapturePopup';
import OfflineBanner from './components/ui/OfflineBanner';

import FirstVisitPopup from './components/ui/FirstVisitPopup';
import CartAbandonmentRecovery from './components/ui/CartAbandonmentRecovery';


// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Policies from './pages/Policies';
import BundlesPage from './pages/BundlesPage';
import OffersPage from './pages/OffersPage';
import ReviewsPage from './pages/ReviewsPage';
import Upsell from './pages/Upsell';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ReturnsRefunds from './pages/ReturnsRefunds';
import CategoryPage from './pages/CategoryPage';
import OrderSuccess from './pages/OrderSuccess';
import OrderTracking from './pages/OrderTracking';
import NotFound from './pages/NotFound';
import WishlistPage from './pages/WishlistPage';
import ReferFriendPage from './pages/ReferFriendPage';
import LoyaltyPage from './components/product/LoyaltyBanner';
import Blog from './pages/Blog';
import AffiliatePage from './pages/AffiliatePage';
import GiftCard from './components/ui/GiftCard';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const sessionId = useStore((state) => state.sessionId);
  const setSessionId = useStore((state) => state.setSessionId);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');
  const isCheckout = location.pathname.startsWith('/checkout');

  useEffect(() => {
    if (!sessionId) {
      fetch('/api/session')
        .then(res => res.json())
        .then(data => setSessionId(data.sessionId));
    }
  }, [sessionId, setSessionId]);

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <AnnouncementBar />


      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      {!isCheckout && <Breadcrumbs />}
      {isProductPage && <TrustBadges />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/bundles" element={<BundlesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/refer" element={<ReferFriendPage />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/gift-card" element={<GiftCard />} />
        <Route path="/upsell/:id" element={<Upsell />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/returns-refunds" element={<ReturnsRefunds />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/order-tracking/:id" element={<OrderTracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <FirstVisitPopup />
      <CartAbandonmentRecovery />
      <OfflineBanner />
      <ToastContainer />

      <EmailCapturePopup />
      <LiveChat />
      <FloatingCartButton onCartClick={() => setIsCartOpen(true)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
