import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Award } from 'lucide-react';
import pvtCert from '../assets/products/pvt.jpg';
import aboutHeroImg from '../assets/products/1.png';
import redLogo from '../assets/red.jpeg';
import SectionHeading from '../components/SectionHeading';
import StatsBar from '../components/StatsBar';

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
    <div className="bg-white text-primary font-heading font-light">

      {/* Hero */}
      <section className="border-b border-muted/15 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <SectionHeading
              label="Our Story"
              title={<>PRECISION.<br /><span className="text-accent">EXPERIENCE.</span><br />TRUST.</>}
              theme="on-white"
            />
            {/* Color Mix: Grey Paragraph on White */}
            <p className="text-primary leading-[1.25] text-base font-normal">
              Since 2002, Indus Heaters has built its reputation delivering heating elements with zero tolerance for failure. Based in Chennai, we serve plastic, polymer, rubber and chemical industries across India and beyond.
            </p>
          </motion.div>

          <div className="border border-muted/15 overflow-hidden h-72 sm:h-80 lg:h-[420px] w-full relative bg-white">
            <img
              src={aboutHeroImg}
              alt="Indus Heaters Industrial Manufacturing Facility"
              style={{ objectPosition: '80% center' }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Unified Stats Bar */}
      <StatsBar />

      {/* Corporate Milestone */}
      <section className="w-full bg-white border-b border-muted/15 py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 w-full h-[40vh] lg:h-[60vh] bg-white flex items-center justify-center p-4 border border-muted/15">
            <img
              src={pvtCert}
              alt="Indus Heaters Private Limited Corporate Certificate"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-heading font-light uppercase tracking-[0.25em] mb-3">
              <Award className="w-4 h-4 text-accent" /> Corporate Milestone
            </div>
            {/* Color Mix: Red Heading */}
            <h2 className="font-heading font-light text-3xl sm:text-4xl lg:text-5xl text-accent mb-4 leading-[1.25] uppercase">
              Indus Heaters<br />
              <span className="text-accent">Private Limited</span>
            </h2>
            {/* Color Mix: Grey Paragraph */}
            <p className="text-base text-primary leading-[1.25] font-normal mb-4">
              Formally incorporated as a Private Limited entity, solidifying 22+ years of industrial engineering excellence.
            </p>
            <p className="text-sm text-primary/80 leading-[1.25] font-normal">
              Our official Private Limited incorporation reflects our unwavering commitment to quality standards, compliance, and expanded manufacturing infrastructure serving top-tier engineering clients nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20 border-b border-muted/15">
        <SectionHeading label="History" title="COMPANY MILESTONES" theme="on-white" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-muted/15">
          {timeline.map((item, i) => (
            <div key={i} className="p-8 border-b sm:border-b-0 lg:border-r border-muted/15 last:border-r-0 group hover:bg-muted/5 transition-colors">
              <div className="font-heading text-4xl font-light text-accent mb-2">{item.year}</div>
              <div className="font-heading text-lg font-light text-accent mb-3 uppercase tracking-wide">{item.label}</div>
              <p className="text-sm text-primary leading-[1.25] font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20 border-b border-muted/15">
        <SectionHeading label="Values" title="OUR CORE PRINCIPLES" theme="on-white" />
        <div className="grid grid-cols-1 md:grid-cols-3 border border-muted/15">
          {values.map((v, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-muted/15 last:border-0">
              <div className="w-8 h-[2px] bg-accent mb-4" />
              <h3 className="font-heading text-2xl font-light mb-3 text-accent uppercase">{v.title}</h3>
              <p className="text-sm text-primary leading-[1.25] font-normal">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <SectionHeading label="Locations" title="OUR FACILITIES" theme="on-white" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-muted/15">
          {locations.map((loc, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-muted/15 last:border-0">
              <MapPin className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading text-xl font-light mb-1 text-accent uppercase">{loc.city}</h3>
              <p className="text-sm text-primary mb-4 font-normal leading-[1.25]">{loc.address}</p>
              <div className="flex items-center gap-2 text-sm text-primary mb-2 font-normal leading-[1.25]"><Phone className="w-3.5 h-3.5 text-accent" /> {loc.phone}</div>
              <div className="flex items-center gap-2 text-sm text-primary font-normal leading-[1.25]"><Mail className="w-3.5 h-3.5 text-accent" /> {loc.email}</div>
            </div>
          ))}
        </div>

        {/* Brand closing logo */}
        <div className="mt-16 flex flex-col items-center gap-4 py-10 border-t border-muted/15">
          <img src={redLogo} alt="Indus Heaters" className="h-14 w-auto object-contain opacity-90" />
          <p className="text-xs font-heading font-light uppercase tracking-[0.3em] text-primary/60">Built For Heat. Built To Last.</p>
        </div>
      </section>
    </div>
  );
}
