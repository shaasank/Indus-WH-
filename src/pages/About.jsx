import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2002', label: 'Established', desc: 'Founded in Chennai with a focus on industrial heating elements.' },
  { year: '2008', label: 'Expanded', desc: 'Grew production capacity and entered new industrial verticals.' },
  { year: '2015', label: 'Mutlur Plant', desc: 'Opened dedicated manufacturing facility in Mutlur.' },
  { year: 'Now', label: 'Leading South India', desc: 'Supplying 500+ custom products annually across 4 locations.' },
];

const values = [
  { title: 'Precision', desc: 'Every heater is engineered to exact customer specifications — no compromises.' },
  { title: 'Reliability', desc: 'Designed to perform in the most demanding industrial conditions.' },
  { title: 'Customization', desc: '100% application-specific — wattage, form factor, sheath material, thermocouple type.' },
];

const locations = [
  { city: 'Chennai HQ', address: 'Tamil Nadu, India', phone: '+91 44 0000 0000', email: 'info@indusheaters.com' },
  { city: 'Mutlur Plant', address: 'Tamil Nadu, India', phone: '+91 44 0000 0001', email: 'plant@indusheaters.com' },
];

export default function About() {
  return (
    <div className="bg-white text-[#000000]">

      {/* Hero */}
      <section className="border-b border-[#E2E5EC] bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px] bg-[#000000]" />
              <span className="text-[#000000] font-heading text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
            </div>
            <h1 className="font-heading text-6xl font-bold leading-none mb-6">
              PRECISION.<br />
              <span className="text-[#000000]">EXPERIENCE.</span><br />
              TRUST.
            </h1>
            <p className="text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Since 2002, Indus Heaters has built its reputation delivering heating elements with zero tolerance for failure. Based in Chennai, we serve plastic, polymer, rubber and chemical industries across India and beyond.
            </p>
          </motion.div>
          <div className="bg-[#E2E5EC] border border-[#E2E5EC] overflow-hidden h-72 lg:h-96">
            <img src="/images/DSC_0087.JPG" alt="Factory" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-[#E2E5EC]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-[2px] bg-[#000000]" />
          <span className="text-[#000000] font-heading text-xs font-bold uppercase tracking-[0.2em]">History</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E2E5EC]">
          {timeline.map((item, i) => (
            <div key={i} className="p-8 border-b sm:border-b-0 lg:border-r border-[#E2E5EC] last:border-r-0 group hover:bg-[#F3F4F6] transition-colors">
              <div className="font-heading text-4xl font-bold text-[#000000] mb-2">{item.year}</div>
              <div className="font-heading text-lg font-bold text-[#000000] mb-3 uppercase tracking-wide">{item.label}</div>
              <p className="text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-[#E2E5EC]">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-[2px] bg-[#000000]" />
          <span className="text-[#000000] font-heading text-xs font-bold uppercase tracking-[0.2em]">Values</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E2E5EC]">
          {values.map((v, i) => (
            <div key={i} className="p-10 border-b md:border-b-0 md:border-r border-[#E2E5EC] last:border-0">
              <div className="w-8 h-[3px] bg-[#000000] mb-5" />
              <h3 className="font-heading text-2xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-[2px] bg-[#000000]" />
          <span className="text-[#000000] font-heading text-xs font-bold uppercase tracking-[0.2em]">Locations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E2E5EC]">
          {locations.map((loc, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-[#E2E5EC] last:border-0">
              <MapPin className="w-5 h-5 text-[#000000] mb-3" />
              <h3 className="font-heading text-xl font-bold mb-1">{loc.city}</h3>
              <p className="text-sm text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>{loc.address}</p>
              <div className="flex items-center gap-2 text-sm text-[#4B5563] mb-2"><Phone className="w-3.5 h-3.5 text-[#000000]" /> {loc.phone}</div>
              <div className="flex items-center gap-2 text-sm text-[#4B5563]"><Mail className="w-3.5 h-3.5 text-[#000000]" /> {loc.email}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
