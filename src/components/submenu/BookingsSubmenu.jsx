import React from "react";
import { NavLink } from "react-router-dom";

const BookingsSubmenu = () => {
  const sublinks = [
    { name: "Overview", link: "/bookings/bookings" },
    { name: "Active Bookings", link: "/bookings/active" },
    { name: "Booking History", link: "/bookings/history" },
  ];

  return (
    <div className="flex space-x-4 pb-2 mb-4 overflow-x-auto whitespace-nowrap  border-gray-300">
      {sublinks.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          className={({ isActive }) =>
            `px-4 py-2 text-lg ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default BookingsSubmenu;