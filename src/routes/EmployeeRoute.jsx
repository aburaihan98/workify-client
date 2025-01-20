import { Navigate } from "react-router-dom";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { loading } = useAuth();

  if (isLoading || loading) return <LoadingSpinner />;

  if (role === "employee" || role === "admin") return children;
  if (role === "hr") {
    return <Navigate to="/dashboard/employee-list" replace="true" />;
  }
};

export default EmployeeRoute;
