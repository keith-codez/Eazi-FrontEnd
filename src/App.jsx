import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./components/Login";
import CustomerRegister from "./components/CustomerRegister";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import ProtectedCustomerRoute from "./components/Routes/ProtectedCustomerRoute";
import ProtectedStaffRoute from "./components/Routes/ProtectedStaffRoute";
import PublicRoute from "./components/Routes/PublicRoute";

import CustomerLandingPage from "./pages/Public/CustomerLandingPage.jsx";
import BookingRequestPage from "./pages/Customer/BookingRequestPage.jsx";
import CustomerDashboard from "./pages/Customer/CustomerDashboard.jsx";

import Dashboard from "./pages/Agent/Dashboard/Dashboard.jsx";
import VehicleList from "./pages/Agent/fleet/VehicleList.jsx";
import AddVehicle from "./pages/Agent/fleet/AddVehicle.jsx";
import EditVehicle from "./pages/Agent/fleet/EditVehicle.jsx";
import MaintenanceRecords from "./pages/Agent/fleet/MaintenanceRecords.jsx";
import Unavailability from "./pages/Agent/fleet/Unavailability.jsx";

import CustomerList from "./pages/Agent/customers/CustomerList.jsx";
import AddCustomer from "./pages/Agent/customers/AddCustomer.jsx";
import EditCustomer from "./pages/Agent/customers/EditCustomer.jsx";
import CustomerDetails from "./pages/Agent/customers/CustomerDetails.jsx";
import CustomerAnalytics from "./pages/Agent/customers/CustomerAnalytics.jsx";

import SupplierList from "./pages/Agent/suppliers/SupplierList.jsx";

import BookingList from "./pages/Agent/bookings/Bookings";
import AddBooking from "./pages/Agent/bookings/AddBooking";
import BookingRequests from "./pages/Agent/bookings/BookingRequests";
import BookingHistory from "./pages/Agent/bookings/BookingHistory";
import BookingRequestDetail from './pages/Agent/bookings/BookingRequestDetail';
import CustomerVehicleBrowserPage from "./pages/Customer/CustomerVehicleBrowserPage.jsx"
import CustomerBookingRequestsPage from "./pages/Customer/CustomerBookingRequests.jsx";

import Payments from "./pages/Agent/finances/Payments.jsx";
import Invoices from "./pages/Agent/finances/Invoices.jsx";

import Settings from "./pages/Agent/settings/Settings.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import BookVehiclePage from "./pages/Customer/BookVehiclePage.jsx";



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
              <Route path="/public-customers/book-vehicle" element={<CustomerVehicleBrowserPage />} />
              <Route path="/public-customers/book-vehicle/:vehicleId" element={<BookVehiclePage />} />
              <Route path="/customer/booking-requests" element={<CustomerBookingRequestsPage />} />
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
               <Route path="/booking-requests/:id" element={<BookingRequestDetail />} />
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
