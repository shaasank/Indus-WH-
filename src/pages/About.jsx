import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Award } from 'lucide-react';
import pvtCert from '../assets/products/pvt.jpg';
import aboutHeroImg from '../assets/products/1.png';

const timeline = [
  { year: '2002', label: 'Established', desc: 'Founded in Chennai with a focus on industrial heating elements.' },
  { year: '2008', label: 'Expanded', desc: 'Grew production capacity and entered new industrial verticals.' },
  { year: '2015', label: 'Mutlur Plant', desc: 'Opened dedicated manufacturing facility in Mutlur.' },
  { year: 'Now', label: 'Indus Heaters Pvt Ltd', desc: 'Supplying 500+ custom products annually across 4 locations.' },
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
    <div className="bg-white text-primary">

      {/* Hero */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-accent" />
              <span className="text-accent font-heading text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-none mb-6 text-primary">
              PRECISION.<br />
              <span className="text-accent">EXPERIENCE.</span><br />
              TRUST.
            </h1>
            <p className="text-primary/80 leading-relaxed text-base">
              Since 2002, Indus Heaters has built its reputation delivering heating elements with zero tolerance for failure. Based in Chennai, we serve plastic, polymer, rubber and chemical industries across India and beyond.
            </p>
          </motion.div>

          <div className="border border-border overflow-hidden h-72 sm:h-80 lg:h-[420px] w-full relative bg-white">
            <img
              src={aboutHeroImg}
              alt="Indus Heaters Industrial Manufacturing Facility"
              style={{ objectPosition: '80% center' }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Corporate Milestone - Full-Bleed 100vw Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-b border-border py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 w-full h-[50vh] lg:h-[70vh] bg-white flex items-center justify-center p-4">
            <img
              src={pvtCert}
              alt="Indus Heaters Private Limited Corporate Certificate"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-[0.25em] mb-3">
              <Award className="w-4 h-4 text-accent" /> Corporate Milestone
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              Indus Heaters<br />
              <span className="text-accent">Private Limited</span>
            </h2>
            <p className="text-base text-primary/80 leading-relaxed font-medium mb-4">
              Formally incorporated as a Private Limited entity, solidifying 22+ years of industrial engineering excellence.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Our official Private Limited incorporation reflects our unwavering commitment to quality standards, compliance, and expanded manufacturing infrastructure serving top-tier engineering clients nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-[2px] bg-accent" />
          <span className="text-accent font-heading text-xs font-bold uppercase tracking-[0.2em]">History</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border">
          {timeline.map((item, i) => (
            <div key={i} className="p-8 border-b sm:border-b-0 lg:border-r border-border last:border-r-0 group hover:bg-muted/5 transition-colors">
              <div className="font-heading text-4xl font-bold text-accent mb-2">{item.year}</div>
              <div className="font-heading text-lg font-bold text-primary mb-3 uppercase tracking-wide">{item.label}</div>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-[2px] bg-accent" />
          <span className="text-accent font-heading text-xs font-bold uppercase tracking-[0.2em]">Values</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
          {values.map((v, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-border last:border-0">
              <div className="w-8 h-[3px] bg-secondary mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-3 text-primary">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-[2px] bg-accent" />
          <span className="text-accent font-heading text-xs font-bold uppercase tracking-[0.2em]">Locations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
          {locations.map((loc, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-border last:border-0">
              <MapPin className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading text-xl font-bold mb-1 text-primary">{loc.city}</h3>
              <p className="text-sm text-muted mb-4">{loc.address}</p>
              <div className="flex items-center gap-2 text-sm text-primary/80 mb-2"><Phone className="w-3.5 h-3.5 text-secondary" /> {loc.phone}</div>
              <div className="flex items-center gap-2 text-sm text-primary/80"><Mail className="w-3.5 h-3.5 text-secondary" /> {loc.email}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
