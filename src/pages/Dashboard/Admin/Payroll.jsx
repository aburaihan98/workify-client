import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function Payroll() {
  const axiosSecure = useAxiosSecure();

  const { data: payrollEmployees = [], refetch } = useQuery({
    queryKey: ["payrollEmployees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payroll");
      return data;
    },
  });

  const handlePayment = (id) => {
    axiosSecure
      .patch(`/payroll/${id}`)
      .then((result) => {
        if (result?.data?.modifiedCount > 0) {
          toast.success("Payment successful!");
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <div className="w-11/12 m-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Employee Payment Requests
      </h1>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Salary</th>
            <th className="py-3 px-6 text-left">Month</th>
            <th className="py-3 px-6 text-left">Year</th>
            <th className="py-3 px-6 text-left">Payment Date</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {payrollEmployees.map((employee) => (
            <tr key={employee._id} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6">{employee.name}</td>
              <td className="py-4 px-6">{employee.salary}</td>
              <td className="py-4 px-6">{employee.month}</td>
              <td className="py-4 px-6">{employee.year}</td>
              <td className="py-4 px-6">
                {employee.paymentDate || (
                  <span className="text-red-500 font-medium">Pending</span>
                )}
              </td>
              <td className="py-4 px-6 text-center">
                <button
                  onClick={() => handlePayment(employee._id)}
                  className={`px-4 py-2 rounded-md text-white ${
                    employee.isPaid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={employee.isPaid}
                >
                  {employee.isPaid ? "Paid" : "Pay"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payroll;
