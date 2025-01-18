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

  // payroll
  const { data: employeesPayroll = [], isLoading } = useQuery({
    queryKey: ["employeesPayroll", email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employeesPayroll/${email}`);
      return data;
    },
  });

  const userInfo = employeesPayroll.find((user) => user?.email === email);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const chartData = employeesPayroll.map((item) => ({
    monthYear: `${item.month} ${item.year}`,
    salary: item.salary,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">{userInfo.name}</h1>
        <div className="flex items-center mb-4">
          <img
            src={userInfo.photo}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-medium">
              Designation: {userInfo.designation}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Salary Chart</h2>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
