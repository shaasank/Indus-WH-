import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

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
  'Injection Molding', 'Blow Molding', 'Extrusion',
  'Hot Runner Systems', 'Die Casting', 'Chemical Processing',
  'Packaging', 'Ovens & Dryers', 'Printing'
];

export default function Home() {
  return (
    <div className="bg-white text-[#000000]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-75px)] md:min-h-[calc(100vh-83px)] flex items-center border-b border-[#E2E5EC] overflow-hidden bg-white">
        <img
          src="/images/41.jpg"
          alt="Indus Heaters coil heater range"
          className="absolute inset-y-0 right-0 h-full w-full md:w-[60%] object-cover object-right"
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-[62%] bg-white pointer-events-none" />
        <div className="absolute inset-y-0 left-[52%] hidden md:block w-[16%] bg-gradient-to-r from-white to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            className="max-w-2xl py-16 sm:py-20 lg:py-24"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-[56px] sm:text-[76px] lg:text-[104px] leading-[0.9] font-extrabold text-[#000000] mb-8 sm:mb-10 tracking-tight">
              BUILT FOR<br />
              <span className="text-[#000000] drop-shadow-sm">HEAT.</span><br />
              BUILT TO<br />
              <span className="text-[#000000] drop-shadow-sm">LAST.</span>
            </h1>

            <p className="text-[#4B5563] text-base sm:text-lg leading-[1.8] mb-10 sm:mb-12 max-w-md font-body font-medium">
              India's precision industrial heater manufacturer since 2002. Custom heating solutions for plastic, polymer and rubber industries, engineered to 0.1% tolerance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="btn-industrial bg-[#000000] text-white px-8 sm:px-10 py-5 font-heading font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#111827] transition-all flex items-center gap-3"
              >
                Catalog Access <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/enquiry"
                className="btn-industrial border-2 border-[#000000] bg-white/70 text-[#000000] px-8 sm:px-10 py-5 font-heading font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#000000] hover:text-white transition-all"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-b border-[#E2E5EC] overflow-hidden bg-[#000000] py-3 h-14 flex items-center">
        <div className="marquee-track">
          {[...Array(4)].map((_, rep) => (
            ['TUBULAR HEATERS', 'CARTRIDGE HEATERS', 'BAND HEATERS', 'COIL HEATERS', 'HOT RUNNER', 'MANIFOLD HEATERS', 'INFRARED HEATERS', 'THERMOCOUPLES'].map((item, i) => (
              <span key={`${rep}-${i}`} className="font-mono font-bold text-[11px] tracking-[0.4em] text-white px-12 border-r border-white/20 last:border-0 h-full flex items-center opacity-80 hover:opacity-100 transition-opacity">
                {item}
              </span>
            ))
          ))}
        </div>
      </div>

      {/* ── PRODUCT CATEGORIES ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-4 border-[#000000] pl-8">
          <div>
            <div className="text-[#000000] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Product Range</div>
            <h2 className="font-heading text-6xl font-bold text-[#000000] leading-tight">PRECISION<br />HEATING RANGE</h2>
          </div>
          <Link to="/products" className="mt-8 md:mt-0 flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#000000] hover:gap-6 transition-all group">
            View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#E2E5EC]">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group border-b border-r border-[#E2E5EC] last:border-r-0 relative"
              style={{ borderRight: (idx + 1) % 3 === 0 ? 'none' : undefined }}
            >
              {/* Scanline Animation on Hover */}


              <Link to={`/products?category=${cat.slug}`} className="block h-full">
                {/* Image area */}
                <div className="h-64 bg-white overflow-hidden relative border-b border-[#E2E5EC] flex items-center justify-center p-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#FAFAFA]/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                {/* Text area */}
                <div className="p-8 bg-white group-hover:bg-[#F5F5F5] transition-all duration-300">
                  <h3 className="font-heading text-2xl font-bold text-[#000000] mb-3 group-hover:text-[#000000] transition-colors tracking-tight">{cat.name}</h3>
                  <p className="text-sm text-[#6B7280] mb-6 leading-[1.6] h-12 overflow-hidden border-l border-[#E2E5EC] pl-4 font-body">{cat.desc}</p>
                  <div className="flex items-center gap-3 text-[#000000] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                    View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS - TECHNICAL READOUTS ────────────────── */}
      <section className="bg-[#000000] border-t-8 border-[#000000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-16 px-10 border-b lg:border-b-0 border-white/5"
              >
                <div className="flex items-center gap-3 mb-4 text-white/70">
                  <stat.icon className="w-5 h-5 shrink-0" />
                  <div className="h-[2px] w-full bg-white/10" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="font-mono text-5xl font-bold text-white tracking-tighter">{stat.value}</div>
                  <div className="font-mono text-sm font-bold text-white/60">{stat.unit}</div>
                </div>
                <div className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-mono font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRUCTURAL ─────────────────────────── */}
      <section className="border-b border-[#E2E5EC] bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2">

          {/* Text - Structural Vertical Line */}
          <div className="py-24 pr-0 lg:pr-20 border-r border-[#E2E5EC] structural-line-left pl-12 lg:pl-16">
            <div className="text-[#000000] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Our Approach</div>
            <h2 className="font-heading text-5xl font-bold text-[#000000] leading-[1.1] mb-8 tracking-tight">PRECISION.<br />EXPERIENCE.<br />UNWAVERING TRUST.</h2>
            <p className="text-[#6B7280] leading-[1.8] mb-6 font-body text-base">
              Since inception in 2002, Indus Heaters has been the backbone for high-stakes industrial heating cycles. We don't just "make" heaters; we engineer thermal stability for environments where zero-downtime is the only acceptable metric.
            </p>
            <p className="text-[#6B7280] leading-[1.8] mb-10 font-body text-base">
              Based in Chennai with ISO-aligned facilities in Mutlur, our engineers design to your application, not our catalogue.
            </p>
            <Link to="/about" className="btn-industrial inline-flex items-center gap-3 text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#000000] hover:gap-6 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image with mix-blend-multiply premium look */}
          <div className="hidden lg:block bg-[#F5F5F5] relative overflow-hidden group">
            <img
              src="/images/DSC_0087.JPG"
              alt="Indus Heaters Manufacturing"
              className="w-full h-full object-cover mix-blend-multiply opacity-80 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/10 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E2E5EC] opacity-30" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#E2E5EC] opacity-30" />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES TECHNICAL ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-[#E2E5EC]">
        <h2 className="font-heading text-[10px] font-bold uppercase tracking-[0.4em] text-[#6B7280] mb-12 flex items-center gap-6">
          <span className="shrink-0">Industries We Serve</span>
          <div className="w-full h-[1px] bg-[#E2E5EC]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#E2E5EC]">
          {industries.map((ind, i) => (
            <span
              key={i}
              className="px-8 py-6 font-mono text-[11px] font-bold uppercase tracking-widest text-[#4B5563] border-b border-r border-[#E2E5EC] hover:bg-[#000000] hover:text-white transition-all duration-300 cursor-default group flex justify-between items-center"
            >
              {ind}
              <span className="opacity-0 group-hover:opacity-100 text-[8px]">0{i + 1}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER BRUTE ─────────────────────────── */}
      <section className="bg-[#000000] py-24 relative overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="w-16 h-[6px] bg-white mb-8" />
            <h2 className="font-heading text-7xl font-bold text-white leading-[0.9] tracking-tight mb-6">
              CAN'T FIND<br />WHAT YOU NEED?<br /><span className="opacity-60 italic">WE BUILD TO SPEC.</span>
            </h2>
            <p className="text-white/80 leading-[1.8] max-w-md font-body text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Custom wattage, diameter, voltage, and form factor. Describe your requirement and our engineering team will sync within 24 business hours.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              to="/enquiry"
              className="btn-industrial bg-white text-[#000000] px-12 py-6 font-heading font-bold text-lg uppercase tracking-[0.2em] shadow-2xl hover:bg-[#F3F4F6] transition-all flex items-center gap-4"
            >
              Request Enquiry <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
