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
    <div className="bg-white text-primary">

      {/* ── CATALOGUE HEADER ──────────────────── */}
      <div className="border-b border-border bg-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="structural-line-left pl-8">
            <div className="text-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-3">System Catalogue v2.0</div>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold tracking-tight text-primary">PRODUCT<br />INVENTORY</h1>
            <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
              Access 500+ precision heating configurations. Use the sidebar module to filter by category or technical specification.
            </p>
          </div>

          {/* Search Module */}
          <div className="w-full md:w-80 group">
             <div className="text-muted font-mono text-[9px] uppercase tracking-[0.2em] mb-2 font-bold group-focus-within:text-primary transition-colors">Search Catalogue</div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60 group-focus-within:text-accent" />
                <input 
                  type="text" 
                  placeholder="ID / NAME / SPEC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-border pl-10 pr-4 py-3 text-xs font-mono font-bold focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all uppercase tracking-widest placeholder:text-muted/50"
                  style={{ borderRadius: 0 }}
                />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-0">

        {/* ── SIDEBAR CONTROL MODULE ───────────── */}
        <aside className="lg:w-64 shrink-0 lg:border-r border-border lg:pr-10 lg:mr-10">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Filter className="w-3.5 h-3.5 text-accent" /> Filter Products
            </div>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory('')}
                className="text-[9px] text-accent font-mono font-bold uppercase tracking-wider flex items-center gap-1 hover:underline transition-all"
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
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-muted hover:text-primary hover:bg-slate-50 hover:border-muted/30'
                }`}
              >
                <span>All Products</span>
                <span className={`text-[10px] opacity-60 group-hover:opacity-100 ${activeCategory === '' ? 'opacity-100 font-bold' : ''}`}>{productsData.length}</span>
              </button>
              {ALL_CATEGORIES.map(cat => {
                const count = productsData.filter(p => p.categoryLabel === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 text-xs font-mono font-bold transition-all border-l-4 group flex justify-between items-center uppercase tracking-wider ${
                      activeCategory === cat
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-transparent text-muted hover:text-primary hover:bg-slate-50 hover:border-muted/30'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className={`text-[10px] opacity-60 group-hover:opacity-100 ${activeCategory === cat ? 'opacity-100 font-bold' : ''}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Technical Help Box */}
            <div className="mt-10 p-6 bg-white border-l-4 border-accent border border-border">
               <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.3em] mb-2 text-accent">System Note</div>
               <p className="font-mono text-xs leading-relaxed text-primary font-bold">
                 All products are available with custom J/K type thermocouples and SS316 sheath configurations.
               </p>
            </div>
          </div>

          {/* Mobile filter chips */}
          <div className="lg:hidden flex gap-0 flex-wrap mb-8 border border-border">
            <button
              onClick={() => setActiveCategory('')}
              className={`flex-1 min-w-[33%] px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest border-r border-b border-border transition-all ${
                activeCategory === '' ? 'bg-secondary text-primary font-bold border-secondary' : 'bg-white text-muted hover:text-primary'
              }`}
            >
              ALL
            </button>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 min-w-[33%] px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest border-r border-b border-border transition-all truncate ${
                  activeCategory === cat ? 'bg-secondary text-primary font-bold border-secondary' : 'bg-white text-muted hover:text-primary'
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
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="font-mono text-[10px] font-bold text-muted uppercase tracking-[0.2em] flex items-center gap-3">
              <Activity className="w-3.5 h-3.5 text-accent" />
              Loaded: <strong className="text-primary">{filtered.length} SKUs Found</strong>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                  View Mode: <Grid className="w-3.5 h-3.5 text-accent" />
               </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24 border-2 border-dashed border-border bg-white"
              >
                <div className="font-mono text-xs font-bold text-muted uppercase tracking-[0.3em]">No Products Found</div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-0 border border-border bg-border">
                {filtered.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layoutProps={{ duration: 0.4 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="group border border-border bg-white relative flex flex-col h-full overflow-hidden"
                  >
                    <Link to={`/products/${product.category}/${product.slug}`} className="block relative flex-grow">
                      {/* Image Module */}
                      <div className="aspect-[4/3] w-full bg-white flex items-center justify-center overflow-hidden border-b border-border p-6 relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain hover:scale-102 transition-transform duration-300"
                        />
                      </div>

                      {/* Info Module */}
                      <div className="p-5 bg-white">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1">
                          {product.categoryLabel}
                        </div>
                        <h3 className="font-heading text-lg font-bold text-primary tracking-tight">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
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
