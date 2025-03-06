import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Car, Users, Briefcase, Calendar, DollarSign, Settings, LogOut } from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <Car />, link: "/dashboard" },
    { name: "Fleet", icon: <Car />, link: "/fleet/fleet", sub: [
        { name: "Vehicles", link: "/fleet/vehicles" },
        { name: "Maintenance Records", link: "/fleet/maintenance" },
        { name: "Unavailability", link: "/fleet/unavailability" }
      ]
    },
    { name: "Customers", icon: <Users />, link: "/customers/customers", sub: [
        { name: "Customer List", link: "/customers/list" },
        { name: "Bookings", link: "/customers/bookings" }
      ]
    },
    { name: "Suppliers", icon: <Briefcase />, link: "/suppliers/suppliers", sub: [
        { name: "Supplier List", link: "/suppliers/list" }
      ]
    },
    { name: "Bookings", icon: <Calendar />, link: "/bookings/bookings", sub: [
        { name: "Active Bookings", link: "/bookings/active" },
        { name: "Booking History", link: "/bookings/history" }
      ]
    },
    { name: "Finances", icon: <DollarSign />, link: "/finances/finances", sub: [
        { name: "Payments", link: "/finances/payments" },
        { name: "Booking Invoices", link: "/finances/invoices" }
      ]
    },
    { name: "Settings", icon: <Settings />, link: "/settings" }
  ];

  return (
    <div className="fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-5 flex flex-col justify-between h-full">
      <h2 className="text-xl font-bold mb-6">EaziDrive</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link to={item.link} className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-700 rounded">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="flex items-center space-x-2 w-full text-left p-2 bg-red-600 hover:bg-red-700 rounded">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
