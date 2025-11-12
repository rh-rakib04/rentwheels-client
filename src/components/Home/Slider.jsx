import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Slider = () => {
  const slides = [
    {
      image: "/src/assets/car1.jpeg",
      title: "Drive Your Dream Car Today",
      subtitle: "Affordable, reliable, and always ready for the road.",
      button: "Browse Cars",
    },
    {
      image: "/src/assets/car2.jpeg",
      title: "Luxury Meets Performance",
      subtitle: "Experience comfort and style with RentWheels.",
      button: "Explore More",
    },
    {
      image: "/src/assets/car3.jpeg",
      title: "Adventure Awaits You",
      subtitle: "Book your next trip confidently — anywhere, anytime.",
      button: "Book Now",
    },
  ];

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[85vh] md:h-[90vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent dark:from-black/80 dark:via-black/60"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 text-white max-w-2xl">
                <h1 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  to="/browse-cars"
                  className="bg-yellow-400 text-slate-900 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
