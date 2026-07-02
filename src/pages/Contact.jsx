import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const locations = [
  { city: 'Chennai — Headquarters', address: '123 Industrial Estate, Ambattur, Chennai 600058, Tamil Nadu', phone: '+91 44 0000 0000', email: 'info@indusheaters.com' },
  { city: 'Mutlur — Manufacturing Plant', address: 'Mutlur Industrial Zone, Chidambaram, Tamil Nadu 608301', phone: '+91 44 0000 0001', email: 'plant@indusheaters.com' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="bg-white text-[#000000]">

      {/* Page Header */}
      <div className="bg-[#F5F5F5] border-b border-[#E2E5EC]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[2px] bg-[#000000]" />
            <span className="text-[#000000] font-heading text-xs font-bold uppercase tracking-[0.2em]">Get In Touch</span>
          </div>
          <h1 className="font-heading text-5xl font-bold">Contact Us</h1>
          <p className="text-[#6B7280] mt-2 max-w-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Reach out with product questions, custom requirements, or general enquiries. Our team responds within 24 business hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#E2E5EC]">

          {/* ── CONTACT FORM (3/5) ── */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#E2E5EC]">
            <div className="px-8 py-6 border-b border-[#E2E5EC] bg-[#F5F5F5]">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wide">Send a Message</h2>
            </div>

            {submitted ? (
              <div className="px-8 py-16 text-center">
                <div className="w-12 h-12 bg-green-600 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Message Sent</h3>
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{ label: 'Full Name', type: 'text' }, { label: 'Company', type: 'text' }].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-1">{f.label} *</label>
                      <input required type={f.type} className="w-full border border-[#E2E5EC] px-3 py-2.5 text-sm focus:border-[#000000] focus:outline-none transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{ label: 'Email', type: 'email' }, { label: 'Phone', type: 'tel' }].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-1">{f.label} *</label>
                      <input required type={f.type} className="w-full border border-[#E2E5EC] px-3 py-2.5 text-sm focus:border-[#000000] focus:outline-none transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-1">Message *</label>
                  <textarea required rows={5} className="w-full border border-[#E2E5EC] px-3 py-2.5 text-sm focus:border-[#000000] focus:outline-none transition-colors resize-y" placeholder="Describe your requirement or question..." style={{ fontFamily: 'Roboto, sans-serif' }} />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[#000000] text-white py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#111827] transition-colors disabled:opacity-60">
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          {/* ── LOCATIONS (2/5) ── */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="px-8 py-6 border-b border-[#E2E5EC] bg-[#F5F5F5]">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wide">Our Locations</h2>
            </div>

            <div className="divide-y divide-[#E2E5EC] flex-1">
              {locations.map((loc, i) => (
                <div key={i} className="p-8 hover:bg-[#F5F5F5] transition-colors">
                  <div className="flex items-start gap-3 mb-5">
                    <MapPin className="w-4 h-4 text-[#000000] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-heading text-base font-bold uppercase tracking-wide mb-1">{loc.city}</div>
                      <p className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{loc.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#4B5563] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Phone className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                    <a href={`tel:${loc.phone}`} className="hover:text-[#000000] transition-colors">{loc.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Mail className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                    <a href={`mailto:${loc.email}`} className="hover:text-[#000000] transition-colors">{loc.email}</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="p-8 bg-[#F3F4F6] border-t border-[#E2E5EC]">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#000000]" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#000000]">Business Hours</span>
              </div>
              <div className="text-sm text-[#4B5563] space-y-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div className="flex justify-between"><span>Monday – Friday</span><span className="font-semibold">9:00 – 18:00</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-semibold">9:00 – 14:00</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-6 border border-[#E2E5EC] overflow-hidden h-72 bg-[#F5F5F5] flex items-center justify-center">
          <iframe
            title="Indus Heaters Chennai Location"
            src="https://maps.google.com/maps?q=Ambattur+Industrial+Estate,+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
