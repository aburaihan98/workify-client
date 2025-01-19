import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Footer from "../components/Shared/Footer/Footer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Navbar from "../components/Shared/Navbar/NavBar";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [role, isLoading] = useRole();

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard/all-employee-list");
    } else if (role === "hr") {
      navigate("/dashboard/employee-list");
    } else if (role === "employee") {
      navigate("/dashboard/work-sheet");
    }
  }, [role, navigate]);

  if (isLoading) return <LoadingSpinner />;

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
