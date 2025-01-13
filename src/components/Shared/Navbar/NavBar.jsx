import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    userLogout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-lg"
        >
          <img src="/logo.png" alt="Company Logo" className="h-8 w-8" />
          Company
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-700 hover:text-blue-600 font-medium"
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
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600 font-medium"
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
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 font-medium"
                }
              >
                <button className="font-medium">Login</button>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 font-medium"
                }
              >
                <button className="font-medium">Register</button>
              </NavLink>
            </div>
          ) : (
            <Menu as="div" className="relative">
              <MenuHandler>
                <Avatar
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="User"
                  className="cursor-pointer"
                />
              </MenuHandler>
              <MenuList className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem
                  onClick={handleLogout}
                  className="text-blue-600 hover:bg-red-50"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="lg:hidden p-2 rounded focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="lg:hidden bg-gray-50 shadow-md">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
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
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Conditional User Actions */}
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-blue-50"
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
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-blue-50"
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
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
