import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/home/Hero";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import StatsCounter from "@/components/home/StatsCounter";
import LogoTicker from "@/components/home/LogoTicker";
import ScrollStory from "@/components/home/ScrollStory";
import ServicesPreview from "@/components/home/ServicesPreview";
import Showcase from "@/components/home/Showcase";
import SolutionsPreview from "@/components/home/SolutionsPreview";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import LightboxGallery from "@/components/home/LightboxGallery";
import Testimonials from "@/components/home/Testimonials";
import PricingPreview from "@/components/home/PricingPreview";
import FAQ from "@/components/home/FAQ";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  useScrollReveal();

  return (
    <>
      <Hero />
      <FeatureShowcase />
      <StatsCounter />
      <LogoTicker />
      <ScrollStory />
      <ServicesPreview />
      <Showcase />
      <SolutionsPreview />
      <CaseStudiesPreview />
      <LightboxGallery />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTABanner />
    </>
  );
};

export default Index;
