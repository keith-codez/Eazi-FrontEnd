import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedCustomerRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token || (role !== "customer" && role !== "Customer")) {
      return <Navigate to="/login" />;
    }

  return <Outlet />;
};

export default ProtectedCustomerRoute;
