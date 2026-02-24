'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
} from 'lucide-react';
import toast from 'react-hot-toast';

function InquiryForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    gst: '',
    email: '',
    phone: '',
    product: prefilledProduct,
    quantity: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.product) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Inquiry submitted successfully!');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Inquiry Submitted Successfully!
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Thank you for your interest. Our team will review your inquiry and
          get back to you within 24 hours with a competitive quote.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              company: '',
              gst: '',
              email: '',
              phone: '',
              product: '',
              quantity: '',
              message: '',
            });
          }}
          className="btn-primary"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={formInView ? { opacity: 1, y: 0 } : {}}
      className="card p-6 md:p-8"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Fill in Your Requirements
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Company / Institute
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* GST */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            GST Number{' '}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            placeholder="22AAAAA0000A1Z5"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 10 bottles, 500ml each"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Product */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Product / Chemical Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          placeholder="e.g. Methanol AR Grade, Merck"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional Details
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Any specific requirements, grade, purity, delivery timeline, etc."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-6 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Submit Inquiry
          </span>
        )}
      </button>
    </motion.form>
  );
}

export default function InquiryPageContent() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

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
              Request for Quotation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Get Your Quote Today
            </h1>
            <p className="text-lg text-primary-100/80">
              Tell us what you need and our team will respond with competitive
              pricing within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="card p-8 animate-pulse h-96" />}>
                <InquiryForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Why Request Through Us?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      title: 'Quick Response',
                      desc: 'Get quotes within 24 hours',
                    },
                    {
                      icon: Shield,
                      title: 'Best Pricing',
                      desc: 'Competitive rates guaranteed',
                    },
                    {
                      icon: CheckCircle2,
                      title: 'Authentic Products',
                      desc: '100% genuine from authorized sources',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contact */}
              <div className="card p-6 gradient-primary text-white">
                <h3 className="font-semibold mb-3">Prefer to Call?</h3>
                <p className="text-sm text-primary-100 mb-4">
                  Speak directly with our team for urgent requirements.
                </p>
                <a
                  href="tel:+916239015661"
                  className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="text-xs text-primary-200">Call Now</div>
                    <div className="font-semibold">+91 6239015661</div>
                  </div>
                </a>
                <a
                  href="tel:+918288818934"
                  className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors mt-2"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="text-xs text-primary-200">Alternate</div>
                    <div className="font-semibold">+91 8288818934</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
