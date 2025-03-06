import React from "react";
import SuppliersSubmenu from "../../components/submenu/SuppliersSubmenu";

const Suppliers = () => {
  return (
    <div>
      <SuppliersSubmenu />
      <h1 className="text-2xl font-bold mb-4">Suppliers Overview</h1>
      <p>Welcome to the Suppliers management section.</p>
    </div>
  );
};

export default Suppliers;