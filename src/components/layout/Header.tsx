'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Inquiry', href: '/inquiry' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-700 text-white text-sm">
        <div className="container-custom flex justify-between items-center py-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:+916239015661"
              className="flex items-center gap-1.5 hover:text-primary-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 6239015661
            </a>
            <a
              href="tel:+918288818934"
              className="flex items-center gap-1.5 hover:text-primary-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 8288818934
            </a>
            <a
              href="mailto:Dhanyatraders06@gmail.com"
              className="flex items-center gap-1.5 hover:text-primary-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Dhanyatraders06@gmail.com
            </a>
          </div>
          <p className="text-primary-200 text-xs">
            Mon – Sat: 9:00 AM – 6:00 PM
          </p>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                  <Image
                    src="/logo.jpg"
                    alt="Dhanya Trader's Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-primary-500 leading-tight">
                  Dhanya Trader&apos;s
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 hidden sm:block leading-tight">
                  Lab Chemicals & Industrial Supplies
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/inquiry"
                className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
              >
                Request Quote
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t bg-white overflow-hidden"
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 px-4">
                  <Link
                    href="/inquiry"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-center text-sm"
                  >
                    Request Quote
                  </Link>
                </div>
                <div className="pt-3 px-4 space-y-2 text-sm text-gray-600">
                  <a href="tel:+916239015661" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +91 6239015661
                  </a>
                  <a href="tel:+918288818934" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +91 8288818934
                  </a>
                  <a href="mailto:Dhanyatraders06@gmail.com" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Dhanyatraders06@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
