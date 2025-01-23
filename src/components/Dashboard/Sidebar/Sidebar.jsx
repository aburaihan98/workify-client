import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  FaChartLine,
  FaClipboard,
  FaHome,
  FaListAlt,
  FaMoneyBill,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 fixed top-3 md:top-2.5 left-4 z-50 bg-gray-100 rounded-md shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7 " />
        ) : (
          <Bars3Icon className="h-7 w-7 md:pt-2 md:w-10 " />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen  bg-gray-100 text-gray-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:w-full`}
      >
        <div className="p-10 text-2xl font-bold border-b border-gray-600">
          Dashboard
        </div>
        <nav className="mt-4 min-h-screen">
          <ul>
            {role === "employee" && (
              <>
                <Link to="/dashboard/work-sheet">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaClipboard className="mr-2" /> Work Sheet
                  </li>
                </Link>
                <Link to="/dashboard/payment-history">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaMoneyBill className="mr-2" /> Payment History
                  </li>
                </Link>
              </>
            )}

            {role === "hr" && (
              <>
                <Link to="/dashboard/employee-list">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaUserAlt className="mr-2" /> Employee List
                  </li>
                </Link>
                <Link to="/dashboard/progress">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaChartLine className="mr-2" /> Progress
                  </li>
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link to="/dashboard/all-employee-list">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaListAlt className="mr-2" /> All Employee List
                  </li>
                </Link>
                <Link to="/dashboard/payroll">
                  <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                    <FaMoneyBill className="mr-2" /> Payroll
                  </li>
                </Link>
              </>
            )}
            <hr className="my-2 border-gray-300" />
            <Link to="/">
              <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
                <FaHome className="mr-2" /> Home
              </li>
            </Link>
            <Link to="/dashboard">
              <li className="px-8 py-2 hover:bg-gray-200 flex items-center">
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
