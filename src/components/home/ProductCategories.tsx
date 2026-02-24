'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FlaskConical,
  TestTubes,
  Microscope,
  Package,
  Pipette,
  Dna,
  ArrowRight,
} from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  TestTubes,
  Microscope,
  Package,
  Pipette,
  Dna,
};

export default function ProductCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-gray-50 lab-pattern" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="heading-section">Our Products</span>
          <h2 className="heading-secondary mb-4">
            Comprehensive Laboratory & Industrial Supplies
          </h2>
          <p className="text-body">
            From research-grade chemicals to precision instruments — we offer
            everything your laboratory needs, backed by the world&apos;s most
            trusted brands.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || FlaskConical;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="card p-6 h-full flex flex-col group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                    <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.brands.slice(0, 4).map((b) => (
                      <span
                        key={b.name}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {b.name}
                      </span>
                    ))}
                    {cat.brands.length > 4 && (
                      <span className="text-xs text-primary-500 font-medium px-2 py-0.5">
                        +{cat.brands.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                    View Products
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
