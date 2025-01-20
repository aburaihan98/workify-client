import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
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
                  <li className="px-8 py-2 hover:bg-gray-200">Work Sheet</li>
                </Link>
                <Link to="/dashboard/payment-history">
                  <li className="px-8 py-2 hover:bg-gray-200">
                    Payment History
                  </li>
                </Link>
              </>
            )}

            {role === "hr" && (
              <>
                <Link to="/dashboard/employee-list">
                  <li className="px-8 py-2 hover:bg-gray-200">Employee List</li>
                </Link>
                <Link to="/dashboard/progress">
                  <li className="px-8 py-2 hover:bg-gray-200">Progress</li>
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link to="/dashboard/all-employee-list">
                  <li className="px-8 py-2 hover:bg-gray-200">
                    All Employee List
                  </li>
                </Link>
                <Link to="/dashboard/payroll">
                  <li className="px-8 py-2 hover:bg-gray-200">Payroll</li>
                </Link>
                <Link to="/dashboard/work-sheet">
                  <li className="px-8 py-2 hover:bg-gray-200">Work Sheet</li>
                </Link>
                <Link to="/dashboard/payment-history">
                  <li className="px-8 py-2 hover:bg-gray-200">
                    Payment History
                  </li>
                </Link>
                <Link to="/dashboard/employee-list">
                  <li className="px-8 py-2 hover:bg-gray-200">Employee List</li>
                </Link>
                <Link to="/dashboard/progress">
                  <li className="px-8 py-2 hover:bg-gray-200">Progress</li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
