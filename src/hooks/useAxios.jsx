import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://rentwheels-server-nine.vercel.app",
});

const axiosSecure = () => {
  return axiosInstance;
};

export default axiosSecure;
