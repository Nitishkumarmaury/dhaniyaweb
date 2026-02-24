'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, FlaskConical } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative gradient-hero rounded-3xl overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl" />
            <motion.div
              className="absolute top-10 right-10 text-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <FlaskConical className="w-40 h-40" />
            </motion.div>
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Streamline Your Lab Procurement?
            </h2>
            <p className="text-lg text-primary-100/80 mb-10 max-w-2xl mx-auto">
              Get competitive quotes on laboratory chemicals, glassware,
              instruments, and industrial chemicals. Our team responds within
              24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-xl text-lg"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
