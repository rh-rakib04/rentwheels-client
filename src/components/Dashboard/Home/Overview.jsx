import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../Loading";
import UserOverview from "./UserOverview";
import AdminOverview from "./AdminOverview";

const Overview = () => {
  const { role, roleLoading } = useRole();
  console.log("Current Role:", role); // DEBUG LINE
  console.log("Loading State:", roleLoading); // DEBUG LINE
  // 1. Handle the loading state first
  if (roleLoading) {
    return <Loading />;
  }

  // 2. Render based on role
  if (role === "admin") {
    return <AdminOverview />;
  }

  if (role === "user") {
    return <UserOverview />;
  }

  // 3. Fallback: If no role is found or user is unauthorized
  return (
    <div className="flex items-center justify-center h-96">
      <p className="text-gray-500 font-medium">
        No dashboard data found for your account.
      </p>
    </div>
  );
};

export default Overview;
