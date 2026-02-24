import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Dhanya Trader's — your trusted supplier of laboratory chemicals, glassware, instruments, and industrial chemicals in Mohali, Punjab. Our mission, vision, and quality commitment.",
  openGraph: {
    title: "About Dhanya Trader's — Trusted Lab Supply Partner",
    description:
      'Discover our mission, vision, and commitment to providing authentic laboratory and industrial chemicals across India.',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
