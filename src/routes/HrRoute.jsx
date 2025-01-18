import { Navigate } from "react-router-dom";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const HrRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "hr") return children;

  return <Navigate to="/dashboard/employee-list" replace="true" />;
};

export default HrRoute;
