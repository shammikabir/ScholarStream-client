import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../Private Route/PrivateRoute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AllScholarship from "../Pages/AllScholarship";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allscholarship",
        element: <AllScholarship></AllScholarship>,
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
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
