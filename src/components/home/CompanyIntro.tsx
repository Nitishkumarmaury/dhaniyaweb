'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, FlaskConical } from 'lucide-react';

export default function CompanyIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="heading-section">About Dhanya Trader&apos;s</span>
            <h2 className="heading-secondary mb-6">
              Your Reliable Partner for Laboratory & Industrial Chemicals
            </h2>
            <p className="text-body mb-6">
              Based in Mohali, Punjab, <strong>Dhanya Trader&apos;s</strong> is a
              trusted name in the supply of high-quality laboratory chemicals,
              precision glassware, analytical instruments, research reagents,
              and industrial solvents. We serve pharmaceutical companies,
              research institutions, universities, and industrial units across
              India.
            </p>
            <p className="text-body mb-8">
              With partnerships spanning over 20 leading global and Indian
              brands, we ensure authentic products, competitive pricing, and
              reliable delivery — every time.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Authorized Distributor',
                'Competitive Pricing',
                'Pan-India Delivery',
                'Technical Support',
                'Bulk Order Specialists',
                'Quality Assurance',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl" />

              <div className="relative grid grid-cols-2 gap-6">
                {[
                  {
                    number: '20+',
                    label: 'Global Brands',
                    color: 'bg-primary-500',
                  },
                  {
                    number: '6',
                    label: 'Product Categories',
                    color: 'bg-primary-600',
                  },
                  {
                    number: '500+',
                    label: 'Products Available',
                    color: 'bg-primary-700',
                  },
                  {
                    number: '100%',
                    label: 'Authentic Supply',
                    color: 'bg-primary-800',
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-md text-center"
                  >
                    <div
                      className={`text-3xl font-bold text-primary-500 mb-1`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-xl p-5 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Quality Commitment
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    All products sourced from authorized channels with full
                    documentation and certificates of analysis.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
