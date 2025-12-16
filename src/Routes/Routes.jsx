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
import AddScholarship from "../Pages/Dashboard/Admin/Addscholarship";
import Managescholarship from "../Pages/Dashboard/Admin/ManageScholarship/Managescholarship";
import Analytics from "../Pages/Dashboard/Admin/Analytics";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import CheckOut from "../Pages/Payment/CheckOut";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancle";
import MyApplication from "../Pages/Dashboard/Students/MyApplications/MyApplication";
import MyReviews from "../Pages/Dashboard/Students/MyReviews/MyReviews";
import ManageApplication from "../Pages/Dashboard/Moderator/ManageApplication";
import AllReviews from "../Pages/Dashboard/Moderator/AllReviews";
import AdminRoute from "./AdminRoute";

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
      {
        path: "/scholarshipdetails/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>,
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>,
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-cancle",
        element: (
          <PrivateRoute>
            <PaymentCancel></PaymentCancel>
          </PrivateRoute>
        ),
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
      {
        path: "/dashboard/addscholarship",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddScholarship></AddScholarship>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/managescholarship",
        element: (
          <PrivateRoute>
            <Managescholarship></Managescholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageuser",
        element: (
          <PrivateRoute>
            <ManageUser></ManageUser>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/analytics",
        element: (
          <PrivateRoute>
            <Analytics></Analytics>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myapplications",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myreviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageapplications",
        element: (
          <PrivateRoute>
            <ManageApplication></ManageApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allreviews",
        element: (
          <PrivateRoute>
            <AllReviews></AllReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
