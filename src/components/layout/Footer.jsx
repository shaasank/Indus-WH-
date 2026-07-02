import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import productsData from '../../data/products.json';

const footerCategories = [...new Set(productsData.map((product) => product.categoryLabel))];
const categoryToSlug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white border-t-4 border-[#000000]">

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 border border-white/30 flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">IH</span>
            </div>
            <span className="font-heading text-lg font-bold tracking-widest">INDUS HEATERS</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            India's leading industrial heater manufacturer since 2002. Precision engineering for plastic, polymer and rubber industries.
          </p>
          <div className="text-xs text-white/30 uppercase tracking-[0.4em] font-mono font-bold">
            BUILT_FOR_HEAT. BUILT_TO_LAST.
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40 mb-5 pb-3 border-b border-white/10">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[['/', 'Home'], ['/products', 'All Products'], ['/about', 'About Us'], ['/contact', 'Contact'], ['/enquiry', 'Send Enquiry']].map(([path, label]) => (
              <Link key={path} to={path} className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40 mb-5 pb-3 border-b border-white/10">Product Range</h4>
          <div className="flex flex-col gap-3">
            {footerCategories.map(cat => (
              <Link key={cat} to={`/products?category=${categoryToSlug(cat)}`} className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40 mb-5 pb-3 border-b border-white/10">Locations</h4>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 text-sm text-white/60">
              <MapPin className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
              <div>
                <div className="text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mb-0.5 font-mono">HQ — CHENNAI</div>
                <div className="font-mono text-[10px] text-white/60">Tamil Nadu, India</div>
              </div>
            </div>
            <div className="flex gap-3 text-sm text-white/60">
              <MapPin className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
              <div>
                <div className="text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mb-0.5 font-mono">PLANT — MUTLUR</div>
                <div className="font-mono text-[10px] text-white/60">Tamil Nadu, India</div>
              </div>
            </div>
            <div className="flex gap-3 text-sm text-white/60">
              <Mail className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
              <span>info@indusheaters.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-white/30">© {new Date().getFullYear()} Indus Heaters. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-white/30">
          <Link to="#" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white/60 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
