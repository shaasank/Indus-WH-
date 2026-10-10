import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const REF_NUM = 'IH-' + Math.floor(100000 + Math.random() * 900000);

export default function EnquirySuccess() {
  return (
    <div className="bg-white min-h-[85vh] flex items-center justify-center px-6 font-heading font-light">
      <div className="max-w-xl w-full border border-muted/15 text-center relative overflow-hidden shadow-sm">
        {/* Top accent */}
        <div className="h-1 bg-accent w-full" />

        <div className="px-10 py-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="w-16 h-16 bg-accent text-white flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-9 h-9 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-accent font-heading text-xs font-light uppercase tracking-[0.2em]">Request Received</span>
              <div className="w-8 h-[2px] bg-accent" />
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-light text-accent mb-4 uppercase">
              ENQUIRY<br />SUBMITTED
            </h1>

            <p className="text-primary mb-8 leading-[1.25] text-sm font-normal">
              Thank you. Our engineering team has received your product enquiry and will review your requirements. Expect a response within <span className="text-accent font-light">24 business hours</span>.
            </p>

            {/* Reference */}
            <div className="border border-muted/15 bg-muted/5 py-4 px-6 mb-8 inline-block w-full">
              <div className="text-[10px] font-heading font-light uppercase tracking-[0.2em] text-primary mb-1">Reference Number</div>
              <div className="font-heading text-2xl font-light text-accent tracking-widest">{REF_NUM}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/products"
              className="flex-1 bg-accent text-white py-4 font-heading font-light text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="flex-1 border border-muted/30 text-primary py-4 font-heading font-light text-sm uppercase tracking-widest hover:bg-muted hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
