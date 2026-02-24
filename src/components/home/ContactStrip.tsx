'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactStrip() {
  return (
    <section className="bg-primary-500 text-white">
      <div className="container-custom py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="tel:+916239015661"
            className="flex items-center gap-3 hover:bg-primary-600 rounded-lg p-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-primary-200">Call Us</div>
              <div className="text-sm font-semibold">+91 6239015661</div>
            </div>
          </a>
          <a
            href="tel:+918288818934"
            className="flex items-center gap-3 hover:bg-primary-600 rounded-lg p-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-primary-200">Alternate</div>
              <div className="text-sm font-semibold">+91 8288818934</div>
            </div>
          </a>
          <a
            href="mailto:Dhanyatraders06@gmail.com"
            className="flex items-center gap-3 hover:bg-primary-600 rounded-lg p-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-primary-200">Email</div>
              <div className="text-sm font-semibold truncate">
                Dhanyatraders06@gmail.com
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-primary-200">Business Hours</div>
              <div className="text-sm font-semibold">Mon – Sat: 9 AM – 6 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
