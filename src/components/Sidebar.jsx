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
    <>
      {/* Hamburger Menu Button */}
      <button 
      onClick={toggleSidebar}
      className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-80 md:w-64 p-5 flex flex-col justify-between h-full 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:translate-x-0 md:block`}
      >
        <h2 className="text-xl font-bold mb-6 text-center">EaziDrive</h2>
        
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link 
                to={item.link} 
                className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when a link is clicked
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 w-full text-left p-2 bg-red-600 hover:bg-red-700 rounded mt-4"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
