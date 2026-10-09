import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

import ourApproachImg from '../assets/products/5.png';

const heroImageModules = import.meta.glob('/src/assets/products/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const heroImages = Object.entries(heroImageModules)
  .filter(([path]) => !path.includes('pvt'))
  .map(([, img]) => img);

const categories = [
  { name: 'Tubular Heaters',       image: '/images/Tubular Heaters 1.jpg',                    slug: 'tubular-heaters',    desc: 'For air, liquid and solid heating — SS304 to Inconel.' },
  { name: 'Cartridge Heaters',     image: '/images/Low & High Density Cartridge Heaters.jpg', slug: 'cartridge-heaters',  desc: 'High-density swaged construction. Custom dia & wattage.' },
  { name: 'Band Heaters',          image: '/images/Mica Band Heaters.jpg',                    slug: 'band-heaters',       desc: 'Mica and ceramic variants for extrusion cylinders.' },
  { name: 'Coil Heaters',          image: '/images/IMG_9425 copy.jpg',                        slug: 'hot-runner',         desc: 'Fast response — J/K thermocouple built-in, 550°C.' },
  { name: 'Infrared Heaters',      image: '/images/16.jpg',                                   slug: 'infrared-heaters',   desc: 'Ceramic & silica types — 400–1300°C range.' },
  { name: 'Thermocouples',         image: '/images/15.jpg',                                   slug: 'thermocouples',      desc: 'MI-type in 1mm, 1.5mm, 3mm — customizable length.' },
];

const stats = [
  { value: '22', unit: 'Years', label: 'Established in 2002', icon: Activity },
  { value: '500+', unit: 'Products', label: 'Precision heating range', icon: Cpu },
  { value: '4', unit: 'Locations', label: 'Regional facilities', icon: ShieldCheck },
  { value: '100', unit: '%', label: 'Custom built capability', icon: Zap },
];

const industries = [
  'Plastic industry',
  'Packaging industry',
  'Corrugated industry',
  'Chennai industry',
  'Medical industry',
  'Food processing industry',
  'Engineering sectors',
  'Kitchen equipment manufacturing industry',
  'Powder coating industry',
  'Air conditioning systems',
  'Cold room industry',
  'Molds and dies heating industry',
  'Liquid heating industry (water, oil, chemical)',
  'Power plants',
  'Foundry',
  'Domestic applications',
  'PET performance blow moulding industry',
  'Rubber industry',
  'Automotive industry'
];

function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setCount(value);
      return;
    }

    const numericVal = parseInt(String(value).replace(/\D/g, ''), 10);
    if (isNaN(numericVal)) {
      setCount(value);
      return;
    }

    const end = numericVal;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration]);

  const numericVal = parseInt(String(value).replace(/\D/g, ''), 10);
  if (isNaN(numericVal)) return <span>{value}</span>;

  const prefix = String(value).match(/^[^\d]+/)?.[0] || '';
  const suffix = String(value).match(/[^\d]+$/)?.[0] || '';

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-primary">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-75px)] md:min-h-[520px] lg:min-h-[600px] flex items-stretch border-b border-border overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-stretch justify-between relative z-10 py-8 sm:py-12 md:py-0">
          
          {/* Mobile: Top (order-1), Desktop: Right Panel (md:order-2 md:w-1/2 md:absolute md:top-0 md:bottom-0 md:right-0) */}
          <div className="order-1 md:order-2 w-full md:w-1/2 md:absolute md:top-0 md:bottom-0 md:right-0 h-64 sm:h-80 md:h-full relative overflow-hidden bg-muted/5">
            {heroImages.map((imgSrc, idx) => (
              <img
                key={imgSrc}
                src={imgSrc}
                alt={`Indus Heaters product asset ${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                style={{ objectPosition: '85% center' }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

          {/* Mobile: Bottom (order-2), Desktop: Left Panel (md:order-1 md:w-1/2) */}
          <motion.div
            className="order-2 md:order-1 w-full md:w-1/2 py-8 sm:py-12 md:py-20 lg:py-24 md:pr-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-[44px] sm:text-[68px] lg:text-[88px] leading-[0.92] font-extrabold text-primary mb-6 sm:mb-8 tracking-tight">
              BUILT FOR<br />
              <span className="text-accent drop-shadow-sm">HEAT.</span><br />
              BUILT TO<br />
              <span className="text-accent drop-shadow-sm">LAST.</span>
            </h1>

            <p className="text-primary/80 text-base sm:text-lg leading-[1.8] mb-8 sm:mb-10 max-w-md font-medium">
              India's precision industrial heater manufacturer since 2002. Custom heating solutions for plastic, polymer and rubber industries, engineered to 0.1% tolerance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 font-heading font-bold text-sm uppercase tracking-[0.2em] min-h-[44px] shadow-sm hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Catalog Access <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-3 bg-white border-2 border-primary text-primary px-8 py-4 font-heading font-bold text-sm uppercase tracking-[0.2em] min-h-[44px] hover:bg-primary hover:text-white border-b-2 hover:border-secondary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>

        </div>
      </section>



      {/* ── PRODUCT CATEGORIES ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-4 border-accent pl-8">
          <div>
            <div className="text-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Product Range</div>
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-primary leading-tight">PRECISION<br />HEATING RANGE</h2>
          </div>
          <Link to="/products" className="mt-8 md:mt-0 flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all group">
            View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group border-b border-r border-border last:border-r-0 relative"
              style={{ borderRight: (idx + 1) % 3 === 0 ? 'none' : undefined }}
            >
              <Link to={`/products?category=${cat.slug}`} className="block h-full">
                {/* Image area */}
                <div className="aspect-[4/3] w-full bg-white overflow-hidden relative border-b border-border flex items-center justify-center p-5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {/* Text area - ONLY Heater Type & Product Name */}
                <div className="p-5 bg-white">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1">
                    {cat.name}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>



      {/* ── STATS - TECHNICAL READOUTS ────────────────── */}
      <section className="bg-accent text-white border-t-2 border-b-2 border-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-secondary/40 border-l border-r border-secondary/30">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-10 px-6 sm:px-8 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3 text-secondary">
                  <stat.icon className="w-5 h-5 shrink-0" />
                  <div className="h-[2px] w-full bg-secondary/40" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight border-b-2 border-secondary pb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="font-mono text-sm font-bold text-secondary">{stat.unit}</div>
                </div>
                <div className="text-white/90 text-[10px] uppercase tracking-[0.25em] font-mono font-bold mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRUCTURAL ─────────────────────────── */}
      <section className="border-b border-border bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center">

          {/* Mobile: Top (order-1), Desktop: Right (lg:order-2 lg:col-span-7) - Image Dominant */}
          <div className="order-1 lg:order-2 lg:col-span-7 w-full bg-white relative overflow-hidden group h-64 sm:h-80 lg:h-[480px]">
            <img
              src={ourApproachImg}
              alt="Indus Heaters Manufacturing Facility"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* Mobile: Bottom (order-2), Desktop: Left (lg:order-1 lg:col-span-5) - Text Block */}
          <div className="order-2 lg:order-1 lg:col-span-5 py-12 lg:py-16 pr-0 lg:pr-10 border-r border-border structural-line-left pl-6 lg:pl-10">
            <div className="text-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Our Approach</div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-[1.1] mb-6 tracking-tight">PRECISION.<br />EXPERIENCE.<br />UNWAVERING TRUST.</h2>
            <p className="text-primary/80 leading-relaxed mb-4 text-sm sm:text-base font-medium">
              Since inception in 2002, Indus Heaters has been the backbone for high-stakes industrial heating cycles. We don't just "make" heaters; we engineer thermal stability for environments where zero-downtime is the only acceptable metric.
            </p>
            <p className="text-primary/80 leading-relaxed mb-8 text-sm sm:text-base font-medium">
              Based in Chennai with ISO-aligned facilities in Mutlur, our engineers design to your application, not our catalogue.
            </p>
            <Link to="/about" className="btn-industrial inline-flex items-center gap-3 text-sm font-mono font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES TECHNICAL ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-border">
        <h2 className="font-heading text-[10px] font-bold uppercase tracking-[0.4em] text-muted mb-10 flex items-center gap-6">
          <span className="shrink-0">Industries We Serve</span>
          <div className="w-full h-[1px] bg-border" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border">
          {industries.map((ind, i) => (
            <span
              key={i}
              className="px-6 py-5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary border-b border-r border-border hover:bg-primary hover:text-white transition-all duration-300 cursor-default group flex justify-between items-center"
            >
              <span className="pr-2">{ind}</span>
              <span className="opacity-0 group-hover:opacity-100 text-[9px] text-secondary font-bold shrink-0">{String(i + 1).padStart(2, '0')}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER BRUTE ─────────────────────────── */}
      <section className="bg-primary py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="w-16 h-[6px] bg-secondary mb-8" />
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-6">
              CAN'T FIND<br />WHAT YOU NEED?<br /><span className="text-secondary italic">WE BUILD TO SPEC.</span>
            </h2>
            <p className="text-white/80 leading-[1.8] max-w-md text-lg">
              Custom wattage, diameter, voltage, and form factor. Describe your requirement and our engineering team will sync within 24 business hours.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              to="/enquiry"
              className="btn-industrial bg-accent text-white px-10 py-5 font-heading font-bold text-base uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-primary transition-all flex items-center gap-4"
            >
              Request Enquiry <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
