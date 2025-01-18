import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user && user?.email) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <Navigate state={pathname} to="/login"></Navigate>
    </div>
  );
}
