import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";

function NavBar() {
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout();
  };

  return (
    <div className="px-6 py-4 flex justify-end md:justify-between gap-4 items-center ">
      <div className=" hidden md:block">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-primary font-bold text-lg"
        >
          <img src={Logo} alt="Company Logo" className="h-12 w-12 rounded" />
        </NavLink>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <h5 className="font-medium text-lg text-white">
            {user?.displayName}
          </h5>
        </div>
        <Menu>
          <MenuHandler>
            <Avatar
              src={user.photoURL}
              alt="User"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </MenuHandler>
          <MenuList className="bg-white rounded-md shadow-lg">
            <MenuItem
              onClick={handleLogout}
              className="text-primary text-center hover:bg-red-50"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
