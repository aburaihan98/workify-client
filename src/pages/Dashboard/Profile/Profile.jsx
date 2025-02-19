import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 m-auto py-12 px-12 overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center p-4">
          <img
            src={photo}
            alt={name}
            className="object-cover rounded-lg border-4 border-gray-200 shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="md:ml-8 md:mt-0 text-left p-4">
          <h2 className="text-2xl font-bold  text-center md:text-left">
            {name}
          </h2>
          <p className=" text-lg text-center md:text-left">({role})</p>

          <div className="mt-5 space-y-3">
            <p className="">
              <strong className="">Email:</strong> {email}
            </p>
            <p className="">
              <strong className="">Designation:</strong> {designation}
            </p>
            <p className="">
              <strong className="">Salary:</strong>
              <span className="text-green-600 font-medium"> ${salary}</span>
            </p>
            <p className="">
              <strong className="">Bank Account:</strong> {bankAccountNo}
            </p>
            <p className="">
              <strong className="">Verified:</strong>{" "}
              <span
                className={
                  isVerified
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {isVerified ? "Yes" : "No"}
              </span>
            </p>
            <p className="">
              <strong className="">Status:</strong>{" "}
              <span
                className={
                  isFired
                    ? "text-red-500 font-medium"
                    : "text-green-500 font-medium"
                }
              >
                {isFired ? "Fired" : "Not Fired"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
