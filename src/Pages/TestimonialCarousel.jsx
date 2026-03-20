import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "I have always used only natural products for my baby. One day, I came across Mamaearth's products during an online search. I bought its Baby Shampoo, Toothpaste, and Face Cream; they all were toxin-free and effective. The shopping experience and payment system were safe, fast, and quick.",
      name: "Manisha",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      text: "I was facing excessive hair fall. I thus tried Mamaearth's Onion Shampoo, Onion Hair Mask, Onion Hair Serum, and Hair Oil Booster. These toxin-free hair care products are effective at minimizing these issues. I also use Ubtan Face Wash to keep sun tan away.",
      name: "Tanmay",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      text: "Being made of natural and toxin-free ingredients, Mamaearth's skincare and hair care products are very effective. They make my skin and hair healthy. I use Ubtan Face Wash, which is great for sun tan removal and treating hyper-pigmentation. If you are looking for any issues related to your skincare or hair care plans, you should opt for these products.",
      name: "Priyanshi Singh",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      text: "I love Mamaearth products! The face wash and shampoo are amazing. Totally natural and chemical-free.",
      name: "Rohit",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 5,
      text: "I love Mamaearth products! The face wash and shampoo are amazing. Totally natural and chemical-free.",
      name: "Rohit",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 6,
      text: "I love Mamaearth products! The face wash and shampoo are amazing. Totally natural and chemical-free.",
      name: "Rohit",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="relative w-full py-16 px-4 overflow-hidden">
      {/* Background decorative green wash */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom, #BCE27D 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="text-center mb-12 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 inline-block">
          What Our Customers Say
        </h2>
        <div className="w-24 h-1 bg-gray-200 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100 hover:bg-white transition-all z-10 ml-2 md:-ml-4"
        >
          <ChevronLeft className="text-gray-400" size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-10"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[90%] sm:w-[45%] md:w-[32%] bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-50 snap-center relative"
            >
              {/* Testimonial Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8 h-40 overflow-hidden">
                {item.text}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="bg-[#4caf50] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      {item.rating} <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100 hover:bg-white transition-all z-10 mr-2 md:-mr-4"
        >
          <ChevronRight className="text-gray-400" size={24} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
