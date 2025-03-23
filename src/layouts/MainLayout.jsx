import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
