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
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: employee = {}, isLoading } = useQuery({
    queryKey: ["employee", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employees/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const salaryRecords = employee.salaryRecords || [
    { monthYear: "Jan 2024", salary: 5000 },
    { monthYear: "Feb 2024", salary: 5200 },
    { monthYear: "Mar 2024", salary: 5400 },
  ];

  const chartData = salaryRecords.map((record) => ({
    monthYear: record.monthYear,
    salary: record.salary,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{employee.name}</h1>
      <div className="flex items-center mb-4">
        <img
          src={employee.photo}
          alt={employee.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <p className="text-lg font-medium">
            Designation: {employee.designation}
          </p>
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
