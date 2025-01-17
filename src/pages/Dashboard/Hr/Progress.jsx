import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function Progress() {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const { data: employeeName = [] } = useQuery({
    queryKey: ["employeeName"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/employeeWorkSheet/name");
      return data;
    },
  });

  const { data: employeeWorkSheet = [] } = useQuery({
    queryKey: ["employeeWorkSheet", selectedEmployee, selectedMonth],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/employeeWorkSheet?employeeId=${selectedEmployee}&month=${selectedMonth}`
      );
      return data;
    },
  });

  return (
    <div className="p-8 min-h-screen mx-auto bg-white shadow-lg ">
      <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
        Employee Work Progress
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        {/* Employee Dropdown */}
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee
          </label>
          <select
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employeeName.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Month
          </label>
          <select
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>

      {/* Table to show work records */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                Employee Name
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                Employee Email
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                Work Sheet
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                Hours Worked
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeWorkSheet.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              employeeWorkSheet.map((record) => (
                <tr key={record._id} className="border-t">
                  <td className="px-6 py-4 text-center">{record.name}</td>
                  <td className="px-6 py-4 text-center">{record.email}</td>
                  <td className="px-6 py-4 text-center">{record.tasks}</td>
                  <td className="px-6 py-4 text-center">
                    {record.hoursWorked}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {record.selectedDate}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Progress;
