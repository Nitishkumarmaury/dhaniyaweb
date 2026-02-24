'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Pill,
  GraduationCap,
  Wheat,
  Factory,
  Leaf,
  HeartPulse,
} from 'lucide-react';
import { industries } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  Pill,
  GraduationCap,
  Wheat,
  Factory,
  Leaf,
  HeartPulse,
};

export default function IndustriesServed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="heading-section">Industries We Serve</span>
          <h2 className="heading-secondary mb-4">
            Trusted Across Diverse Sectors
          </h2>
          <p className="text-body">
            From pharmaceutical research to environmental testing, our
            products power critical operations across industries.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon] || Factory;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card p-6 flex items-start gap-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
