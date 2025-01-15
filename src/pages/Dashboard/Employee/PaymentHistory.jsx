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

  console.log(paymentHistory);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      {/* Payment History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Month</th>
              <th className="px-4 py-2 border-b">Year</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paymentHistory.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No payment history found.
                </td>
              </tr>
            ) : (
              paymentHistory.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-4 py-2 border-b">{payment.month}</td>
                  <td className="px-4 py-2 border-b">{payment.year}</td>
                  <td className="px-4 py-2 border-b">{payment.amount}</td>
                  <td className="px-4 py-2 border-b">
                    {payment.transactionId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {paymentHistory.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            disabled={paymentHistory.length < perPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
