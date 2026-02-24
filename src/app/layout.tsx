import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dhanyatraders.com'),
  title: {
    default: "Dhanya Trader's — Lab Chemicals, Glassware, Instruments & Industrial Chemicals | Mohali, Punjab",
    template: "%s | Dhanya Trader's",
  },
  description:
    "Trusted supplier of laboratory chemicals, glassware, instruments, solvents & industrial chemicals in Mohali, Punjab. Brands: Merck, Thermo Fisher, Sigma Aldrich, Borosil & more. Get a quote today!",
  keywords: [
    'laboratory chemicals supplier Mohali',
    'lab chemicals Punjab',
    'industrial chemicals India',
    'lab glassware supplier',
    'laboratory instruments Mohali',
    'Merck chemicals distributor',
    'Thermo Fisher India',
    'Sigma Aldrich supplier Punjab',
    'Borosil glassware',
    'research chemicals India',
    'lab consumables supplier',
    'chemical trading company Punjab',
  ],
  authors: [{ name: "Dhanya Trader's" }],
  creator: "Dhanya Trader's",
  publisher: "Dhanya Trader's",
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: "Dhanya Trader's",
    title: "Dhanya Trader's — Trusted Laboratory & Industrial Supply Partner",
    description:
      'Your trusted source for lab chemicals, glassware, instruments, solvents & industrial chemicals. Serving research labs, pharma, and industries across India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Dhanya Trader's — Laboratory & Industrial Chemicals",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dhanya Trader's — Lab & Industrial Chemical Supplier",
    description:
      'Trusted supplier of lab chemicals, glassware, instruments & solvents in Mohali, Punjab.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Dhanya Trader's",
  description:
    'A House of Lab Chemicals, Glassware, Instruments, Solvents & Industrial Chemicals',
  url: 'https://dhanyatraders.com',
  telephone: ['+916239015661', '+918288818934'],
  email: 'Dhanyatraders06@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 228, Industrial Area, Phase 9',
    addressLocality: 'Mohali',
    addressRegion: 'Punjab',
    postalCode: '140308',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.7046,
    longitude: 76.7179,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [],
  priceRange: '$$',
  image: 'https://dhanyatraders.com/og-image.jpg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A4D8C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1a1a1a',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            },
          }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
