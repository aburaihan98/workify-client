import { Link } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return (
    <aside className="min-h-screen bg-gray-100 text-gray-800">
      <div className="p-10 text-center text-2xl font-bold border-b border-gray-600">
        Dashboard
      </div>
      <nav className="mt-4">
        <ul>
          {role === "employee" && (
            <>
              <Link to="/dashboard/work-sheet">
                <li className="px-8 py-2 hover:bg-gray-200">Work Sheet</li>
              </Link>
              <Link to="/dashboard/payment-history">
                <li className="px-8 py-2 hover:bg-gray-200">Payment History</li>
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
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
