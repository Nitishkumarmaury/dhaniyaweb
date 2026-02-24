import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Request Quote', href: '/inquiry' },
  { label: 'Contact', href: '/contact' },
];

const productLinks = [
  { label: 'Laboratory Chemicals', href: '/products?category=laboratory-chemicals' },
  { label: 'Laboratory Glassware', href: '/products?category=laboratory-glassware' },
  { label: 'Lab Instruments', href: '/products?category=lab-instruments' },
  { label: 'Consumables', href: '/products?category=consumables' },
  { label: 'Liquid Handling', href: '/products?category=liquid-handling' },
  { label: 'Research Products', href: '/products?category=research-products' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Dhanya Trader's Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  Dhanya Trader&apos;s
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              A House of Lab Chemicals, Glassware, Instruments, Solvents &
              Industrial Chemicals. Your trusted partner for laboratory and
              industrial supply solutions.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>
                  Plot 228, Industrial Area, Phase 9, Mohali, SAS Nagar, Punjab
                  – 140308
                </span>
              </div>
              <a
                href="tel:+916239015661"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                +91 6239015661 / +91 8288818934
              </a>
              <a
                href="mailto:Dhanyatraders06@gmail.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                Dhanyatraders06@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-400 shrink-0" />
                Mon – Sat: 9:00 AM – 6:00 PM
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">
              Our Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">
              Get In Touch
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Need laboratory chemicals or industrial supplies? Contact us for
              competitive quotes and fast delivery.
            </p>
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-white text-sm font-semibold mb-3">
                Top Brands We Carry
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Merck', 'Thermo Fisher', 'Sigma Aldrich', 'Borosil', 'Eppendorf'].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Dhanya Trader&apos;s. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
