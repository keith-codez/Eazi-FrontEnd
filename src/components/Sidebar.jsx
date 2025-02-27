import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-md md:hidden hover:bg-blue-800 transition"
        onClick={() => setIsOpen(true)}
      >
        ☰ Menu
      </button>

      {/* Sidebar - Full Height with Close Button */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 transition-transform transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        
        {/* Close "X" Button */}
        <button 
          className="absolute top-4 right-4 text-white text-xl md:hidden"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mt-10">Admin Panel</h2>
        <nav className="mt-4">
          <ul>
            <li className="mb-2">
              <Link to="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/users" className="block p-2 hover:bg-gray-700">Users</Link>
            </li>
            <li className="mb-2">
              <Link to="/settings" className="block p-2 hover:bg-gray-700">Settings</Link>
            </li>
            <li className="mb-2">
              <button 
                onClick={onLogout} 
                className="block w-full text-left p-2 bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Click Outside to Close (Optional) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
