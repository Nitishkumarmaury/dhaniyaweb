import type { Metadata } from 'next';
import { Suspense } from 'react';
import InquiryPageContent from './InquiryPageContent';

export const metadata: Metadata = {
  title: 'Request a Quote — Get Competitive Pricing',
  description:
    "Submit your inquiry for laboratory chemicals, glassware, instruments, or industrial chemicals. Get competitive quotes from Dhanya Trader's within 24 hours.",
  openGraph: {
    title: "Request a Quote | Dhanya Trader's",
    description:
      'Get competitive pricing on lab chemicals, glassware, and instruments. Quick response guaranteed.',
  },
};

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>}>
      <InquiryPageContent />
    </Suspense>
  );
}
