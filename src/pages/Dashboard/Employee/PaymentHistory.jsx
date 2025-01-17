import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: paymentHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payroll/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="p-6 min-h-screen mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 py-2 text-center">
        Payment History
      </h1>

      {/* Payment History Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Month
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Year
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  <span className="animate-pulse">Loading...</span>
                </td>
              </tr>
            ) : paymentHistory.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              paymentHistory.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">
                    {payment.month}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">
                    {payment.year}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">
                    {payment.salary}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">
                    {payment.transactionId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* {paymentHistory.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors duration-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors duration-300"
            disabled={paymentHistory.length < perPage}
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
}

export default PaymentHistory;
