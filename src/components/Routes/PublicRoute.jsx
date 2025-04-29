import React, { useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import PublicSidebar from "../PublicSidebar";



const PublicRoute = () => {
  const { role } = useContext(AuthContext); // ✅ Correct here
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);


  const [isOpen, setIsOpen] = useState(false);
  
    const handleLogout = () => {
      // Clear the user data (tokens, etc)
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      // Navigate to login page
      navigate("/login");
    };

  if (role === "staff" || role === "agent" || role === "agency") {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden">
      <PublicSidebar 
        onLogout={handleLogout} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`flex-grow p-4 w-full transition-all duration-300 pt-16 md:pt-4 ${
            isCollapsed ? "md:ml-16" : "md:ml-65"
        }`}
        >
        <Outlet />
        </div>
    </div>
    );
};

export default PublicRoute;
