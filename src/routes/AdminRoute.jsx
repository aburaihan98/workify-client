import { Navigate } from "react-router-dom";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "admin") return children;

  return <Navigate to="/dashboard/all-employee-list" replace="true" />;
};

export default AdminRoute;
