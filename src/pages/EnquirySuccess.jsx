import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ClipboardList } from 'lucide-react';
import { useEffect, useRef } from 'react';

const REF_NUM = 'IH-' + Math.floor(100000 + Math.random() * 900000);

export default function EnquirySuccess() {
  return (
    <div className="bg-white min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full border border-[#E2E5EC] text-center relative overflow-hidden">
        {/* Top accent */}
        <div className="h-1 bg-[#1B4EDB] w-full" />

        <div className="px-10 py-14">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="w-16 h-16 bg-green-600 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-9 h-9 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1B4EDB]" />
              <span className="text-[#1B4EDB] font-heading text-xs font-bold uppercase tracking-[0.2em]">Request Received</span>
              <div className="w-8 h-[2px] bg-[#1B4EDB]" />
            </div>

            <h1 className="font-heading text-5xl font-bold text-[#0A0F1A] mb-4">
              ENQUIRY<br />SUBMITTED
            </h1>

            <p className="text-[#6B7280] mb-8 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Thank you. Our engineering team has received your product enquiry and will review your requirements. Expect a response within <strong className="text-[#0A0F1A]">24 business hours</strong>.
            </p>

            {/* Reference */}
            <div className="border border-[#E2E5EC] bg-[#F5F5F5] py-4 px-6 mb-8 inline-block w-full">
              <div className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-1">Reference Number</div>
              <div className="font-heading text-2xl font-bold text-[#1B4EDB] tracking-widest">{REF_NUM}</div>
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
              className="flex-1 bg-[#1B4EDB] text-white py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#1340B5] transition-colors flex items-center justify-center gap-2"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="flex-1 border-2 border-[#0A0F1A] text-[#0A0F1A] py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#0A0F1A] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
