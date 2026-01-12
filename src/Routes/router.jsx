import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BrowseCars from "../pages/BrowserCar";
import CarDetails from "../components/CarDetails";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contract from "../pages/Contract";
import PaymentSuccess from "../components/Dashboard/PaymentSuccess";
import Overview from "../components/Dashboard/Home/Overview";
import MyListings from "../components/Dashboard/MyListings";
import MyBookings from "../components/Dashboard/MyBookings";
import AddCar from "../components/Dashboard/AddCar";
import PaymentHistory from "../components/Dashboard/PaymentHistory";
import AllCar from "../components/Dashboard/Admin/AllCars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/browse-cars",
        element: <BrowseCars />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contract />,
      },

      {
        path: "/cars/:id",
        element: <CarDetails />,
      },

      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },

      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "all-cars",
        element: <AllCar />,
      },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <div>Payment Cancelled</div> },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "add-car",
        element: <AddCar />,
      },
    ],
  },
]);
export default router;
