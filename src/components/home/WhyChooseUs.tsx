'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldCheck,
  Award,
  IndianRupee,
  Truck,
  Headphones,
  Settings,
} from 'lucide-react';
import { whyChooseUs } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Award,
  IndianRupee,
  Truck,
  Headphones,
  Settings,
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="heading-section">Why Dhanya Trader&apos;s</span>
          <h2 className="heading-secondary mb-4">
            Why Leading Labs & Industries Choose Us
          </h2>
          <p className="text-body">
            We combine authenticity, competitive pricing, and reliable service
            to deliver an unmatched procurement experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
