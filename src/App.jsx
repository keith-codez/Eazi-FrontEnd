import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./components/Login";
import CustomerRegister from "./components/CustomerRegister";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import ProtectedCustomerRoute from "./components/Routes/ProtectedCustomerRoute";
import ProtectedStaffRoute from "./components/Routes/ProtectedStaffRoute";
import PublicRoute from "./components/Routes/PublicRoute";

import CustomerLandingPage from "./pages/CustomerLandingPage";
import BookingRequestPage from "./pages/BookingRequestPage";
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
import CustomerAnalytics from "./pages/customers/CustomerAnalytics";

import SupplierList from "./pages/suppliers/SupplierList";

import BookingList from "./pages/bookings/Bookings";
import AddBooking from "./pages/bookings/AddBooking";
import BookingRequests from "./pages/bookings/BookingRequests";
import BookingHistory from "./pages/bookings/BookingHistory";

import Payments from "./pages/finances/Payments";
import Invoices from "./pages/finances/Invoices";

import Settings from "./pages/Settings";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";



import axiosInstance from "./api/axiosInstance.js";



function App() {

  const { token, role, logout } = useContext(AuthContext);

  useEffect(() => {
  axiosInstance.get("csrf/")
    .then(() => console.log("✅ CSRF cookie set"))
    .catch((err) => console.error("Failed to get CSRF token", err));
}, []);

  return (
    <Router>
      <div className="flex w-full min-h-screen overflow-x-hidden">
        <div className="flex-grow w-full transition-all duration-300">
          <Routes>
            {/* Public Routes */}
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<CustomerLandingPage />} />
              <Route path="/book-now/:vehicleId" element={<BookingRequestPage />} />
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register-customer" element={<CustomerRegister />} />
              <Route path="/request/password_reset" element={<PasswordResetRequest />} />
              <Route path="/password-reset/:token" element={<PasswordReset />} />

              {/* any other public pages */}
            </Route>
        
            {/* Protected Customer Routes */}
            <Route element={<ProtectedCustomerRoute />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
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
              <Route path="/customers/analytics" element={<CustomerAnalytics />} />
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


            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
