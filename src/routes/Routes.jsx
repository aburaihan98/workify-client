import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Payroll from "../pages/Dashboard/Admin/Payroll";
import VerifiedEmployees from "../pages/Dashboard/Admin/VerifiedEmployees";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet";
import EmployeeList from "../pages/Dashboard/Hr/EmployeeList";
import ErrorPage from "../pages/ErrorPage";
import Payment from "../pages/Payment/Payment";
import RegistrationPage from "../pages/SignUp/Register";
import DashboardLayout from "./../layouts/DashboardLayout";
import Login from "./../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard/",
    element: <DashboardLayout />,
    children: [
      // admin routes
      {
        path: "verifiedEmployees",
        element: <VerifiedEmployees />,
      },
      {
        path: "payroll",
        element: <Payroll />,
      },
      //  hr routes
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
      //employee
      {
        path: "workSheet",
        element: <WorkSheet />,
      },
    ],
  },
]);

export default router;
