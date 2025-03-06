import React from "react";
import { NavLink } from "react-router-dom";

const FleetSubmenu = () => {
  const sublinks = [
    { name: "Overview", link: "/fleet/fleet" },
    { name: "Vehicles", link: "/fleet/vehicles" },
    { name: "Maintenance", link: "/fleet/maintenance" },
    { name: "Unavailability", link: "/fleet/unavailability" },
  ];

  return (
    <div className="mt-10 px-2">
      <div className="flex flex-wrap justify-between items-center border-b border-gray-300 pb-1 w-full max-w-screen-md mx-auto">
        {sublinks.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `px-3 py-1 text-xs md:text-sm font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FleetSubmenu;
