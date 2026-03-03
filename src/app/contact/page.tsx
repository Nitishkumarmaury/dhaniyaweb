import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us — Lab Chemical Supplier in Mohali, Punjab',
  description:
    "Contact Dhanya Trader's for laboratory chemicals, glassware, instruments, and industrial chemical inquiries. Visit us at Plot 228, Industrial Area Phase 9, Mohali. Call +91-6239015661 or email Dhanyatraders06@gmail.com.",
  alternates: {
    canonical: 'https://dhanyatraders.live/contact',
  },
  openGraph: {
    title: "Contact Dhanya Trader's | Lab Chemical Supplier Mohali",
    description:
      'Reach out for quotes, product information, or any questions. Located in Mohali, Punjab. Call, email or visit us today.',
    url: 'https://dhanyatraders.live/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
