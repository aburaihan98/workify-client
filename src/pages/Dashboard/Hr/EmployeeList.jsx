import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/employees");
      return data;
    },
  });

  const toggleVerification = async (id, isVerified) => {
    await axiosSecure.patch(`/employees/${id}`, { isVerified: !isVerified });
  };

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Verified",
      accessorKey: "isVerified",
      cell: ({ row }) => (
        <button
          onClick={() =>
            toggleVerification(row.original._id, row.original.isVerified)
          }
          className={`px-2 py-1 rounded ${
            row.original.isVerified ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.isVerified ? "✅" : "❌"}
        </button>
      ),
    },
    { header: "Bank Account", accessorKey: "bankAccountNo" },
    { header: "Salary", accessorKey: "salary" },
    { header: "Designation", accessorKey: "designation" },
    {
      header: "Photo",
      accessorKey: "photo",
      cell: ({ row }) => (
        <img
          src={row.original.photo}
          alt={row.original.name}
          className="w-12 h-12 rounded-full"
        />
      ),
    },
    {
      header: "Pay",
      cell: ({ row }) => (
        <button
          onClick={() => {
            if (row.original.isVerified) {
              setSelectedEmployee(row.original);
              setModalOpen(true);
            } else {
              alert("Only verified employees can be paid.");
            }
          }}
          disabled={!row.original.isVerified}
          className={`px-4 py-2 rounded ${
            row.original.isVerified
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Pay
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Employee Table</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-4">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Pay Employee</h2>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {selectedEmployee?.name}
              </p>
              <p>
                <strong>Salary:</strong> {selectedEmployee?.salary}
              </p>
            </div>
            <input
              type="text"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="block w-full border border-gray-300 rounded mt-2"
            />
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-full border border-gray-300 rounded mt-2"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Payment successful!");
                  setModalOpen(false);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
