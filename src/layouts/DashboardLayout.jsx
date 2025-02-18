import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-10">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-8 col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
