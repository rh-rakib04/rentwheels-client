import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import AddCar from "../pages/AddCar";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BrowseCars from "../pages/BrowserCar";
import CarDetails from "../components/CarDetails";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contract from "../pages/Contract";

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
        path: "/add-car",
        element: <AddCar />,
      },
      {
        path: "/cars/:id",
        element: <CarDetails />,
      },
      {
        path: "/my-listings",
        element: <MyListings />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
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
]);
export default router;
