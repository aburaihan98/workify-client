import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function VerifiedEmployees() {
  const axiosSecure = useAxiosSecure();
  const [increasingSalary, setIncreasingSalary] = useState();
  const [open, setOpen] = useState(false);
  const [fireEmail, setFireEmail] = useState("");
  const [viewMode, setViewMode] = useState("table");

  //   get verified employees
  const { data: employees = [], refetch } = useQuery({
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
  const handleSalaryAdjustment = (email, salary) => {
    console.log(increasingSalary, salary);

    if (parseInt(increasingSalary) < parseInt(salary)) {
      toast.warning("Salary can only be increased, not decreased.");
      return;
    }

    axiosSecure
      .patch(`/salary-adjustment/${email}`, { increasingSalary })
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

  return (
    <>
      <div className="min-h-screen m-auto bg-gray-100 ">
        <div className="flex justify-around items-center">
          <h1 className="text-3xl font-semibold text-center py-9 my-0.5">
            All Verified Employees
          </h1>
          {/* Toggle Button */}
          <div className="text-center mb-4">
            <button
              onClick={() =>
                setViewMode((prevMode) =>
                  prevMode === "table" ? "grid" : "table"
                )
              }
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              {viewMode === "table"
                ? "Switch to Grid View"
                : "Switch to Table View"}
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Designation</th>
                  <th className="py-3 px-6 text-center">Make HR</th>
                  <th className="py-3 px-6 text-center">Fire</th>
                  <th className="py-3 px-6 text-center">Salary</th>
                  <th className="py-3 px-6 text-center">Salary Adjustment</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {employees?.map((employee) => (
                  <tr
                    key={employee.email}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-4 px-6">{employee.name}</td>
                    <td className="py-4 px-6">{employee.designation}</td>
                    <td className="py-4 px-6 text-center">
                      {employee.role !== "hr" ? (
                        <button
                          onClick={() => handleMakeHR(employee?.email)}
                          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-900"
                        >
                          Make HR
                        </button>
                      ) : (
                        <div className=" uppercase">{employee.role}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {employee.isFired ? (
                        <span className="text-red-500 font-semibold">
                          Fired
                        </span>
                      ) : (
                        <Button
                          onClick={() => {
                            handleOpen();
                            setFireEmail(employee?.email);
                          }}
                          //   variant="gradient"
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Fire
                        </Button>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {employee?.salary}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleSalaryAdjustment(
                              employee?.email,
                              employee?.salary
                            )
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Adjust Salary
                        </button>
                        <input
                          className="w-36 text-white px-4 py-2 bg-green-500  rounded-md hover:bg-green-600 outline-none"
                          onChange={(e) => setIncreasingSalary(e.target.value)}
                          type="text"
                          placeholder="Enter new salary"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
            {employees?.map((employee) => (
              <div
                key={employee.email}
                className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4"
              >
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="text-gray-700">
                  Designation: {employee.designation}
                </p>
                <p className="text-gray-700">Salary: {employee.salary}</p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMakeHR(employee?.email)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-900"
                  >
                    {employee.role !== "hr" ? "Make HR" : "HR"}
                  </button>
                  <button
                    onClick={() => {
                      handleOpen();
                      setFireEmail(employee?.email);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Fire
                  </button>
                </div>

                {/* Salary Adjustment Section */}
                <div className="flex flex-col gap-2">
                  <input
                    className="w-full text-gray-700 px-4 py-2 border rounded-md outline-none"
                    onChange={(e) => setIncreasingSalary(e.target.value)}
                    type="text"
                    placeholder="Enter new salary"
                  />
                  <button
                    onClick={() =>
                      handleSalaryAdjustment(employee?.email, employee?.salary)
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
    </>
  );
}

export default VerifiedEmployees;
