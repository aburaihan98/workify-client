import { Navigate } from "react-router-dom";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { loading } = useAuth();

  if (isLoading || loading) return <LoadingSpinner />;

  if (role === "admin") return children;
  if (role === "hr") {
    return <Navigate to="/dashboard/employee-list" replace="true" />;
  }
  if (role === "employee") {
    return <Navigate to="/dashboard/work-sheet" replace="true" />;
  }
};

export default AdminRoute;
