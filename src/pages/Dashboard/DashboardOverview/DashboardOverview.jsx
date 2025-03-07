import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch total employees
  const { data: employeesCount = {} } = useQuery({
    queryKey: ["totalEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees/count");
      return res.data;
    },
  });

  // Fetch total paid employees
  const { data: paidEmployeesData = {} } = useQuery({
    queryKey: ["paidEmployeesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees/paid");
      return res.data;
    },
  });

  // Fetch pending payments employees
  const { data: pendingEmployeesData } = useQuery({
    queryKey: ["pendingEmployeesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees/pending");
      return res.data;
    },
  });

  // Fetch payment History
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment/history");
      return res.data;
    },
  });

  return (
    <div className="px-6 py-6 md:py-12">
      {/* Employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-2xl">{employeesCount?.totalEmployees}</p>
        </div>

        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Paid Employees</h2>
          <p className="text-2xl">{paidEmployeesData?.totalPaidEmployees}</p>
        </div>

        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Pending Payments</h2>
          <p className="text-2xl">
            {pendingEmployeesData?.pendingPaymentsEmployees}
          </p>
        </div>
      </div>

      {/* Salary Chart */}
      <div className="p-4 my-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Salary History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentHistory}>
            <XAxis dataKey="month" tick={{ fill: "#4A90E2" }} />
            <YAxis tick={{ fill: "#4A90E2" }} />
            <Tooltip />
            <Bar dataKey="salary" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Payments Table */}
      <div className="py-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
        <table className="w-full border-collapse border border-gray-200 text-center">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 border border-gray-200">Employee</th>
              <th className="p-2 border border-gray-200">Month</th>
              <th className="p-2 border border-gray-200">Amount</th>
              <th className="p-2 border border-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((record) => (
              <tr
                key={record.transactionId}
                className="border border-gray-200 border-b hover:bg-gray-100 hover:text-primary"
              >
                <td className="p-2 border border-gray-200">{record.email}</td>
                <td className="p-2 border border-gray-200">{record.month}</td>
                <td className="p-2 border border-gray-200">${record.salary}</td>
                <td className="p-2 border border-gray-200">
                  {new Date(record.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
