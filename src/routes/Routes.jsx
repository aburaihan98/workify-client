import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import Payment from "../pages/Payment/Payment";
import Register from "../pages/SignUp/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
