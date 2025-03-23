import { Bars3Icon } from "@heroicons/react/24/solid";
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

const Navbar = () => {
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout();
  };

  return (
    <nav className="w-full backdrop-blur-sm bg-black/50 shadow-md fixed z-50">
      <div className="w-11/12 mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-primary font-bold text-lg"
        >
          <img src={Logo} alt="Company Logo" className="h-12 w-12 rounded" />
        </NavLink>
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-[#896399] font-bold"
                  : "text-white font-bold"
              }
            >
              Contact Us
            </NavLink>
            {/* Dashboard link only visible when user is logged in */}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-[#896399] font-bold"
                    : "text-white font-bold"
                }
              >
                Dashboard
              </NavLink>
            )}
            {/* Conditional User Actions */}
            {!user ? (
              <div className="flex gap-4">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-2 border-[#896399] font-bold"
                      : "text-white font-bold"
                  }
                >
                  <button className="font-medium">Login</button>
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-2 border-[#896399] font-bold"
                      : "text-white font-bold"
                  }
                >
                  <button className="font-medium">Register</button>
                </NavLink>
              </div>
            ) : (
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
            )}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <div className="lg:hidden"></div>
          <Menu>
            <MenuHandler>
              <button className="flex items-center lg:hidden p-2 rounded focus:outline-none">
                <Bars3Icon className="h-8 w-8 text-white" />
              </button>
            </MenuHandler>
            <MenuList className="lg:hidden flex flex-col p-4 gap-3 bg-[#334854] shadow-md">
              {/* Dashboard link only visible when user is logged in */}
              {user && (
                <>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "px-4 py-2 text-white border-b-2 border-[#896399] font-bold"
                        : "px-4 py-2 text-white font-bold"
                    }
                  >
                    Contact Us
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "px-4 py-2 text-white border-b-2 border-[#896399] font-bold"
                        : "px-4 py-2 text-white font-bold"
                    }
                  >
                    Dashboard
                  </NavLink>
                </>
              )}

              {/* Conditional User Actions */}
              {!user ? (
                <>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "px-4 py-2 text-white border-b-2 border-[#896399] font-bold"
                        : "px-4 py-2 text-white font-bold"
                    }
                  >
                    Contact Us
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white border-b-2 border-[#896399] font-bold"
                        : "text-white font-bold"
                    }
                  >
                    <button className="block w-full text-left px-4 py-2">
                      Login
                    </button>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white border-b-2 border-[#896399] font-bold"
                        : "text-white font-bold"
                    }
                  >
                    <button className="block w-full text-left px-4 py-2">
                      Register
                    </button>
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white font-bold"
                >
                  Logout
                </button>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
