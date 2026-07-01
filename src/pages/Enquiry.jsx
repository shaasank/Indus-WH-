import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Server, Send, User, Activity, ArrowRight, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';

export default function Enquiry() {
  const { items, removeItem, clearCart, getTotalCount } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/enquiry/success');
    }, 1500);
  };

  return (
    <div className="bg-white text-[#0A0F1A]">

      {/* ── ENQUIRY SYSTEM HEADER ─────────────── */}
      <div className="bg-[#FAFAFA] border-b border-[#E2E5EC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `linear-gradient(#1B4EDB 1px, transparent 1px), linear-gradient(90deg, #1B4EDB 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="structural-line-left pl-8">
            <div className="text-[#1B4EDB] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">SYSTEM_STATUS: ACTIVE</div>
            <h1 className="font-heading text-6xl font-bold tracking-tight text-[#0A0F1A]">ENQUIRY<br />CONSOLE</h1>
            <p className="text-[#6B7280] mt-6 max-w-lg font-body text-base leading-relaxed">
              Review your module configuration and initialize the quote sequence. Our engineering team parses all incoming specifications within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* ── SYSTEM EMPTY STATE ────────────────── */}
      {items.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center border-b border-[#E2E5EC] bg-[#FAFAFA]/50">
          <div className="w-20 h-20 bg-[#EBF0FF] flex items-center justify-center mb-8 relative">
             <div className="absolute inset-0 border-2 border-dashed border-[#1B4EDB] animate-spin-[20s]" />
             <ShoppingBag className="w-10 h-10 text-[#1B4EDB]" />
          </div>
          <h2 className="font-heading text-4xl font-bold mb-4 uppercase tracking-tight">NULL_ARRAY_DETECTED</h2>
          <p className="text-[#6B7280] mb-10 font-mono text-xs uppercase tracking-[0.2em]">NO_MODULES_LOADED_FOR_ENQUIRY</p>
          <Link to="/products" className="bg-[#1B4EDB] text-white px-10 py-5 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#1340B5] transition-all flex items-center gap-3">
            INITIALIZE_CATALOGUE_ACCESS <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#E2E5EC] shadow-xl">

            {/* ── LEFT PANEL: CONFIGURATION LIST (2/5) ── */}
            <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[#E2E5EC] bg-white">
              {/* Header Module */}
              <div className="flex items-center justify-between px-8 py-6 bg-[#0A0F1A] text-white">
                <div className="flex items-center gap-3">
                   <Server className="w-5 h-5 text-[#1B4EDB]" />
                   <span className="font-mono text-xs font-bold uppercase tracking-widest underline decoration-[#1B4EDB] decoration-2">LOADED_MODULES</span>
                </div>
                <div className="font-mono text-xl font-bold text-[#1B4EDB] tracking-tighter">
                   0{getTotalCount()}
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E2E5EC]">
                {items.map((item) => (
                  <div key={item.id} className="p-6 sm:p-8 flex flex-col gap-5 group hover:bg-[#FAFAFA] transition-all">
                    <div className="flex gap-5">
                      <div className="w-24 h-24 bg-white border border-[#E2E5EC] shrink-0 flex items-center justify-center p-3 relative">
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#1B4EDB]" />
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#1B4EDB] mb-1">{item.category.replace(/ /g, '_')}</div>
                        <div className="font-heading text-lg font-bold text-[#0A0F1A] leading-tight mb-3 tracking-tight group-hover:text-[#1B4EDB] transition-colors">{item.name}</div>
                        <div className="inline-flex items-center border border-[#E2E5EC] bg-[#EBF0FF] px-3 py-2 font-mono text-[10px] font-bold text-[#0A0F1A] uppercase tracking-[0.15em]">
                          NO_OF_PRODUCTS: {item.quantity}
                        </div>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-[#C9CDD8] hover:text-red-500 transition-colors self-start pt-2" aria-label={'Remove ' + item.name}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {item.measurements && Object.values(item.measurements).some(Boolean) && (
                      <div className="border border-[#E2E5EC] bg-white">
                        <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#E2E5EC] font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6B7280]">
                          CUSTOMER_MEASUREMENTS
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2E5EC]">
                          {Object.entries(item.measurements).filter(([, value]) => value).map(([label, value]) => (
                            <div key={label} className="bg-white p-4 flex items-center gap-3">
                              <span className="w-8 h-8 shrink-0 bg-[#0A0F1A] text-white flex items-center justify-center font-mono text-xs font-bold">{label}</span>
                              <span className="min-w-0 flex-1 text-xs font-mono font-bold text-[#0A0F1A] break-words">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.attachments?.length > 0 && (
                      <div className="border border-[#E2E5EC] bg-[#FAFAFA] p-4">
                        <div className="font-mono text-[8px] text-[#C9CDD8] uppercase tracking-[0.2em] mb-2">ATTACHED_SAMPLES</div>
                        <div className="space-y-1">
                          {item.attachments.map((file, index) => (
                            <div key={file.name + index} className="flex items-center gap-2 text-[9px] font-mono font-bold text-[#3A3F4B] truncate">
                              <Paperclip className="w-3 h-3 text-[#1B4EDB] shrink-0" />
                              <span className="truncate">{file.name.toUpperCase()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.note && (
                      <div className="border-l-2 border-[#1B4EDB] bg-[#FAFAFA] px-4 py-3">
                        <div className="font-mono text-[8px] text-[#C9CDD8] uppercase tracking-[0.2em] mb-1">CUSTOM_DETAIL</div>
                        <div className="text-xs font-mono font-bold text-[#0A0F1A] break-words">{item.note}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sticky Action Footer */}
              <div className="p-8 border-t border-[#E2E5EC] bg-[#FAFAFA]">
                <button onClick={clearCart} className="w-full text-center text-[10px] font-mono font-bold uppercase tracking-widest text-red-400/50 hover:text-red-500 transition-colors mb-6">
                   PURGE_CURRENT_DATABASE
                </button>
                <Link to="/products" className="btn-industrial block text-center text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#1B4EDB] border-2 border-[#1B4EDB] py-4 hover:bg-[#1B4EDB] hover:text-white transition-all">
                  + RE-ENTER_CATALOGUE
                </Link>
              </div>
            </div>

            {/* ── RIGHT PANEL: PROTOCOL FORM (3/5) ── */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col bg-white">
              
              {/* STATUS BAR TOP */}
              <div className="px-10 py-6 border-b border-[#E2E5EC] bg-[#FAFAFA] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7280]">PROTOCOL_01: CUSTOMER_DATA_LINK</span>
                 </div>
                 <div className="font-mono text-[10px] font-bold text-[#1B4EDB]">PARSING_READY</div>
              </div>

              {/* Section 1 - Customer Data */}
              <div className="px-10 py-10 border-b border-[#E2E5EC]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'SYS_AUTH_NAME', type: 'text', required: true, icon: User },
                    { label: 'CORP_IDENTIFIER', type: 'text', required: true, icon: Server },
                    { label: 'DATA_LINK_EMAIL', type: 'email', required: true, icon: Send },
                    { label: 'VAL_COMM_TEL', type: 'tel', required: true, placeholder: '10-DIGIT_INT' },
                  ].map(f => (
                    <div key={f.label} className="group/field">
                      <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#6B7280] mb-2 group-focus-within/field:text-[#1B4EDB] transition-colors">
                        {f.label}{f.required && <span className="text-[#1B4EDB] ml-1">*</span>}
                      </label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder || ''}
                        className="w-full border-b-2 border-[#E2E5EC] px-0 py-3 text-sm font-bold text-[#0A0F1A] focus:border-[#1B4EDB] focus:outline-none bg-transparent transition-all placeholder:text-[#C9CDD8]/30 tracking-tight"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 - Technical Pack */}
              <div className="px-10 py-10 border-b border-[#E2E5EC] bg-[#FAFAFA]/30">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-8 flex items-center gap-4">
                    <span>PROTOCOL_02: REQUIREMENTS_ENCRYPTION</span>
                    <div className="h-[1px] w-full bg-[#E2E5EC]" />
                 </div>
                <div className="space-y-8">
                  <div>
                    <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#6B7280] mb-2">PROJECT_SUBJECT *</label>
                    <input
                      type="text"
                      required
                      className="w-full border-b-2 border-[#E2E5EC] px-0 py-3 text-sm font-bold text-[#0A0F1A] focus:border-[#1B4EDB] focus:outline-none bg-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#6B7280] mb-2">SYSTEM_SPECIFICATION_OVERVIEW *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Input operating temperatures, physical dimensions, material constraints, and voltage parameters..."
                      className="w-full border-2 border-[#E2E5EC] p-4 text-sm font-bold text-[#0A0F1A] focus:border-[#1B4EDB] focus:outline-none bg-white transition-all resize-y min-h-[160px]"
                    />
                  </div>
                </div>
              </div>

              {/* DATA SEND MODULE BRUTAL */}
              <div className="px-10 py-12 mt-auto bg-[#FAFAFA]">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1B4EDB] text-white py-6 font-heading font-bold text-xl uppercase tracking-[0.3em] hover:bg-[#1340B5] transition-all disabled:opacity-60 relative group overflow-hidden shadow-2xl"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                     {loading ? 'TRANSMITTING_DATA...' : 'EXECUTE_ENQUIRY_TRANSMISSION'}
                     {!loading && <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" /> }
                  </div>
                  <div className="absolute top-0 right-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-700 pointer-events-none" />
                </button>
                <div className="mt-4 flex items-center justify-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6B7280]">
                    <Activity className="w-3.5 h-3.5 text-green-500" />
                    EST_RESPONSE_TIME: 24_HOURS_UTC+5:30
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
