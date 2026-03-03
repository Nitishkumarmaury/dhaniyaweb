import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us — Trusted Lab Chemical Supplier Since Establishment',
  description:
    "Learn about Dhanya Trader's — Mohali's leading supplier of laboratory chemicals, glassware, instruments, and industrial chemicals. Authorized dealer of Merck, Thermo Fisher, Sigma Aldrich & Borosil. Serving pharma, research labs & industries across Punjab and India.",
  alternates: {
    canonical: 'https://dhanyatraders.live/about',
  },
  openGraph: {
    title: "About Dhanya Trader's — Trusted Lab Chemical Supplier in Mohali, Punjab",
    description:
      'Discover our mission, vision, and commitment to providing authentic laboratory and industrial chemicals. Authorized dealer of 20+ global brands across India.',
    url: 'https://dhanyatraders.live/about',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
