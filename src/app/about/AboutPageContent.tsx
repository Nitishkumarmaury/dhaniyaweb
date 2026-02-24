'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Target,
  Eye,
  ShieldCheck,
  Globe,
  Users,
  FlaskConical,
} from 'lucide-react';
import Timeline from '@/components/about/Timeline';
import { timelineData } from '@/data/products';
import Link from 'next/link';

export default function AboutPageContent() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });

  const values = [
    {
      icon: ShieldCheck,
      title: 'Quality Commitment',
      description:
        'Every product we supply comes with genuine documentation, certificates of analysis, and is sourced from authorized channels only.',
    },
    {
      icon: Globe,
      title: 'Nationwide Supply',
      description:
        'Our robust logistics network ensures timely delivery of chemicals and equipment to laboratories and industries across India.',
    },
    {
      icon: Users,
      title: 'Customer-First Philosophy',
      description:
        'We prioritize understanding our clients\' needs and providing tailored solutions with responsive technical support.',
    },
    {
      icon: FlaskConical,
      title: 'Scientific Expertise',
      description:
        'Our team has deep knowledge of laboratory products, enabling us to recommend the right solutions for your specific applications.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28 relative overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building Trust Through Quality & Reliability
            </h1>
            <p className="text-lg text-primary-100/80 leading-relaxed">
              Dhanya Trader&apos;s is a Mohali-based trading company
              specializing in laboratory chemicals, precision glassware,
              analytical instruments, research reagents, and industrial
              solvents. We partner with the world&apos;s leading brands to serve
              laboratories and industries with authentic products and
              exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white" ref={missionRef}>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              className="card p-8 border-l-4 border-l-primary-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and reliable partner for laboratory and
                industrial chemical procurement in India. We strive to deliver
                authentic, high-quality products at competitive prices with
                unmatched customer service, enabling our clients to focus on
                what matters most — their research, quality control, and
                production goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="card p-8 border-l-4 border-l-primary-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To establish Dhanya Trader&apos;s as India&apos;s premier
                one-stop destination for laboratory and industrial supplies —
                known for our integrity, extensive product range, technical
                expertise, and commitment to powering scientific progress and
                industrial excellence nationwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50" ref={valuesRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="heading-section">Our Values</span>
            <h2 className="heading-secondary mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-body">
              Our core values shape every interaction, decision, and product we
              deliver.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="heading-section">Our Journey</span>
            <h2 className="heading-secondary mb-4">
              Growing With Purpose
            </h2>
            <p className="text-body">
              A snapshot of our journey towards becoming a trusted name in
              laboratory and industrial supplies.
            </p>
          </div>
          <Timeline items={timelineData} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="heading-secondary mb-4">
            Partner With Dhanya Trader&apos;s
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Join hundreds of laboratories and industries across India who trust
            us for their chemical and equipment procurement needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inquiry" className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
