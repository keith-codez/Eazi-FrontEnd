import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedStaffRoute = () => {
  const { token, role, logout, loading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) return null

  if (!token || (role !== "staff" && role !== "agent" && role !== "agency")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden">
      <Sidebar 
        onLogout={logout} // Use context logout directly
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-grow p-4 w-full transition-all duration-300 md:ml-64 pt-16 md:pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedStaffRoute;
