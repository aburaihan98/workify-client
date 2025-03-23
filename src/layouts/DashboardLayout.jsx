import { Outlet } from "react-router-dom";
import NavBar from "../components/Dashboard/Shared/NavBar";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#334854] shadow-md sticky top-0 z-20">
        <NavBar />
      </div>
      <div className="grid grid-cols-12 flex-grow">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 col-span-12 flex flex-col">
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
