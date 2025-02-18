import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // all employees data
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/employees");
      return data;
    },
  });

  // toggle Verification
  const toggleVerification = async (id, isVerified) => {
    const { data } = await axiosSecure.patch(`/employeesVerified/${id}`, {
      isVerified: !isVerified,
    });
    if (data?.modifiedCount > 0) {
      refetch();
      toast.success(
        `Employee verification status successfully ${
          isVerified ? "removed" : "updated"
        }!`
      );
    }
  };

  // ReactTable columns
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
    {
      header: "Pay",
      cell: ({ row }) => (
        <button
          onClick={() => {
            if (row.original.isVerified) {
              setSelectedEmployee(row.original);
              handleOpen();
            } else {
              toast.warning("Only verified employees can be paid.");
            }
          }}
          disabled={!row.original.isVerified}
          className={`px-4 py-2 rounded ${
            row.original.isVerified
              ? "bg-button hover:bg-hoverColor text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
          }`}
        >
          Pay
        </button>
      ),
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <Link to={`/dashboard/details/${row.original.email}`}>
          <button className="px-4 py-2 rounded bg-button hover:bg-hoverColor text-white">
            Details
          </button>
        </Link>
      ),
    },
  ];

  // ReactTable
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // handlePay
  const handlePayRequest = () => {
    const { name, email, designation, photo, salary } = selectedEmployee;
    const payInfo = {
      name,
      email,
      designation,
      photo,
      salary,
      month,
      year,
      isPaid: false,
      createdAt: new Date(),
    };

    // post payroll
    axiosSecure
      .post("/payroll", payInfo)
      .then((result) => {
        if (result?.data?.insertedId) {
          toast.success("Pay request submitted successfully!");
        }
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center py-10">Employee Table</h1>
      <div className=" overflow-x-auto">
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
                  <td key={cell.id} className="py-3 px-4 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`px-4 py-2 rounded ${
              table.getCanPreviousPage()
                ? "bg-primary text-white hover:bg-blue-900"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          {/* Page Info */}
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          {/* Next Button */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`px-4 py-2 rounded ${
              table.getCanNextPage()
                ? "bg-primary text-white hover:bg-blue-900"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      {/* Modal */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Pay Employee</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <p>
              <strong>Employee Name:</strong> {selectedEmployee?.name}
            </p>
            <p>
              <strong>Salary:</strong> ${selectedEmployee?.salary}
            </p>
            <div className="space-y-4">
              {/* Month Selector */}
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700"
                >
                  Month
                </label>
                <div className="relative mt-1">
                  <select
                    required
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="" disabled>
                      Select a month
                    </option>
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
                  {/* Dropdown Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Year Input */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <div className="relative mt-1">
                  <input
                    required
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year (e.g., 2025)"
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handlePayRequest();
              handleOpen();
            }}
            disabled={
              !selectedEmployee?.isVerified ||
              !month ||
              !year ||
              isNaN(year) ||
              year.length !== 4
            }
          >
            Pay
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default EmployeeList;
