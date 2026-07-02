import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import { useCartStore } from '../store/useCartStore';
import { ClipboardList, Check, Download, Zap, Shield, ChevronRight, Plus, Minus, UploadCloud, Paperclip } from 'lucide-react';

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#000000]">
        <div className="font-mono text-xs font-bold text-[#E2E5EC] mb-4 uppercase tracking-[0.3em]">RESOURCE_NOT_FOUND</div>
        <h1 className="font-heading text-4xl font-bold mb-8">404_NULL_PRODUCT</h1>
        <Link to="/products" className="bg-[#000000] text-white px-8 py-3 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#111827] transition-all">
          ← RETURN_CATALOGUE
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
    <div className="bg-white text-[#000000]">

      {/* ── BREADCRUMB SYSTEM ─────────────────── */}
      <div className="border-b border-[#E2E5EC] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B7280]">
          <Link to="/" className="hover:text-[#000000] transition-colors">DB_HOME</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link to="/products" className="hover:text-[#000000] transition-colors">MOD_CATALOGUE</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-[#000000]/40 truncate">{product.categoryLabel.replace(/ /g, '_')}</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-[#000000]">{product.name.replace(/ /g, '_')}</span>
        </div>
      </div>

      {/* ── MAIN SYSTEM VIEW ──────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#E2E5EC]">

          {/* Left: Image Panel - Precise Framing */}
          <div className="lg:border-r border-[#E2E5EC] bg-[#F5F5F5] flex items-center justify-center p-16 relative overflow-hidden group">
            {/* Absolute Brand Line - 10/10 Polish */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#000000]" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E2E5EC]" />
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #000000 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }} />
            
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="max-h-[480px] w-full object-contain mix-blend-multiply relative z-10 drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <div className="absolute bottom-6 right-6 font-mono text-[9px] text-[#C9CDD8] uppercase tracking-[0.3em]">
               VIEW_RENDER: INDUS_V4.2
            </div>
          </div>

          {/* Right: Technical Specification Panel */}
          <div className="py-16 px-8 lg:px-16 flex flex-col justify-center bg-white relative">
            <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-[#C9CDD8] uppercase tracking-widest border-l border-b border-[#E2E5EC]">
               UNIT_ID: 1024_0{product.id}
            </div>

            {/* Category Marker */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#000000]" />
              <span className="text-[#000000] font-mono text-[10px] font-bold uppercase tracking-[0.3em]">{product.categoryLabel}</span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#000000] leading-[1.1] mb-6 tracking-tight">{product.name}</h1>
            <p className="text-[#6B7280] leading-[1.8] mb-10 text-lg border-l-2 border-[#E2E5EC] pl-8 italic font-body" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {product.fullDescription}
            </p>

            {/* ── SPECS TABLE BRUTAL ────────────────── */}
            <div className="mb-12">
              <div className="text-[10px] tracking-[0.3em] font-mono font-bold uppercase text-[#C9CDD8] mb-4 flex items-center gap-4">
                 <span className="shrink-0">DATASHEET_VER_0.8</span>
                 <div className="w-full h-[1px] bg-[#E2E5EC]" />
              </div>
              
              <div className="border border-[#E2E5EC] overflow-hidden">
                <table className="w-full text-sm border-collapse font-mono">
                  <thead>
                    <tr className="bg-[#000000] text-white/50 text-[10px] uppercase tracking-widest">
                       <th className="py-3 px-6 text-left border-r border-white/10 font-bold">PARAMETER</th>
                       <th className="py-3 px-6 text-left font-bold text-white">SPECIFICATION_VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#FAFAFA]">
                    {product.specs.map((spec, i) => (
                      <tr key={i} className="border-b border-[#E2E5EC] last:border-0 hover:bg-[#F3F4F6] group transition-colors">
                        <td className="py-4 px-6 font-bold text-[#4B5563] w-2/5 border-r border-[#E2E5EC] uppercase text-xs tracking-tight">
                          {spec.label.replace(/ /g, '_')}
                        </td>
                        <td className="py-4 px-6 text-[#000000] font-bold text-sm tracking-tighter">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Customization */}
            <div className="mb-12 border border-[#E2E5EC] bg-white">
              <div className="px-6 py-4 bg-[#FAFAFA] border-b border-[#E2E5EC] font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B7280]">
                CUSTOM_ORDER_DETAILS
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="font-mono text-[9px] text-[#C9CDD8] uppercase tracking-[0.25em] mb-2">NO_OF_PRODUCTS</div>
                  <div className="flex items-center border border-[#E2E5EC] w-fit bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#6B7280] hover:bg-[#000000] hover:text-white transition-all"
                      aria-label="Decrease product quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                      className="w-20 h-12 text-center text-base font-mono font-bold bg-[#F3F4F6] border-x border-[#E2E5EC] focus:outline-none focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      className="w-12 h-12 flex items-center justify-center text-[#6B7280] hover:bg-[#000000] hover:text-white transition-all"
                      aria-label="Increase product quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="border border-[#E2E5EC]">
                  <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#E2E5EC] font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B7280]">CUSTOM_MEASUREMENTS</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2E5EC]">
                    {(product.specs?.length ? product.specs : [{ label: 'Measurement' }]).map((spec, index) => {
                      const label = measurementLabels[index] || 'M' + (index + 1);
                      return (
                        <label key={label} className="bg-white px-4 py-3 flex items-center gap-3">
                          <span className="w-9 h-9 shrink-0 bg-[#000000] text-white flex items-center justify-center font-mono text-xs font-bold">{label}</span>
                          <input
                            type="text"
                            value={measurements[label] || ''}
                            onChange={(event) => handleMeasurementChange(label, event.target.value)}
                            placeholder={spec.label ? spec.label.toUpperCase() : 'CUSTOM_SIZE'}
                            className="min-w-0 flex-1 border-b-2 border-[#E2E5EC] px-0 py-2 text-xs font-mono font-bold text-[#000000] placeholder:text-[#C9CDD8]/60 focus:border-[#000000] focus:outline-none bg-transparent transition-all"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <div className="font-mono text-[9px] text-[#C9CDD8] uppercase tracking-[0.25em] mb-2">CUSTOM_DETAIL</div>
                  <input
                    type="text"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="ADD_NOTE..."
                    className="w-full text-xs font-mono border border-[#E2E5EC] px-4 py-3 text-[#000000] placeholder:text-[#C9CDD8]/50 focus:border-[#000000] focus:outline-none bg-[#FAFAFA]"
                  />
                </label>

                <div className="border border-dashed border-[#C9CDD8] bg-[#FAFAFA] p-5">
                  <label className="flex items-center justify-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#000000] cursor-pointer hover:text-[#111827]">
                    <UploadCloud className="w-5 h-5" />
                    ATTACH_SAMPLE_IMAGE_OR_PDF
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,application/pdf"
                      className="sr-only"
                      onChange={(event) => handleFileChange(event.target.files)}
                    />
                  </label>
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-1">
                      {attachments.map((file, fileIndex) => (
                        <div key={file.name + fileIndex} className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#4B5563] truncate">
                          <Paperclip className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                          <span className="truncate">{file.name.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs - Brute Priority */}
            <div className="flex flex-col sm:flex-row gap-0 border border-[#E2E5EC] shadow-2xl">
              <button
                onClick={handleAdd}
                className={`flex-[2] flex items-center justify-center gap-4 py-6 font-heading font-bold text-base uppercase tracking-[0.2em] transition-all relative group/add ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-[#000000] text-white hover:bg-[#111827]'
                }`}
              >
                {added ? <><Check className="w-5 h-5" /> SYSTEM_ADDED</> : <><ClipboardList className="w-5 h-5 group-hover/add:rotate-12 transition-transform" /> INITIALIZE_E_ORDER</>}
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 py-6 px-8 bg-white border-l border-[#E2E5EC] text-[#000000] font-heading font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#F5F5F5] transition-all group/dl">
                <Download className="w-4 h-4 text-[#000000] group-hover/dl:translate-y-1 transition-transform" /> 
                <span className="hidden sm:inline">DATA_SHEET</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── TECHNICAL DEEP DIVE ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#E2E5EC]">
          {/* Features - Structural List */}
          <div className="py-20 px-12 border-r border-[#E2E5EC] bg-[#FAFAFA]/50 group">
            <div className="flex items-center gap-4 mb-10">
              <Shield className="w-6 h-6 text-[#000000]" />
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">SYSTEM_ADVANTAGES</h2>
            </div>
            <div className="space-y-4">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 text-sm text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <div className="w-5 h-5 bg-[#000000] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="leading-relaxed border-b border-transparent group-hover:border-[#E2E5EC] transition-all">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications - Grid Module */}
          <div className="py-20 px-12">
            <div className="flex items-center gap-4 mb-10">
              <Zap className="w-6 h-6 text-[#000000]" />
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">ACTIVE_SECTORS</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.applications.map((app, i) => (
                <span
                  key={i}
                  className="px-6 py-4 border-l-2 border-[#000000] text-[10px] font-mono font-bold uppercase tracking-widest text-[#4B5563] bg-[#F5F5F5] hover:bg-[#000000] hover:text-white transition-all cursor-default"
                >
                  {app.replace(/ /g, '_')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED MODULES ───────────────────── */}
        {related.length > 0 && (
          <div className="py-24">
            <div className="flex items-center justify-between mb-12">
               <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">LINKED_SYSTEMS</h2>
               <div className="h-[2px] w-full max-w-sm bg-[#E2E5EC] mx-8 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#E2E5EC]">
              {related.map((rel, i) => (
                <Link
                  key={i}
                  to={`/products/${rel.category}/${rel.slug}`}
                  className="group border-r border-[#E2E5EC] last:border-0 p-10 hover:bg-[#F3F4F6] transition-all flex flex-col items-center text-center"
                >
                  <img src={rel.images[0]} alt={rel.name} className="w-24 h-24 object-contain mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-[9px] text-[#000000] font-mono font-bold uppercase tracking-[0.3em] mb-2">{rel.categoryLabel}</div>
                  <div className="font-heading text-xl font-bold text-[#000000] group-hover:text-[#000000] transition-colors">{rel.name}</div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 font-mono text-[8px] text-[#000000] tracking-widest transition-opacity uppercase">VIEW_SPEC_DATA →</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
