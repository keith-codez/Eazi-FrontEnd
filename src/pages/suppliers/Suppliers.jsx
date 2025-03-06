import React from "react";
import SuppliersSubmenu from "../../components/submenu/SuppliersSubmenu";

const Suppliers = () => {
  return (
    <div className="w-full min-h-screen px-4 md:px-8">
      <SuppliersSubmenu />
      <h1 className="text-2xl font-bold mb-4">Suppliers Overview</h1>
      <p>Welcome to the Suppliers management section.</p>
    </div>
  );
};

export default Suppliers;