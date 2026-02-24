import Hero from '@/components/home/Hero';
import CompanyIntro from '@/components/home/CompanyIntro';
import ProductCategories from '@/components/home/ProductCategories';
import BrandsCarousel from '@/components/home/BrandsCarousel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import IndustriesServed from '@/components/home/IndustriesServed';
import CTASection from '@/components/home/CTASection';
import ContactStrip from '@/components/home/ContactStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <ProductCategories />
      <BrandsCarousel />
      <WhyChooseUs />
      <IndustriesServed />
      <CTASection />
      <ContactStrip />
    </>
  );
}
