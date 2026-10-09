import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import { useCartStore } from '../store/useCartStore';
import { ClipboardList, Check, Download, Zap, Shield, ChevronRight, Plus, Minus, UploadCloud, Paperclip } from 'lucide-react';

const categoryToSlug = (category) => category ? category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

export default function ProductDetail() {
  const { productSlug } = useParams();
  const product = productsData.find(p => p.slug === productSlug);
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [measurements, setMeasurements] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [note, setNote] = useState('');
  const measurementLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary">
        <div className="font-mono text-xs font-bold text-muted mb-4 uppercase tracking-[0.3em]">Resource Not Found</div>
        <h1 className="font-heading text-4xl font-bold mb-8 text-primary">Product Not Found</h1>
        <Link to="/products" className="bg-accent text-white px-8 py-3 font-heading font-bold text-sm uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">
          ← Return to Catalogue
        </Link>
      </div>
    );
  }

  const handleMeasurementChange = (key, value) => {
    setMeasurements((current) => ({ ...current, [key]: value }));
  };

  const handleFileChange = (fileList) => {
    const nextFiles = Array.from(fileList || [])
      .filter((file) => file.type.startsWith('image/') || file.type === 'application/pdf')
      .slice(0, 5)
      .map((file) => ({ name: file.name, type: file.type, size: file.size }));

    setAttachments(nextFiles);
  };

  const handleAdd = () => {
    addItem(product, { quantity, measurements, attachments, note });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const related = productsData.filter(p => p.relatedProducts?.includes(product.slug)).slice(0, 3);

  return (
    <div className="bg-white text-primary">

      {/* ── BREADCRUMB SYSTEM ─────────────────── */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <Link to="/products" className="hover:text-accent transition-colors">Catalogue</Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <Link to={`/products?category=${categoryToSlug(product.categoryLabel)}`} className="hover:text-accent transition-colors">{product.categoryLabel}</Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-primary">{product.name}</span>
        </div>
      </div>

      {/* ── MAIN SYSTEM VIEW ──────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col border-b border-border">

          {/* TOP: Image Panel (Stacked Top) */}
          <div className="w-full bg-white flex items-center justify-center p-6 sm:p-10 relative overflow-hidden border-b border-border group min-h-[320px] sm:min-h-[420px]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-border" />
            

            
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full max-h-[70vh] object-contain relative z-10 drop-shadow-xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <div className="absolute bottom-4 right-6 font-mono text-[9px] text-muted uppercase tracking-[0.3em]">
               Render: Indus v4.2
            </div>
          </div>

          {/* BELOW: Product Details, Specifications and Enquiry Form */}
          <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white relative">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div>
                {/* Category Marker */}
                <div className="inline-flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] bg-accent" />
                  <span className="text-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em]">{product.categoryLabel}</span>
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-[1.1] tracking-tight">{product.name}</h1>
              </div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest px-3 py-1.5 border border-border shrink-0 self-start">
                 Unit ID: 1024-0{product.id}
              </div>
            </div>

            <p className="text-primary/80 leading-[1.8] mb-10 text-base border-l-2 border-border pl-6 italic max-w-4xl">
              {product.fullDescription}
            </p>

            {/* Content Layout: 1 column on mobile, 2 columns on lg screen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              
              {/* Column 1: Specifications & CTAs */}
              <div className="flex flex-col">
                {/* ── SPECS TABLE ────────────────── */}
                <div className="mb-8 flex-grow">
                  <div className="text-[10px] tracking-[0.3em] font-mono font-bold uppercase text-muted mb-3 flex items-center gap-4">
                     <span className="shrink-0">Datasheet v0.8</span>
                     <div className="w-full h-[1px] bg-border" />
                  </div>
                  
                  <div className="border border-border overflow-hidden">
                    <table className="w-full text-sm border-collapse font-mono">
                      <thead>
                        <tr className="bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest">
                           <th className="py-3 px-6 text-left border-r border-primary/20 font-bold">Parameter</th>
                           <th className="py-3 px-6 text-left font-extrabold text-primary">Specification Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-muted/5">
                        {product.specs.map((spec, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10 group transition-colors">
                            <td className="py-3.5 px-6 font-bold text-primary/70 w-2/5 border-r border-border uppercase text-xs tracking-tight">
                              {spec.label}
                            </td>
                            <td className="py-3.5 px-6 text-primary font-bold text-sm tracking-tight">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-0 border border-border shadow-lg mt-auto">
                  <button
                    onClick={handleAdd}
                    className={`flex-[2] flex items-center justify-center gap-3 py-5 font-heading font-bold text-base uppercase tracking-[0.2em] transition-all relative group/add ${
                      added
                        ? 'bg-secondary text-primary font-bold'
                        : 'bg-accent text-white hover:bg-secondary hover:text-primary'
                    }`}
                  >
                    {added ? <><Check className="w-5 h-5" /> Added to Enquiry</> : <><ClipboardList className="w-5 h-5 group-hover/add:rotate-12 transition-transform" /> Add to Enquiry</>}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-5 px-6 bg-white border-l border-border text-primary font-heading font-bold text-sm uppercase tracking-[0.2em] hover:bg-muted/10 transition-all group/dl">
                    <Download className="w-4 h-4 text-accent group-hover/dl:translate-y-0.5 transition-transform" /> 
                    <span className="hidden sm:inline">Data Sheet</span>
                  </button>
                </div>
              </div>

              {/* Column 2: Custom Order & Form Details */}
              <div>
                <div className="border border-border bg-white">
                  <div className="px-6 py-3.5 bg-muted/5 border-b border-border font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Custom Order Details
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="font-mono text-[9px] text-muted uppercase tracking-[0.25em] mb-2">Quantity</div>
                      <div className="flex items-center border border-border w-fit bg-white">
                        <button
                          type="button"
                          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                          className="w-10 h-10 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"
                          aria-label="Decrease product quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                          className="w-16 h-10 text-center text-base font-mono font-bold bg-muted/5 border-x border-border focus:outline-none focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity((current) => current + 1)}
                          className="w-10 h-10 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"
                          aria-label="Increase product quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="border border-border">
                      <div className="px-4 py-2.5 bg-muted/5 border-b border-border font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-muted">Custom Measurements</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                        {(product.specs?.length ? product.specs : [{ label: 'Measurement' }]).map((spec, index) => {
                          const label = measurementLabels[index] || 'M' + (index + 1);
                          return (
                            <label key={label} className="bg-white px-4 py-3 flex items-center gap-3">
                              <span className="w-8 h-8 shrink-0 bg-secondary text-primary flex items-center justify-center font-mono text-xs font-bold">{label}</span>
                              <input
                                type="text"
                                value={measurements[label] || ''}
                                onChange={(event) => handleMeasurementChange(label, event.target.value)}
                                placeholder={spec.label ? spec.label.toUpperCase() : 'Custom Size'}
                                className="min-w-0 flex-1 border-b-2 border-border px-0 py-1.5 text-xs font-mono font-bold text-primary placeholder:text-muted/50 focus:border-accent focus:outline-none bg-transparent transition-all"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <label className="block">
                      <div className="font-mono text-[9px] text-muted uppercase tracking-[0.25em] mb-2">Custom Details</div>
                      <input
                        type="text"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="Add note..."
                        className="w-full text-xs font-mono border border-border px-4 py-3 text-primary placeholder:text-muted/50 focus:border-accent focus:outline-none bg-muted/5"
                      />
                    </label>

                    <div className="border border-dashed border-border bg-muted/5 p-4">
                      <label className="flex items-center justify-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-primary cursor-pointer hover:text-accent">
                        <UploadCloud className="w-5 h-5 text-accent" />
                        Attach Sample Image or PDF
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,application/pdf"
                          className="sr-only"
                          onChange={(event) => handleFileChange(event.target.files)}
                        />
                      </label>
                      {attachments.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {attachments.map((file, fileIndex) => (
                            <div key={file.name + fileIndex} className="flex items-center gap-2 text-[10px] font-mono font-bold text-primary/70 truncate">
                              <Paperclip className="w-3.5 h-3.5 text-accent shrink-0" />
                              <span className="truncate">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── TECHNICAL DEEP DIVE ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Features */}
          <div className="py-16 px-8 lg:px-12 border-r border-border bg-muted/5 group">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">System Advantages</h2>
            </div>
            <div className="space-y-4">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 text-sm text-primary/80">
                  <div className="w-5 h-5 bg-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="leading-relaxed border-b border-transparent group-hover:border-border transition-all">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="py-16 px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-secondary" />
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">Active Sectors</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.applications.map((app, i) => (
                <span
                  key={i}
                  className="px-5 py-3.5 border-l-2 border-secondary text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-muted/5 hover:bg-secondary transition-all cursor-default"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED MODULES ───────────────────── */}
        {related.length > 0 && (
          <div className="py-16">
            <div className="flex items-center justify-between mb-8">
               <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-primary">Related Products</h2>
               <div className="h-[2px] w-full max-w-sm bg-border mx-8 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-border">
              {related.map((rel, i) => (
                <Link
                  key={i}
                  to={`/products/${rel.category}/${rel.slug}`}
                  className="group border-r border-border last:border-0 p-8 hover:bg-muted/5 transition-all flex flex-col items-center text-center"
                >
                  <img src={rel.images[0]} alt={rel.name} className="w-24 h-24 object-contain mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-[9px] text-accent font-mono font-bold uppercase tracking-[0.3em] mb-2">{rel.categoryLabel}</div>
                  <div className="font-heading text-lg font-bold text-primary group-hover:text-accent transition-colors">{rel.name}</div>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 font-mono text-[8px] text-accent tracking-widest transition-opacity uppercase">View Specs →</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
