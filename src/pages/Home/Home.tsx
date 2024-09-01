import FeaturedRooms from "@/components/FeaturedRooms/FeaturedRooms";
import Hero from "@/components/HeroSection/Hero";
import ServiceAdvertisement from "@/components/ServiceAdvertisement/ServiceAdvertisement";
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
      <div className="min-h-96"></div>
    </div>
  );
}
