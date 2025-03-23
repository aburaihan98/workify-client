import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";

function VerifiedEmployees() {
  const axiosSecure = useAxiosSecure();
  const [increasingSalary, setIncreasingSalary] = useState();
  const [open, setOpen] = useState(false);
  const [fireEmail, setFireEmail] = useState("");
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentSalary, setCurrentSalary] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  //   get verified employees
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verified-employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/verified-employees");
      return data;
    },
  });

  //   verified employees
  const handleMakeHR = (email) => {
    axiosSecure
      .patch(`/verified-employees/${email}`)
      .then((result) => {
        if (result?.data.modifiedCount > 0) {
          refetch();
          toast.success("Successfully made the employee an HR!");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  //   handle Salary Adjustment
  const handleSalaryAdjustment = () => {
    if (
      !increasingSalary ||
      parseInt(increasingSalary) < parseInt(currentSalary)
    ) {
      toast.warning("Salary can only be increased, not decreased.");
      return;
    }

    axiosSecure
      .patch(`/salary-adjustment/${selectedEmployee}`, { increasingSalary })
      .then((result) => {
        if (result?.data?.modifiedCount) {
          refetch();
          toast.success("Salary adjusted successfully!");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  //   handleFire
  const handleFire = () => {
    const firedUserInfo = {
      email: fireEmail,
      status: "fired",
    };

    // post
    axiosSecure
      .post("/firedUser", firedUserInfo)
      .then((result) => {
        if (result?.data?.insertedId) {
          refetch();
          toast.success("Your firing has been successful.");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    //   patch
    axiosSecure.patch(`/firedUser/${fireEmail}`).then(() => {
      refetch();
    });
  };

  const handleOpen = () => setOpen(!open);
  const handleSalaryOpen = () => setSalaryOpen(!salaryOpen);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="py-6 md:py-12">
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -100 }}
          transition={{
            duration: 1,
            ease: "linear",
          }}
          className="flex justify-around items-center"
        >
          <h2 className="text-4xl font-semibold text-center mb-4 md:mb-8">
            All Verified Employees
          </h2>
          {/* Toggle Button */}
          <div className="text-center mb-7">
            <button
              onClick={() =>
                setViewMode((prevMode) =>
                  prevMode === "table" ? "grid" : "table"
                )
              }
              className="px-6 py-2 bg-button text-white rounded-md hover:bg-hoverColor"
            >
              {viewMode === "table"
                ? "Switch to Grid View"
                : "Switch to Table View"}
            </button>
          </div>
        </motion.div>

        {/* Conditional Rendering */}
        {viewMode === "table" ? (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: 100 }}
            transition={{
              duration: 1,
              ease: "linear",
            }}
            className="overflow-x-auto"
          >
            <table className="min-w-full table-auto shadow-md overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 dark:bg-[#1a202e]">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Designation</th>
                  <th className="py-3 px-6 text-center">Make HR</th>
                  <th className="py-3 px-6 text-center">Fire</th>
                  <th className="py-3 px-6 text-center">Salary</th>
                  <th className="py-3 px-6 text-center">Salary Adjustment</th>
                </tr>
              </thead>
              <tbody className="">
                {employees?.map((employee, index) => (
                  <tr
                    key={employee.email}
                    className="border-b hover:bg-gray-100 hover:text-primary"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{employee.name}</td>
                    <td className="py-4 px-6">{employee.designation}</td>
                    <td className="py-4 px-6 text-center">
                      {employee.role !== "hr" ? (
                        <button
                          onClick={() => handleMakeHR(employee?.email)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900"
                        >
                          Make HR
                        </button>
                      ) : (
                        <div className=" uppercase">{employee.role}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {employee.isFired ? (
                        <span className="text-red-500 font-semibold hover:bg-red-900">
                          Fired
                        </span>
                      ) : (
                        <Button
                          onClick={() => {
                            handleOpen();
                            setFireEmail(employee?.email);
                          }}
                          //   variant="gradient"
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-900"
                        >
                          Fire
                        </Button>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {employee?.salary}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => {
                          handleSalaryOpen();
                          setSelectedEmployee(employee?.email);
                          setCurrentSalary(employee?.salary);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900"
                      >
                        Adjust Salary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
            {employees?.map((employee) => (
              <div
                key={employee.email}
                className="shadow-md rounded-md p-6 flex flex-col gap-4"
              >
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="">Designation: {employee.designation}</p>
                <p className="">Salary: {employee.salary}</p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMakeHR(employee?.email)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900"
                  >
                    {employee.role !== "hr" ? "Make HR" : "HR"}
                  </button>
                  <button
                    onClick={() => {
                      handleOpen();
                      setFireEmail(employee?.email);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-900"
                  >
                    Fire
                  </button>
                </div>

                {/* Salary Adjustment Section */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleSalaryOpen();
                      setSelectedEmployee(employee?.email);
                      setCurrentSalary(employee?.salary);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900"
                  >
                    Adjust Salary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* modal  */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirm Fire Action</DialogHeader>
        <DialogBody>
          Are you sure you want to fire this staff member? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              handleFire();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* adjust salary modal  */}
      <Dialog open={salaryOpen} handler={handleSalaryOpen}>
        <DialogHeader>Salary Adjustment</DialogHeader>
        <DialogBody>
          <p className="mb-4 text-base font-medium">
            Are you sure you want to adjust the salary to:{" "}
            <span className="font-semibold text-blue-600">{currentSalary}</span>
            ?
          </p>
          <input
            onChange={(e) => setIncreasingSalary(e.target.value)}
            type="text"
            placeholder="Enter new salary"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleSalaryOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleSalaryAdjustment(), handleSalaryOpen();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default VerifiedEmployees;
