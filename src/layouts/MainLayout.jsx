import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import NavBar from "../components/Shared/Navbar/NavBar";

const MainLayout = () => {
  return (
    <div className="">
      <NavBar />
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
