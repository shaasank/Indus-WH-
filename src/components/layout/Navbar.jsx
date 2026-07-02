import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { ClipboardList, Menu, X, ChevronDown } from 'lucide-react';
import productsData from '../../data/products.json';

const categories = [...new Set(productsData.map((product) => product.categoryLabel))];
const categoryToSlug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();
  const totalCount = useCartStore((state) => state.getTotalCount());

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E5EC]">
      {/* Top accent line */}
      <div className="h-[3px] bg-[#1880c3] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] md:h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center min-w-0 group" onClick={() => setMobileOpen(false)}>
          <img
            src="/images/indus-heaters-logo.png"
            alt="Indus Heaters"
            className="h-10 sm:h-12 md:h-14 w-auto max-w-[190px] sm:max-w-[250px] object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-5 h-16 flex items-center font-heading text-sm font-semibold tracking-widest uppercase border-b-[3px] transition-colors ${
                isActive
                  ? 'border-[#1880c3] text-[#1880c3]'
                  : 'border-transparent text-[#4B5563] hover:text-[#1880c3]'
              }`
            }
          >
            Home
          </NavLink>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className={`px-5 h-16 flex items-center gap-1 font-heading text-sm font-semibold tracking-widest uppercase border-b-[3px] transition-colors ${
              productsOpen || location.pathname.startsWith('/products') ? 'border-[#1880c3] text-[#1880c3]' : 'border-transparent text-[#4B5563] hover:text-[#1880c3]'
            }`}>
              Products <ChevronDown className={`w-3 h-3 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-[#E2E5EC] border-t-2 border-t-[#1880c3] shadow-xl z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${categoryToSlug(cat)}`}
                    onClick={() => setProductsOpen(false)}
                    className="block px-5 py-3 text-sm text-[#4B5563] hover:bg-[#E8F3FA] hover:text-[#1880c3] border-b border-[#E2E5EC] last:border-0 font-body transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
                <Link to="/products" className="block px-5 py-3 text-sm font-bold text-[#1880c3] bg-[#E8F3FA] hover:bg-[#1880c3] hover:text-white transition-colors uppercase tracking-wider font-heading">
                  View All Products →
                </Link>
              </div>
            )}
          </div>

          {[['/about', 'About'], ['/contact', 'Contacts']].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-5 h-16 flex items-center font-heading text-sm font-semibold tracking-widest uppercase border-b-[3px] transition-colors ${
                  isActive
                    ? 'border-[#1880c3] text-[#1880c3]'
                    : 'border-transparent text-[#4B5563] hover:text-[#1880c3]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link
            to="/enquiry"
            className="relative flex items-center gap-2 bg-[#000000] text-white px-4 h-9 font-heading text-sm font-bold tracking-widest uppercase hover:bg-[#111827] transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Enquiry</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-[#000000]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E5EC] bg-white">
          {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Contacts']].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 font-heading text-sm font-bold uppercase tracking-widest text-[#000000] border-b border-[#E2E5EC] hover:text-[#1880c3] hover:pl-8 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
