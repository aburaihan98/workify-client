import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  FaChartLine,
  FaClipboard,
  FaEnvelope,
  FaHome,
  FaListAlt,
  FaMoneyBill,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "./../../Shared/LoadingSpinner";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, isLoading] = useRole();
  const { user } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="z-[1000] bg-[#334854] text-gray-100 h-full">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 fixed top-3 md:top-2.5 left-4 z-50  rounded-md shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7 text-white" />
        ) : (
          <Bars3Icon className="h-7 w-7 md:pt-2 md:w-10 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={` z-[1000] mt-[72px] md:mt-0 fixed top-0 left-0 bg-[#334854] text-gray-100  shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:w-full`}
      >
        <div className="py-8">
          <img
            className="m-auto rounded-lg w-20 h-20"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <p className="text-center mt-2 ">{user?.displayName}</p>
          <p className="text-center text-[12px]  ">({role})</p>
        </div>
        <nav className="pt-4 min-h-screen">
          <ul>
            <Link to="/dashboard">
              <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                <RxDashboard className="mr-2" />
                Overview
              </li>
            </Link>
            {role === "employee" && (
              <>
                <Link to="/dashboard/work-sheet">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaClipboard className="mr-2" /> Work Sheet
                  </li>
                </Link>
                <Link to="/dashboard/payment-history">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaMoneyBill className="mr-2" /> Payment History
                  </li>
                </Link>
              </>
            )}

            {role === "hr" && (
              <>
                <Link to="/dashboard/employee-list">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9]] flex items-center">
                    <FaUserAlt className="mr-2" /> Employee List
                  </li>
                </Link>
                <Link to="/dashboard/progress">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaChartLine className="mr-2" /> Progress
                  </li>
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link to="/dashboard/all-employee-list">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaListAlt className="mr-2" /> Verified Employee
                  </li>
                </Link>
                <Link to="/dashboard/payroll">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaMoneyBill className="mr-2" /> Payroll
                  </li>
                </Link>
                <Link to="/dashboard/contactUs-message">
                  <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                    <FaEnvelope className="mr-2" /> Message
                  </li>
                </Link>
              </>
            )}
            <hr className="my-2 border-gray-300" />
            <Link to="/">
              <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                <FaHome className="mr-2" /> Home
              </li>
            </Link>
            <Link to="/dashboard/profile">
              <li className="px-8 py-4 hover:bg-[#1a202e] hover:text-[#c5cdd9] flex items-center">
                <FaUser className="mr-2" /> Profile
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
