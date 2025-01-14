import { Outlet } from "react-router-dom";
import Banner from "../components/Home/Banner";
import Services from "../components/Home/Services";
import Testimonials from "../components/Home/Testimonials";
import NavBar from "../components/Shared/Navbar/NavBar";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <Banner />
      <Services />
      <Testimonials />
      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
