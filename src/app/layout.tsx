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
  metadataBase: new URL('https://dhanyatraders.live'),
  title: {
    default: "Dhanya Trader's — Lab Chemicals, Glassware, Instruments & Industrial Chemicals Supplier in Mohali, Punjab",
    template: "%s | Dhanya Trader's — Lab & Industrial Chemical Supplier",
  },
  description:
    "India's trusted supplier of laboratory chemicals, glassware, instruments, solvents & industrial chemicals in Mohali, Punjab. Authorized dealer of Merck, Thermo Fisher, Sigma Aldrich, Borosil, SRL, Loba Chemie & 20+ brands. Fast delivery. Get a free quote today!",
  keywords: [
    'laboratory chemicals supplier Mohali',
    'lab chemicals supplier Punjab India',
    'industrial chemicals supplier India',
    'lab glassware supplier Mohali',
    'laboratory instruments supplier Punjab',
    'Merck chemicals dealer India',
    'Thermo Fisher supplier India',
    'Sigma Aldrich distributor Punjab',
    'Borosil glassware dealer',
    'research chemicals supplier India',
    'lab consumables supplier Chandigarh',
    'chemical trading company Punjab',
    'analytical reagents supplier',
    'lab equipment supplier Mohali',
    'SRL chemicals dealer Punjab',
    'Loba Chemie supplier India',
    'laboratory solvents supplier',
    'pharma chemicals supplier Punjab',
    'buy lab chemicals online India',
    'lab chemical distributor near me',
    'laboratory supply company Chandigarh Mohali',
    'bulk chemicals supplier Punjab',
    'Dhanya Traders Mohali',
    'chemical supplier Chandigarh tricity',
  ],
  authors: [{ name: "Dhanya Trader's", url: 'https://dhanyatraders.live' }],
  creator: "Dhanya Trader's",
  publisher: "Dhanya Trader's",
  alternates: {
    canonical: 'https://dhanyatraders.live',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dhanyatraders.live',
    siteName: "Dhanya Trader's",
    title: "Dhanya Trader's — Trusted Laboratory & Industrial Chemical Supplier | Mohali, Punjab",
    description:
      'Your #1 source for lab chemicals, glassware, instruments, solvents & industrial chemicals. Authorized dealer of 20+ global brands. Serving research labs, pharma, and industries across India.',
    images: [
      {
        url: 'https://dhanyatraders.live/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Dhanya Trader's — Laboratory & Industrial Chemical Supplier in Mohali, Punjab",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dhanya Trader's — Lab & Industrial Chemical Supplier | Mohali",
    description:
      'Trusted supplier of lab chemicals, glassware, instruments & solvents in Mohali, Punjab. Authorized dealer of Merck, Thermo Fisher, Borosil & more.',
    images: ['https://dhanyatraders.live/og-image.jpg'],
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
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Mohali',
    'geo.position': '30.7046;76.7179',
    'ICBM': '30.7046, 76.7179',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://dhanyatraders.live/#business',
      name: "Dhanya Trader's",
      alternateName: 'Dhanya Traders Mohali',
      description:
        'Authorized supplier of laboratory chemicals, glassware, instruments, solvents & industrial chemicals in Mohali, Punjab. Dealer of Merck, Thermo Fisher, Sigma Aldrich, Borosil & 20+ global brands.',
      url: 'https://dhanyatraders.live',
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
      areaServed: [
        { '@type': 'City', name: 'Mohali' },
        { '@type': 'City', name: 'Chandigarh' },
        { '@type': 'City', name: 'Panchkula' },
        { '@type': 'State', name: 'Punjab' },
        { '@type': 'Country', name: 'India' },
      ],
      serviceType: [
        'Laboratory Chemical Supply',
        'Lab Glassware Supply',
        'Laboratory Instrument Supply',
        'Industrial Chemical Supply',
        'Research Chemical Supply',
      ],
      knowsAbout: [
        'Laboratory Chemicals',
        'Lab Glassware',
        'Lab Instruments',
        'Industrial Chemicals',
        'Analytical Reagents',
        'Solvents',
        'Research Chemicals',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Laboratory & Industrial Chemicals Catalog',
        itemListElement: [
          { '@type': 'OfferCatalog', name: 'Laboratory Chemicals' },
          { '@type': 'OfferCatalog', name: 'Laboratory Glassware' },
          { '@type': 'OfferCatalog', name: 'Laboratory Instruments' },
          { '@type': 'OfferCatalog', name: 'Industrial Chemicals' },
          { '@type': 'OfferCatalog', name: 'Solvents & Reagents' },
          { '@type': 'OfferCatalog', name: 'Lab Consumables' },
        ],
      },
      sameAs: [],
      priceRange: '$$',
      image: 'https://dhanyatraders.live/og-image.jpg',
      logo: 'https://dhanyatraders.live/favicon.ico',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dhanyatraders.live/#website',
      url: 'https://dhanyatraders.live',
      name: "Dhanya Trader's",
      description: 'Lab Chemicals, Glassware, Instruments & Industrial Chemicals Supplier',
      publisher: { '@id': 'https://dhanyatraders.live/#business' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://dhanyatraders.live/#webpage',
      url: 'https://dhanyatraders.live',
      name: "Dhanya Trader's — Lab Chemicals, Glassware, Instruments & Industrial Chemicals",
      isPartOf: { '@id': 'https://dhanyatraders.live/#website' },
      about: { '@id': 'https://dhanyatraders.live/#business' },
      description:
        'Authorized supplier of laboratory chemicals, glassware, instruments, solvents & industrial chemicals. Trusted by research labs, pharma companies & industries across India.',
      inLanguage: 'en-IN',
    },
  ],
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
