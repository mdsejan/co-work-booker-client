import FeaturedRooms from "@/components/FeaturedRooms/FeaturedRooms";
import Hero from "@/components/HeroSection/Hero";
import ServiceAdvertisement from "@/components/ServiceAdvertisement/ServiceAdvertisement";
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
      <div className="min-h-96"></div>
    </div>
  );
}
