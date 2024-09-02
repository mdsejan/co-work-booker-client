import FeaturedRooms from "@/components/FeaturedRooms/FeaturedRooms";
import Hero from "@/components/HeroSection/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ServiceAdvertisement from "@/components/ServiceAdvertisement/ServiceAdvertisement";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />
      <ServiceAdvertisement />
      <FeaturedRooms />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsCarousel />
    </div>
  );
}
