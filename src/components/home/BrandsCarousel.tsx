'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { allBrands } from '@/data/products';

export default function BrandsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate for seamless scroll
  const brands = [...allBrands, ...allBrands];

  return (
    <section className="py-16 bg-white overflow-hidden" ref={ref}>
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span className="heading-section">Authorized Distributor</span>
          <h2 className="heading-secondary">
            Brands You Trust, Supply You Can Rely On
          </h2>
        </motion.div>
      </div>

      {/* Scrolling Row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-8 py-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {brands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 px-8 py-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-colors cursor-default"
            >
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Row 2 (reverse) */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-8 py-4"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...allBrands].reverse().concat([...allBrands].reverse()).map((brand, i) => (
            <div
              key={`rev-${brand}-${i}`}
              className="flex-shrink-0 px-8 py-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-colors cursor-default"
            >
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
