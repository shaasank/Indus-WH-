import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from '../data/products.json';
import { ClipboardList, Filter, X, Grid, Search, FileText, Activity } from 'lucide-react';

const ALL_CATEGORIES = [...new Set(productsData.map(p => p.categoryLabel))];
const categoryToSlug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = useMemo(() => {
    const categorySlug = searchParams.get('category');
    return ALL_CATEGORIES.find((category) => categoryToSlug(category) === categorySlug) || '';
  }, [searchParams]);

  const setActiveCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category) {
      nextParams.set('category', categoryToSlug(category));
    } else {
      nextParams.delete('category');
    }
    setSearchParams(nextParams);
  };



  const filtered = productsData
    .filter(p => activeCategory === '' || p.categoryLabel === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className="bg-white text-[#0A0F1A]">

      {/* ── CATALOGUE HEADER ──────────────────── */}
      <div className="border-b border-[#E2E5EC] bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `linear-gradient(#E2E5EC 1px, transparent 1px), linear-gradient(90deg, #E2E5EC 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="structural-line-left pl-8">
            <div className="text-[#1B4EDB] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">SYSTEM_CATALOGUE_V2.0</div>
            <h1 className="font-heading text-6xl font-bold tracking-tight text-[#0A0F1A]">PRODUCT<br />INVENTORY</h1>
            <p className="text-[#6B7280] mt-6 max-w-md font-body text-base leading-relaxed">
              Access 500+ precision heating configurations. Use the sidebar module to filter by category or technical specification.
            </p>
          </div>

          {/* Search Module */}
          <div className="w-full md:w-80 group">
             <div className="text-[#6B7280] font-mono text-[9px] uppercase tracking-[0.2em] mb-2 font-bold group-focus-within:text-[#1B4EDB] transition-colors">SEARCH_DATABASE</div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9CDD8] group-focus-within:text-[#1B4EDB]" />
                <input 
                  type="text" 
                  placeholder="ID / NAME / SPEC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E2E5EC] pl-10 pr-4 py-3 text-xs font-mono font-bold focus:border-[#1B4EDB] focus:outline-none focus:ring-4 focus:ring-[#1B4EDB]/5 transition-all uppercase tracking-widest placeholder:text-[#C9CDD8]/50"
                  style={{ borderRadius: 0 }}
                />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-0">

        {/* ── SIDEBAR CONTROL MODULE ───────────── */}
        <aside className="lg:w-64 shrink-0 lg:border-r border-[#E2E5EC] lg:pr-10 lg:mr-10">
          <div className="flex items-center justify-between mb-8 border-b border-[#E2E5EC] pb-4">
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0F1A]">
              <Filter className="w-3.5 h-3.5 text-[#1B4EDB]" /> FILTER_SYSTEM
            </div>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory('')}
                className="text-[9px] text-red-500 font-mono font-bold uppercase tracking-wider flex items-center gap-1 hover:underline transition-all"
              >
                <X className="w-2.5 h-2.5" /> RESET
              </button>
            )}
          </div>

          <div className="hidden lg:block sticky top-24">
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('')}
                className={`w-full text-left px-4 py-3 text-xs font-mono font-bold transition-all border-l-4 group flex justify-between items-center ${
                  activeCategory === ''
                    ? 'border-[#1B4EDB] text-[#1B4EDB] bg-[#EBF0FF]/50'
                    : 'border-transparent text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[#F5F5F5] hover:border-[#F5F5F5]'
                }`}
              >
                <span>ALL_MODULES</span>
                <span className={`text-[10px] opacity-40 group-hover:opacity-100 ${activeCategory === '' ? 'opacity-100' : ''}`}>{productsData.length}</span>
              </button>
              {ALL_CATEGORIES.map(cat => {
                const count = productsData.filter(p => p.categoryLabel === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 text-xs font-mono font-bold transition-all border-l-4 group flex justify-between items-center uppercase tracking-wider ${
                      activeCategory === cat
                        ? 'border-[#1B4EDB] text-[#1B4EDB] bg-[#EBF0FF]/50'
                        : 'border-transparent text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[#F5F5F5] hover:border-[#F5F5F5]'
                    }`}
                  >
                    <span className="truncate">{cat.replace(/ /g, '_')}</span>
                    <span className={`text-[10px] opacity-40 group-hover:opacity-100 ${activeCategory === cat ? 'opacity-100' : ''}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Technical Help Box */}
            <div className="mt-12 p-6 bg-[#0A0F1A] text-white">
               <div className="w-8 h-[2px] bg-[#1B4EDB] mb-4" />
               <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-white/40">SYSTEM_NOTE</div>
               <p className="font-mono text-[10px] leading-relaxed text-white/70">
                 All products are available with custom J/K type thermocouples and SS316 sheath configurations.
               </p>
            </div>
          </div>

          {/* Mobile filter chips - 10/10 Brutal Sharp Style */}
          <div className="lg:hidden flex gap-0 flex-wrap mb-8 border border-[#E2E5EC]">
            <button
              onClick={() => setActiveCategory('')}
              className={`flex-1 min-w-[33%] px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest border-r border-b border-[#E2E5EC] transition-all ${
                activeCategory === '' ? 'bg-[#1B4EDB] text-white border-[#1B4EDB]' : 'bg-white text-[#3A3F4B]'
              }`}
            >
              ALL
            </button>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 min-w-[33%] px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest border-r border-b border-[#E2E5EC] transition-all truncate ${
                  activeCategory === cat ? 'bg-[#1B4EDB] text-white border-[#1B4EDB]' : 'bg-white text-[#3A3F4B]'
                }`}
              >
                {cat.split(' ')[0]}
              </button>
            ))}
          </div>
        </aside>

        {/* ── PRODUCT GRID BRUTAL ──────────────────── */}
        <main className="flex-1">
          {/* Metadata Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E5EC]">
            <div className="font-mono text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.2em] flex items-center gap-3">
              <Activity className="w-3.5 h-3.5 text-[#1B4EDB]" />
              LOADED: <strong className="text-[#0A0F1A]">{filtered.length}_SKU_FOUND</strong>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#C9CDD8]">
                  VIEW_MODE: <Grid className="w-3.5 h-3.5 text-[#1B4EDB]" />
               </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-32 border-4 border-dashed border-[#E2E5EC] bg-[#F5F5F5]/30"
              >
                <div className="font-mono text-xs font-bold text-[#6B7280] uppercase tracking-[0.3em]">DATABASE_SEARCH_ZERO_RESULTS</div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-0 border border-[#E2E5EC] bg-[#E2E5EC]">
                {filtered.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layoutProps={{ duration: 0.4 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="group border border-[#E2E5EC] bg-white relative flex flex-col h-full overflow-hidden"
                  >
                    {/* Technical Scanline Hover UI */}


                    <Link to={`/products/${product.category}/${product.slug}`} className="block relative flex-grow">
                      {/* Image Module */}
                      <div className="h-60 bg-[#FAFAFA] flex items-center justify-center overflow-hidden border-b border-[#E2E5EC] p-10 relative">
                        {/* Dimensional Grid overlay on card */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none" style={{
                           backgroundImage: `linear-gradient(#1B4EDB 1px, transparent 1px), linear-gradient(90deg, #1B4EDB 1px, transparent 1px)`,
                           backgroundSize: '16px 16px',
                        }} />
                        
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          className="max-h-44 w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        <div className="absolute top-4 right-4 font-mono text-[8px] text-[#C9CDD8] tracking-[0.2em] group-hover:text-[#1B4EDB] transition-colors">
                          MOD_REF: IH_{product.id}
                        </div>
                      </div>

                      {/* Info Module */}
                      <div className="p-8">
                        <div className="inline-flex items-center gap-2 mb-3">
                           <div className="w-1.5 h-1.5 bg-[#1B4EDB]" />
                           <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#1B4EDB]">
                              {product.categoryLabel.replace(/ /g, '_')}
                           </div>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-[#0A0F1A] leading-tight mb-4 group-hover:text-[#1B4EDB] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-8 leading-relaxed line-clamp-2 font-body" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {product.shortDescription}
                        </p>

                        {/* Specs Module - Monospaced Detail */}
                        {product.specs[0] && (
                          <div className="text-[10px] font-mono bg-[#0A0F1A] text-white/90 px-4 py-3 flex justify-between border-b-2 border-[#1B4EDB]">
                            <span className="opacity-50 uppercase tracking-tighter">{product.specs[0].label}</span>
                            <span className="font-bold tracking-tight">{product.specs[0].value}</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Action Module - 10/10 Priority 70/30 Split */}
                    <div className="flex border-t border-[#E2E5EC]">
                      <Link
                        to={`/products/${product.category}/${product.slug}`}
                        className="flex-[3] py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn bg-[#1B4EDB] text-white hover:bg-[#1340B5]"
                      >
                        <ClipboardList className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                        CONFIGURE_PRODUCT
                      </Link>
                      <Link
                        to={`/products/${product.category}/${product.slug}`}
                        className="flex-1 py-4 text-center text-[#3A3F4B] hover:text-[#1B4EDB] hover:bg-[#EBF0FF] border-l border-[#E2E5EC] flex items-center justify-center transition-all group/info"
                        title="FULL_SYSTEM_SPECS"
                      >
                        <FileText className="w-4 h-4 group-hover/info:scale-110 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
