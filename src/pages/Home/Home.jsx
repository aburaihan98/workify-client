import React from "react";
import Banner from "./../../components/Home/Banner";
import OurAchievements from "./../../components/Home/OurAchievements";
import Services from "./../../components/Home/Services";
import Testimonials from "./../../components/Home/Testimonials";
import WhyChooseUs from "./../../components/Home/WhyChooseUs";

function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <Testimonials />
      <OurAchievements />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
