import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const ProtectedStaffRoute = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token || (role !== "staff" && role !== "agent" && role !== "agency")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-grow p-4 w-full transition-all duration-300 md:ml-64 pt-16 md:pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedStaffRoute;
