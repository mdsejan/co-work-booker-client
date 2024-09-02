import React from "react";
import { Link } from "react-router-dom";
import herobg from "/src/assets/hero-bg.jpg";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content */}
      <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Book Your Ideal Meeting Room with Ease
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <Link
          to="/meeting-rooms"
          className="bg-[#2499EF] hover:bg-[#0E73BE] text-white font-semibold py-3 px-14 rounded-full"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
