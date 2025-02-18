import React from "react";
import EmployeeBenefits from "../../components/Home/EmployeeBenefits";
import MeetOurTeam from "../../components/Home/MeetOurTeam";
import WorkplaceInsights from "../../components/Home/WorkplaceInsights";
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
      <MeetOurTeam />
      <EmployeeBenefits />
      <WorkplaceInsights />
    </div>
  );
}

export default Home;
