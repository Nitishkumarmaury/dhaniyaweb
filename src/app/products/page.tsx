import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsPageContent from './ProductsPageContent';

export const metadata: Metadata = {
  title: 'Products — Lab Chemicals, Glassware, Instruments & Industrial Chemicals',
  description:
    "Browse 1000+ laboratory chemicals, glassware, instruments, consumables, solvents & research products from Merck, Thermo Fisher, Sigma Aldrich, Borosil, SRL, Loba Chemie & 20+ brands. Best prices in Mohali, Punjab.",
  alternates: {
    canonical: 'https://dhanyatraders.live/products',
  },
  openGraph: {
    title: "Products | Dhanya Trader's — Lab & Industrial Chemical Catalog",
    description:
      'Explore laboratory chemicals, glassware, instruments, and industrial chemicals from 20+ trusted global brands. Competitive pricing & fast delivery.',
    url: 'https://dhanyatraders.live/products',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
