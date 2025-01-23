import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: employeesDetails = {}, isLoading } = useQuery({
    queryKey: ["employeesDetails", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/employeesDetails/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const {
    name,
    email,
    role,
    bankAccountNo,
    salary,
    designation,
    photo,
    isVerified,
    isFired,
  } = employeesDetails;

  return (
    <div className="max-w-md mx-auto my-6 lg:my-12 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-center p-4">
        <img
          src={photo}
          alt={name}
          className="h-32 w-32 object-cover rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <p className="text-gray-600 text-center">({role})</p>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Designation:</strong> {designation}
          </p>
          <p>
            <strong>Salary:</strong> ৳{salary}
          </p>
          <p>
            <strong>Bank Account:</strong> {bankAccountNo}
          </p>
          <p>
            <strong>Verified:</strong>{" "}
            <span className={isVerified ? "text-green-600" : "text-red-600"}>
              {isVerified ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={isFired ? "text-red-600" : "text-green-600"}>
              {isFired ? "Fired" : "No Fired"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
