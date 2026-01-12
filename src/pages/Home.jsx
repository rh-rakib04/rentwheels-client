import React from "react";
import Slider from "../components/Home/Slider";
import FeaturedCars from "../components/Home/FeaturedCars";
import WhyRentWithUs from "../components/Home/WhyRentWithUs";
import TopRatedCars from "../components/Home/TopRatedCars";
import CustomerTestimonials from "../components/Home/CustomerTestimonals";
import UpcomingCars from "../components/Home/UpcomingCars";
import HowItWorks from "../components/Home/HowItWorks";
import TrustStats from "../components/Home/TrustStats";
import FinalCTA from "../components/Home/FinalCTA";

const featuredCarsPromise = fetch(
  "https://rentwheels-server-nine.vercel.app/featured-cars"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Slider />
      <TrustStats/>
      <FeaturedCars featuredCarsPromise={featuredCarsPromise} />
      <WhyRentWithUs />
      <HowItWorks />
      <TopRatedCars featuredCarsPromise={featuredCarsPromise} />
      <CustomerTestimonials />
      <UpcomingCars />
      <FinalCTA/>
    </div>
  );
};

export default Home;