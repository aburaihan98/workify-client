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
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/SignUp/Register";
import DashboardLayout from "./../layouts/DashboardLayout";
import Login from "./../pages/Login/Login";
import Payment from "./../pages/Payment/Payment";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "all-employee-list",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <VerifiedEmployees />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Payroll />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      //  HR routes
      {
        path: "employee-list",
        element: (
          <PrivateRoute>
            <HrRoute>
              <EmployeeList />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "employee-details/:email",
        element: (
          <PrivateRoute>
            <HrRoute>
              <EmployeeDetails />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <PrivateRoute>
            <HrRoute>
              <Progress />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      //employee
      {
        path: "work-sheet",
        element: (
          <PrivateRoute>
            <WorkSheet />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
