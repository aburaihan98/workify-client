import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
