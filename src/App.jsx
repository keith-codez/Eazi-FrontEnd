import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import CustomerRegister from "./components/CustomerRegister";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import ProtectedCustomerRoute from "./components/Routes/ProtectedCustomerRoute";
import ProtectedStaffRoute from "./components/Routes/ProtectedStaffRoute";

import CustomerLandingPage from "./pages/demand/CustomerLandingPage";
import BookingRequestPage from "./pages/demand/BookingRequestPage";
import CustomerDashboard from "./pages/demand/CustomerDashboard";

import Dashboard from "./pages/Dashboard";
import VehicleList from "./pages/fleet/VehicleList";
import AddVehicle from "./pages/fleet/AddVehicle";
import EditVehicle from "./pages/fleet/EditVehicle";
import MaintenanceRecords from "./pages/fleet/MaintenanceRecords";
import Unavailability from "./pages/fleet/Unavailability";

import CustomerList from "./pages/customers/CustomerList";
import AddCustomer from "./pages/customers/AddCustomer";
import EditCustomer from "./pages/customers/EditCustomer";
import CustomerDetails from "./pages/customers/CustomerDetails";

import SupplierList from "./pages/suppliers/SupplierList";

import BookingList from "./pages/bookings/Bookings";
import AddBooking from "./pages/bookings/AddBooking";
import BookingRequests from "./pages/bookings/BookingRequests";
import BookingHistory from "./pages/bookings/BookingHistory";

import Payments from "./pages/finances/Payments";
import Invoices from "./pages/finances/Invoices";

import Settings from "./pages/Settings";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogin = (newToken, newRole) => {
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <div className="flex w-full min-h-screen overflow-x-hidden">
        <div className="flex-grow p-4 w-full transition-all duration-300">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<CustomerLandingPage />} />
            <Route path="/book-now/:vehicleId" element={<BookingRequestPage />} />

            {/* Protected Customer Routes */}
            <Route element={<ProtectedCustomerRoute />}>
              <Route path="/dashboard" element={<CustomerDashboard />} />
            </Route>

            {/* Protected Staff Routes */}
            <Route element={<ProtectedStaffRoute />}>
              <Route path="/staff/dashboard" element={<Dashboard />} />
              <Route path="/fleet/vehicles" element={<VehicleList />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
              <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
              <Route path="/fleet/maintenance" element={<MaintenanceRecords />} />
              <Route path="/fleet/unavailability" element={<Unavailability />} />
              <Route path="/customers/list" element={<CustomerList />} />
              <Route path="/details/:id" element={<CustomerDetails />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/edit-customer/:id" element={<EditCustomer />} />
              <Route path="/suppliers/list" element={<SupplierList />} />
              <Route path="/bookings/list" element={<BookingList />} />
              <Route path="/add-booking" element={<AddBooking />} />
              <Route path="/bookings/requests" element={<BookingRequests />} />
              <Route path="/bookings/history" element={<BookingHistory />} />
              <Route path="/finances/payments" element={<Payments />} />
              <Route path="/finances/invoices" element={<Invoices />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Authentication Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register-customer" element={<CustomerRegister />} />
            <Route path="/request/password_reset" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
