import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);


  const [isLoggedOut, setIsLoggedOut] = useState(false);



  useEffect(() => {
    // Load token and role from localStorage on app startup
    const storedToken = localStorage.getItem("access_token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (accessToken, userRole) => {
    setToken(accessToken);
    setRole(userRole);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setIsLoggedOut(true); // you may not even need this
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
