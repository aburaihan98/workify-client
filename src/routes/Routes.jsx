import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Payroll from "../pages/Dashboard/Admin/Payroll";
import VerifiedEmployees from "../pages/Dashboard/Admin/VerifiedEmployees";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet";
import EmployeeDetails from "../pages/Dashboard/Hr/EmployeeDetails";
import EmployeeList from "../pages/Dashboard/Hr/EmployeeList";
import Progress from "../pages/Dashboard/Hr/Progress";
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
      //  HR routes
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
      {
        path: "employee-details/:id",
        element: <EmployeeDetails />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
      //employee
      {
        path: "workSheet",
        element: <WorkSheet />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);

export default router;
