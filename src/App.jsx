import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomerLogin from "./components/CustomerLogin";
import StaffLogin from "./components/StaffLogin";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import VehicleList from "./pages/fleet/VehicleList"; // Move to pages folder
import MaintenanceRecords from "./pages/fleet/MaintenanceRecords";
import Unavailability from "./pages/fleet/Unavailability";
import CustomerList from "./pages/customers/CustomerList.jsx";
import SupplierList from "./pages/suppliers/SupplierList";
import BookingList from "./pages/bookings/Bookings.jsx";
import BookingHistory from "./pages/bookings/BookingHistory";
import Payments from "./pages/finances/Payments";
import Invoices from "./pages/finances/Invoices";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import AddVehicle from "./pages/fleet/AddVehicle";
import EditVehicle from "./pages/fleet/EditVehicle";
import AddCustomer from "./pages/customers/AddCustomer.jsx";
import EditCustomer from "./pages/customers/EditCustomer.jsx";
import CustomerDetails from "./pages/customers/CustomerDetails.jsx";
import AddBooking from "./pages/bookings/AddBooking.jsx";
import CustomerLandingPage from "./pages/rentals/CustomerLandingPage.jsx";
import BookingRequestPage from "./pages/rentals/BookingRequestPage"; 
import BookingRequests from "./pages/bookings/BookingRequests.jsx"; 


function App() {
  const [staffToken, setStaffToken] = useState(localStorage.getItem("access_token"));
  const [customerToken, setCustomerToken] = useState(localStorage.getItem("customer_access_token"));

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // show on desktop
      } else {
        setSidebarOpen(false); // hide on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
  };

  return (
    <Router>
      <div className="flex w-full min-h-screen overflow-x-hidden">
        {token && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}
        <div className={`flex-grow p-4 w-full transition-all duration-300 ${token ? "md:ml-64" : ""} ${token ? "pt-16 md:pt-4" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<CustomerLandingPage />} />
            <Route path="/book-now/:vehicleId" element={<BookingRequestPage />} />
            {!token ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/request/password_reset" element={<PasswordResetRequest />} />
                <Route path="/password-reset/:token" element={<PasswordReset />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                {/* Private Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
