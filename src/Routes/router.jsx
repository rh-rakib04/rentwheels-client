import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BrowseCars from "../pages/BrowserCar";
import CarDetails from "../components/CarDetails";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contract from "../pages/Contract";
import Overview from "../components/Dashboard/Home/Overview";
import MyListings from "../components/Dashboard/MyListings";
import MyBookings from "../components/Dashboard/MyBookings";
import AddCar from "../components/Dashboard/AddCar";

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
    element: <MainLayout />,
    children: [
      {
        index: true,
        element:<Overview/>
      },{
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },{
        path: "add-car",
        element: <AddCar />,
      },
    ]
  }
]);
export default router;
