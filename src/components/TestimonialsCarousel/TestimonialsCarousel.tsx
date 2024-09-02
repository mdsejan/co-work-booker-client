import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

//testimonials data
const testimonials = [
  {
    name: "John Doe",
    role: "CEO at Company A",
    image: "https://via.placeholder.com/100",
    testimonial:
      "This is a fantastic service! The booking experience was seamless and stress-free.",
  },
  {
    name: "Jane Smith",
    role: "Manager at Company B",
    image: "https://via.placeholder.com/100",
    testimonial:
      "I highly recommend their service. Everything was quick and easy to use.",
  },
  {
    name: "Alex Johnson",
    role: "Founder at Startup C",
    image: "https://via.placeholder.com/100",
    testimonial:
      "A wonderful platform that solved all our meeting room booking problems.",
  },
  {
    name: "Emily Clark",
    role: "Director at Nonprofit D",
    image: "https://via.placeholder.com/100",
    testimonial:
      "We were able to easily manage our meeting room bookings, thanks to this platform.",
  },
  {
    name: "Michael Brown",
    role: "CTO at Tech E",
    image: "https://via.placeholder.com/100",
    testimonial:
      "An excellent solution for our team's booking needs. Highly recommended.",
  },
];

const TestimonialsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className=" py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-12">
          <div className="text-center bg-white rounded-lg px-6 py-2">
            <h2 className="text-3xl font-extrabold text-[#663593]">
              Customer Testimonials
            </h2>
          </div>
          <p className="text-xl text-gray-800 mt-4 text-center">
            Hear what our satisfied customers have to say.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex space-x-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="min-w-[70%] md:min-w-[30%] lg:min-w-[25%] bg-white p-8 rounded-lg border mx-4 flex flex-col items-center"
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaQuoteLeft className="text-4xl text-[#2499EF] mb-4" />
                  <p className="text-lg text-gray-600 mb-4">
                    "{testimonial.testimonial}"
                  </p>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-0 p-3 bg-[#14141E] rounded-full text-white"
            onClick={scrollPrev}
          >
            &#8249;
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-0 p-3 bg-[#14141E] rounded-full text-white"
            onClick={scrollNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
