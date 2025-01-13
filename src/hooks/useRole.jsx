import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
}

export default useRole;
