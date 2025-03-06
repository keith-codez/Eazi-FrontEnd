import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import VehicleList from "./pages/fleet/VehicleList"; // Move to pages folder
import MaintenanceRecords from "./pages/fleet/MaintenanceRecords";
import Unavailability from "./pages/fleet/Unavailability";
import CustomerList from "./pages/customers/CustomerList.jsx";
import CustomerBookings from "./pages/customers/CustomerBookings.jsx";
import SupplierList from "./pages/suppliers/SupplierList";
import ActiveBookings from "./pages/bookings/ActiveBookings";
import BookingHistory from "./pages/bookings/BookingHistory";
import Payments from "./pages/finances/Payments";
import Invoices from "./pages/finances/Invoices";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Fleet from "./pages/fleet/Fleet";
import Customers from "./pages/customers/Customers";
import Bookings from "./pages/bookings/Bookings";
import Finances from "./pages/finances/Finances";
import Suppliers from "./pages/suppliers/Suppliers";


function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("access_token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
        {token && <Sidebar onLogout={handleLogout} />}
        <div className={`flex-grow p-4 ${token ? "md:ml-64" : ""}`}>
          <Routes>
            {/* Public Routes */}
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
                <Route path="/fleet/fleet" element={<Fleet />} />
                <Route path="/fleet/vehicles" element={<VehicleList />} />
                <Route path="/fleet/maintenance" element={<MaintenanceRecords />} />
                <Route path="/fleet/unavailability" element={<Unavailability />} />
                <Route path="/customers/customers" element={<Customers />} />
                <Route path="/customers/list" element={<CustomerList />} />
                <Route path="/customers/bookings" element={<CustomerBookings />} />
                <Route path="/suppliers/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/list" element={<SupplierList />} />
                <Route path="/bookings/bookings" element={<Bookings />} />
                <Route path="/bookings/active" element={<ActiveBookings />} />
                <Route path="/bookings/history" element={<BookingHistory />} />
                <Route path="/finances/finances" element={<Finances />} />
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
