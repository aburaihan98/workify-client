import React from "react";
import Business from "../../components/Home/Business";
import FAQ from "../../components/Home/FAQ";
import HRSoftwareSection from "../../components/Home/HRSoftwareSection";
import Banner from "./../../components/Home/Banner";
import OurAchievements from "./../../components/Home/OurAchievements";
import Services from "./../../components/Home/Services";
import Testimonials from "./../../components/Home/Testimonials";

function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <Testimonials />
      <Business />
      <HRSoftwareSection />
      <OurAchievements />
      <FAQ />
    </div>
  );
}

export default Home;
