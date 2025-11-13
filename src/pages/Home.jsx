import React from "react";
import Slider from "../components/Home/Slider";
import FeaturedCars from "../components/Home/FeaturedCars";
import WhyRentWithUs from "../components/Home/WhyRentWithUs";
import TopRatedCars from "../components/Home/TopRatedCars";
import CustomerTestimonials from "../components/Home/CustomerTestimonals";
import UpcomingCars from "../components/Home/UpcomingCars";

const featuredCarsPromise = fetch("http://localhost:5000/featured-cars").then(
  (res) => res.json()
);
const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedCars featuredCarsPromise={featuredCarsPromise} />
      <WhyRentWithUs />
      <TopRatedCars featuredCarsPromise={featuredCarsPromise} />
      <CustomerTestimonials />
      <UpcomingCars />
    </div>
  );
};

export default Home;
