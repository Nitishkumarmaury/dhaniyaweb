import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsPageContent from './ProductsPageContent';

export const metadata: Metadata = {
  title: 'Products — Laboratory Chemicals, Glassware, Instruments & More',
  description:
    "Browse our complete range of laboratory chemicals, glassware, instruments, consumables, liquid handling, and research products from 20+ leading brands including Merck, Thermo Fisher, Sigma Aldrich, Borosil.",
  openGraph: {
    title: "Products | Dhanya Trader's",
    description:
      'Explore laboratory chemicals, glassware, instruments, and industrial chemicals from 20+ trusted brands.',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
