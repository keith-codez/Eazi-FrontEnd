import React, { useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CustomerSidebar from "../CustomerSidebar";

const ProtectedCustomerRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    // Clear the user data (tokens, etc)
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    // Navigate to login page
    navigate("/login");
  };

  if (!token || (role !== "customer" && role !== "Customer")) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="flex w-full min-h-screen overflow-x-hidden">
        <CustomerSidebar 
          onLogout={handleLogout} 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
        />
        <div className="flex-grow p-4 w-full transition-all duration-300 md:ml-64 pt-16 md:pt-4">
          <Outlet />
        </div>
      </div>
      );
};

export default ProtectedCustomerRoute;
