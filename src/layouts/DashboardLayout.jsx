import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/NavBar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="lg:col-span-3">
          <Sidebar />
        </div>
        <div className="lg:col-span-9 col-span-12">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
