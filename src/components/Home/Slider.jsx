import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router"; // or 'react-router-dom' based on your setup

const Slider = () => {
  const slides = [
    {
      image: "/car1.jpeg",
      title: "Drive Your Dream Car Today",
      subtitle: "Affordable, reliable, and always ready for the road.",
      button: "Browse Cars",
      link: "/browse-cars",
    },
    {
      image: "/car2.jpeg",
      title: "Luxury Meets Performance",
      subtitle: "Experience comfort and style with RentWheels.",
      button: "View Luxury Fleet",
      link: "/browse-cars",
    },
    {
      image: "/car3.jpeg",
      title: "Adventure Awaits You",
      subtitle: "Book your next trip confidently — anywhere, anytime.",
      button: "Book Now",
      link: "/browse-cars",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="h-[65vh] md:h-[70vh] w-full" // Requirement: 60-70% height
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-102"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Requirement: Dark Mode/Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-20 text-white max-w-4xl">
                {/* Text Animation Classes */}
                <div className="animate-fadeInUp">
                  <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-slate-200 mb-8  italic tracking-tighter max-w-xl font-light">
                    {slide.subtitle}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex gap-2">
                    <Link
                      to={slide.link}
                      className="group relative inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-2 md:py-4 px-5 md:px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
                    >
                      {slide.button}
                      <svg 
                        className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Inline CSS for the Animation (or add to your global CSS) */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        :global(.swiper-button-next), :global(.swiper-button-prev) {
          color: white !important;
          transform: scale(0.7);
        }
        :global(.swiper-pagination-bullet-active) {
          background: #facc15 !important;
        }
      `}</style>
    </section>
  );
};

export default Slider;