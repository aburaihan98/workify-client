import { Outlet } from "react-router-dom";
import Banner from "../components/Home/Banner";
import NavBar from "../components/Shared/Navbar/NavBar";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <Banner />
      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
