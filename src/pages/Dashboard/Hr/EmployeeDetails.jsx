import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";

function EmployeeDetails() {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  // Details
  const { data: employeesDetails = {}, isLoading: loadingDetails } = useQuery({
    queryKey: ["employeesDetails", email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employeesDetails/${email}`);
      return data;
    },
  });

  // paymentHistoryForBarChart
  const { data: paymentHistoryForBarChart = [], isLoading } = useQuery({
    queryKey: ["paymentHistoryForBarChart", email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/paymentHistoryForBarChart/${email}`
      );
      return data;
    },
  });

  if (isLoading || loadingDetails) {
    return <LoadingSpinner />;
  }

  const chartData = paymentHistoryForBarChart.map((item) => ({
    monthYear: `${item.month} ${item.year}`,
    salary: item.salary,
  }));

  return (
    <div className="p-6  mx-auto">
      <div className="flex justify-center items-center m-4">
        <div className="flex items-center mb-2">
          <img
            src={employeesDetails?.photo}
            alt={employeesDetails?.name}
            className="w-16 h-16 rounded-full mr-4"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">{employeesDetails?.name}</h1>
          <div>
            <p className="text-lg font-medium">
              Designation: {employeesDetails?.designation}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-l from-[#078aa5] to-[#03ab82] text-white p-4 my-12 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 ">Salary Chart</h2>
        <div className="p-4 shadow-md rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
