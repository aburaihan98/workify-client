import { Navigate } from "react-router-dom";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "employee" || role === "admin") return children;

  return <Navigate to="/dashboard/work-sheet" replace="true" />;
};

export default EmployeeRoute;
