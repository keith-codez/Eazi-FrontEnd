import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from  "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

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
      <div className="flex">
        {token && <Sidebar onLogout={handleLogout} />}
        <div className={`flex-grow p-4 ${token ? "md:ml-64" : ""}`}>
          <Routes>
            {!token ? (
              <>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
