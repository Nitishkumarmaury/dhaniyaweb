'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  FlaskConical,
  TestTubes,
  Microscope,
  Package,
  Pipette,
  Dna,
  ArrowRight,
  X,
  Send,
} from 'lucide-react';
import { categories } from '@/data/products';
import type { ProductCategory } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  TestTubes,
  Microscope,
  Package,
  Pipette,
  Dna,
};

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    initialCategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filteredCategories = useMemo(() => {
    let result = categories;

    if (selectedCategory !== 'all') {
      result = result.filter((c) => c.id === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result
        .map((cat) => ({
          ...cat,
          brands: cat.brands.filter((b) =>
            b.name.toLowerCase().includes(q)
          ),
        }))
        .filter(
          (cat) =>
            cat.brands.length > 0 ||
            cat.name.toLowerCase().includes(q) ||
            cat.description.toLowerCase().includes(q)
        );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section
        className="gradient-hero py-16 md:py-24 relative overflow-hidden"
        ref={heroRef}
      >
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-3xl"
          >
            <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-3 block">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Laboratory & Industrial Supplies
            </h1>
            <p className="text-lg text-primary-100/80">
              Browse our comprehensive catalog of chemicals, glassware,
              instruments, and more from the world&apos;s leading brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Category filters (desktop) */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pt-4 flex flex-wrap gap-2 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((cat, catIdx) => {
                const Icon = iconMap[cat.icon] || FlaskConical;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {cat.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Brands Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {cat.brands.map((brand, bIdx) => (
                        <motion.div
                          key={brand.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: catIdx * 0.1 + bIdx * 0.05 }}
                          className="card p-5 text-center group hover:-translate-y-1 flex flex-col items-center justify-center min-h-[140px]"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                            <Icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            {brand.name}
                          </h3>
                          <Link
                            href={`/inquiry?product=${encodeURIComponent(
                              brand.name + ' - ' + cat.name
                            )}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Send className="w-3 h-3" />
                            Inquire
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="card p-8 md:p-12 bg-primary-50 border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Can&apos;t Find What You Need?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                We have access to an extensive network of suppliers. Send us
                your requirements and we&apos;ll source it for you.
              </p>
              <Link href="/inquiry" className="btn-primary">
                Send Inquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
