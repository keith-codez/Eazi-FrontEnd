import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // ✅ send cookies
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setRole(data.role);
      } else {
        setUser(null);
        setRole(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  const login = (_token, userRole) => {
    setRole(userRole);
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
