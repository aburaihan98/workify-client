import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const [hoursWorkedValue, setHoursWorkedValue] = useState("");
  const [taskId, setTaskId] = useState("");

  //   get all tasks
  const { data: employeeWorkSheet = [], refetch } = useQuery({
    queryKey: ["employeeWorkSheet"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/employeeWorkSheet/${user?.email}`
      );
      return data;
    },
  });

  //   submit task
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const task = form.task.value;
    const hoursWorked = form.hoursWorked.value;

    const employeeInfo = {
      name: user?.displayName,
      email: user?.email,
      tasks: task,
      hoursWorked,
      selectedDate,
      month: selectedDate.toLocaleString("default", { month: "long" }),
    };

    axiosSecure
      .post("/employeeWorkSheet", employeeInfo)
      .then((result) => {
        if (result?.data?.insertedId) {
          refetch();
          toast.success("Employee data successfully added!");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  //   edit task
  const handleEdit = (id) => {
    const taskToEdit = employeeWorkSheet.find((task) => task._id === id);
    setTaskValue(taskToEdit?.task);
    setHoursWorkedValue(taskToEdit?.hoursWorked);
    setSelectedDate(new Date(taskToEdit.selectedDate));
    setTaskId(id);
    handleOpen();
  };

  // Handle task update
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTask = {
      email: user?.email,
      workSheet: taskValue,
      hoursWorked: hoursWorkedValue,
      selectedDate,
    };

    axiosSecure
      .put(`/employeeWorkSheet/${taskId}`, updatedTask)
      .then((result) => {
        if (result.data.modifiedCount) {
          refetch();
          toast.success("WorkSheet updated successfully!");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setOpen(false);
  };

  // Handle task delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        axiosSecure
          .delete(`/employeeWorkSheet/${id}`)
          .then((result) => {
            refetch();
          })
          .catch((error) => {
            toast.error(error?.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Handle the modal open/close
  const handleOpen = () => setOpen(!open);

  return (
    <div className="min-h-screen">
      {/* Form Section */}
      <div className="py-8 px-4">
        <form
          onSubmit={handleAddSubmit}
          className=" flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0 mb-1.5"
        >
          {/* Task Dropdown */}
          <select
            className=" p-2 border rounded w-full md:w-auto"
            name="task"
            required
          >
            <option value="">Select Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
            <option value="Marketing">Marketing</option>
            <option value="Development">Development</option>
          </select>

          {/* Hours Worked Input */}
          <input
            type="number"
            placeholder="Hours Worked"
            className="p-2 border rounded w-full md:w-auto"
            name="hoursWorked"
            required
          />

          {/* Date Picker */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="p-2 border rounded w-full md:w-auto"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Add
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className=" overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-4">ID</th>
              <th className="border p-4">Task</th>
              <th className="border p-4">Hours Worked</th>
              <th className="border p-4">Date</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeWorkSheet?.map((task, index) => (
              <tr key={task._id}>
                <td className="border p-4 text-center">{index + 1}</td>
                <td className="border p-4 text-center">{task.tasks}</td>
                <td className="border p-4 text-center">{task.hoursWorked}</td>
                <td className="border p-4 text-center">
                  {new Date(task.selectedDate).toISOString().split("T")[0]}
                </td>
                <td className="border p-4 flex justify-center gap-3 space-x-2">
                  <Button
                    className="bg-primary hover:bg-blue-900"
                    onClick={() => handleEdit(task._id)}
                    // variant="gradient"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="bg-red-500"
                    onClick={() => handleDelete(task._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Edit Task */}
      <Dialog open={open} handler={handleOpen} className="max-w-4xl w-full">
        <DialogHeader>Edit Task</DialogHeader>
        <DialogBody>
          <form onSubmit={handleUpdate} className="flex flex-row gap-4 mb-8">
            <select
              className="p-2 border rounded"
              name="task"
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              required
            >
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
              <option value="Paper-work">Paper-work</option>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
            </select>
            <input
              type="number"
              placeholder="Hours Worked"
              className="w-1/2 p-2 border rounded"
              name="hoursWorked"
              value={hoursWorkedValue}
              onChange={(e) => setHoursWorkedValue(e.target.value)}
              required
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="p-2 border rounded w-full"
            />
          </form>
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
          <Button variant="gradient" color="green" onClick={handleUpdate}>
            <span>update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default WorkSheet;
