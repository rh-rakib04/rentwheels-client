import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Browser from "../pages/Browser";
import AddCar from "../pages/AddCar";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";

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
        path: "/browser",
        element: <Browser />,
      },
      {
        path: "/add-car",
        element: <AddCar />,
      },
      {
        path: "/my-listings",
        element: <MyListings />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
    ],
  },
]);
export default router;
