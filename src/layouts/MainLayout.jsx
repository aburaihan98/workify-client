import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/Navbar/NavBar";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <NavBar />

      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
