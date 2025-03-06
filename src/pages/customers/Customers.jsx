import React from "react";
import CustomersSubmenu from "../../components/submenu/CustomersSubmenu";

const Customers = () => {
  return (
    <div>
      <CustomersSubmenu />
      <h1 className="text-2xl font-bold mb-4">Customer Overview</h1>
      <p>Welcome to the Customers management section.</p>
    </div>
  );
};

export default Customers;