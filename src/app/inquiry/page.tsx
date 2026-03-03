import type { Metadata } from 'next';
import { Suspense } from 'react';
import InquiryPageContent from './InquiryPageContent';

export const metadata: Metadata = {
  title: 'Request a Quote — Get Best Prices on Lab Chemicals & Equipment',
  description:
    "Submit your inquiry for laboratory chemicals, glassware, instruments, or industrial chemicals. Get the best competitive quotes from Dhanya Trader's, Mohali. Fast response within 24 hours. Bulk orders welcome.",
  alternates: {
    canonical: 'https://dhanyatraders.live/inquiry',
  },
  openGraph: {
    title: "Request a Quote | Dhanya Trader's — Best Prices Guaranteed",
    description:
      'Get competitive pricing on lab chemicals, glassware, instruments & industrial chemicals. Quick response within 24 hours.',
    url: 'https://dhanyatraders.live/inquiry',
  },
};

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>}>
      <InquiryPageContent />
    </Suspense>
  );
}
