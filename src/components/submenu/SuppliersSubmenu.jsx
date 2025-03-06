import React from "react";
import { NavLink } from "react-router-dom";

const SuppliersSubmenu = () => {
  const sublinks = [
    { name: "Overview", link: "/suppliers/suppliers" },
    { name: "Supplier List", link: "/suppliers/list" },
  ];

  return (
    <div className="flex space-x-4 pb-2 mb-4 overflow-x-auto whitespace-nowrap border-b border-gray-300">
        {sublinks.map((sub) => (
            <NavLink
            key={sub.name}
            to={sub.link} 
            className={`px-4 py-2 rounded-md ${
                location.pathname === sub.link ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            >
                {sub.name}
                </NavLink>
            ))}
            </div>
            );
        };

export default SuppliersSubmenu;
