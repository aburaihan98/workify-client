import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // pagination
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsParPage, setItemsParPage] = useState(5);
  const numberOfPages = Math.ceil(count / itemsParPage);
  const pages = [...Array(numberOfPages).keys()];

  // payment History query
  const {
    data: paymentHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email, currentPage, itemsParPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/paymentHistory/${user?.email}?page=${currentPage}&limit=${itemsParPage}`
      );
      return data;
    },
  });

  // payment History count query
  const { data: paymentHistoryCount = {} } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/paymentHistoryCount/${user?.email}`
      );
      setCount(data?.count);
      return data;
    },
  });

  // pagination
  const handleItemParPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsParPage(val);
    setCurrentPage(0);
  };

  const handlePrevItem = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextItem = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 min-h-screen mx-auto shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 py-2 text-center">
        Payment History
      </h1>

      {/* Payment History Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                ID
              </th>
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
              paymentHistory.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">
                    {index + 1}
                  </td>
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
      <div className="flex flex-col items-center mt-8">
        {/* Current Page Display */}
        <p className="text-gray-600 text-sm mb-4">
          Current Page: <span className="font-semibold">{currentPage + 1}</span>
        </p>
        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevItem}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-button text-white hover:bg-hoverColor"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-button text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {page + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={handleNextItem}
            disabled={currentPage === pages.length - 1}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === pages.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-button text-white hover:bg-hoverColor"
            }`}
          >
            Next
          </button>
        </div>

        {/* Items Per Page Selector */}
        <div className="mt-4 text-primary">
          <label
            htmlFor="itemsPerPage"
            className="text-gray-600 text-sm font-medium mr-2"
          >
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsParPage}
            onChange={handleItemParPage}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
