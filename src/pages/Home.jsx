import React from "react";
import Slider from "../components/Home/Slider";
import FeaturedCars from "../components/Home/FeaturedCars";

const featuredCarsPromise = fetch("http://localhost:5000/featured-cars").then(
  (res) => res.json()
);
const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedCars featuredCarsPromise={featuredCarsPromise} />
    </div>
  );
};

export default Home;
