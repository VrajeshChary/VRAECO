import { Search, ShoppingBag, Heart, X, Menu, ArrowRight } from 'lucide-react';
import { useState, FormEvent, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const cartHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const wishlist = useStore((state) => state.wishlist);

  const handleCartMouseEnter = useCallback(() => {
    if (cartHoverTimeoutRef.current) {
      clearTimeout(cartHoverTimeoutRef.current);
      cartHoverTimeoutRef.current = null;
    }
    setIsCartHovered(true);
  }, []);

  const handleCartMouseLeave = useCallback(() => {
    cartHoverTimeoutRef.current = setTimeout(() => {
      setIsCartHovered(false);
    }, 150);
  }, []);

  const navbarProducts = products.map(p => ({ id: p.id, name: p.name.split(' | ')[0], image: p.images[0] }));
  const suggestions = navbarProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Bundles', id: 'bundles' },
    { name: 'Offers', id: 'mystery' },
    { name: 'Reviews', id: 'reviews' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[90] bg-white/95 backdrop-blur-2xl border-b border-cream px-4 md:px-8 h-16 flex items-center justify-between transition-all duration-300">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-text-muted hover:text-text-main transition-colors p-1 border-none bg-transparent cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="text-[1.1rem] font-bold tracking-[8px] uppercase text-text-main no-underline select-none">
            VRAECO
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.path ? (
                <Link
                  to={link.path}
                  className="text-[0.72rem] tracking-[1.5px] uppercase text-text-muted hover:text-text-main transition-colors relative group py-1"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(link.id!)}
                  className="text-[0.72rem] tracking-[1.5px] uppercase text-text-muted hover:text-text-main transition-colors relative group py-1 bg-transparent border-none cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-1">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-text-muted hover:text-text-main transition-colors p-2 rounded-lg hover:bg-raised/80 no-underline"
          >
            <Heart size={20} strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 right-0 bg-text-main text-void text-[0.55rem] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <div
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
            className="relative"
          >
            <button
              onClick={onCartClick}
              className="relative text-text-muted hover:text-text-main transition-colors p-2 rounded-lg hover:bg-raised/80 border-none cursor-pointer flex items-center"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 right-0 bg-text-main text-void text-[0.55rem] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mini Cart Dropdown */}
            <AnimatePresence>
              {isCartHovered && cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-[320px] bg-white border border-edge rounded-xl shadow-2xl overflow-hidden z-[100]"
                  onMouseLeave={() => setIsCartHovered(false)}
                >
                  <div className="px-4 py-3 border-b border-cream flex items-center justify-between">
                    <span className="text-[0.72rem] font-semibold text-text-main">
                      {cartCount} item{cartCount !== 1 ? 's' : ''}
                    </span>
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartHovered(false)}
                      className="text-[0.65rem] text-gold font-semibold flex items-center gap-1 no-underline hover:underline"
                    >
                      Check out <ArrowRight size={12} />
                    </Link>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.variant}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-edge/80 last:border-none hover:bg-raised/40 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-raised border border-cream flex items-center justify-center rounded-lg shrink-0 overflow-hidden">
                          {typeof item.image === 'string' && item.image.startsWith('/') ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5" />
                          ) : (
                            <span className="text-[0.9rem]">{item.image}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.72rem] text-text-main font-medium truncate">{item.name}</div>
                          <div className="text-[0.65rem] text-text-dim">
                            {item.quantity} × ₹{item.price}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id, item.variant);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-text-dim hover:text-ember transition-all text-[0.6rem] bg-transparent border-none cursor-pointer p-1 shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 bg-cream flex justify-between items-center">
                    <span className="text-[0.72rem] text-text-muted">Subtotal</span>
                    <span className="text-[0.85rem] text-text-main font-semibold">
                      ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop search */}
          <button
            onClick={() => { setIsSearchOpen(!isSearchOpen); setTimeout(() => searchRef.current?.focus(), 100); }}
            className="hidden lg:flex text-text-muted hover:text-text-main transition-colors p-2 rounded-lg hover:bg-raised/80 border-none bg-transparent cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sticky z-[85] bg-white/95 backdrop-blur-2xl border-b border-cream overflow-hidden"
          >
            <div className="section-inner py-4">
              <form onSubmit={handleSearch} className="relative max-w-[500px] mx-auto">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full bg-cream border border-cream rounded-xl px-4 py-3 pl-11 text-[0.85rem] text-text-main placeholder:text-text-dim outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                />
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-16 bg-white/95 backdrop-blur-2xl z-[100] lg:hidden flex flex-col p-10"
          >
            {/* Mobile search */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  className="w-full bg-cream border border-cream rounded-xl px-4 py-3 pl-11 text-[0.85rem] text-text-main placeholder:text-text-dim outline-none focus:border-gold transition-all"
                />
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="mt-2 bg-raised rounded-xl overflow-hidden">
                  {suggestions.slice(0, 5).map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery('');
                        setShowSuggestions(false);
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-3 flex items-center gap-3 w-full text-left hover:bg-cream transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <span className="w-8 h-8 overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[0.82rem] text-text-main">{product.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ul className="list-none space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[1.3rem] font-serif text-text-main hover:text-gold transition-colors no-underline"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id!)}
                      className="text-[1.3rem] font-serif text-text-main hover:text-gold transition-colors bg-transparent border-none cursor-pointer block w-full text-left"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 border-t border-cream text-[0.7rem] text-text-dim space-y-3">
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block text-text-muted hover:text-ember transition-colors no-underline">
                Wishlist ({wishlist.length})
              </Link>
              <a href="mailto:vraeco.store@gmail.com" className="block text-text-muted hover:text-gold transition-colors no-underline">
                Email support
              </a>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-text-muted hover:text-gold transition-colors no-underline">
                Contact us
              </Link>
              <Link to="/order-tracking" onClick={() => setIsMenuOpen(false)} className="block text-text-muted hover:text-gold transition-colors no-underline">
                Track order
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
