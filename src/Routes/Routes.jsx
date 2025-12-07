import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../Private Route/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthenticationLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
  },
]);
