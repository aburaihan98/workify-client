import { Outlet } from "react-router-dom";
import Footer from "../components/Dashboard/Shared/Footer";
import NavBar from "../components/Dashboard/Shared/NavBar";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-10">
        <div className="lg:col-span-2 h-full">
          <Sidebar />
        </div>
        <div className="lg:col-span-8 col-span-10">
          <div className="bg-primary shadow-md sticky top-0 z-20">
            <NavBar />
          </div>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
