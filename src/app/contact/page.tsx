import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description:
    "Contact Dhanya Trader's for laboratory chemicals, glassware, instruments, and industrial chemical inquiries. Visit our Mohali office or call us today.",
  openGraph: {
    title: "Contact Us | Dhanya Trader's",
    description:
      'Reach out for quotes, product information, or any questions about our lab and industrial chemical supply services.',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
