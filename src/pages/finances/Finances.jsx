import React from "react";
import FinancesSubmenu from "../../components/submenu/FinancesSubmenu";

const Finances = () => {
  return (
    <div>
      <FinancesSubmenu />
      <h1 className="text-2xl font-bold mb-4">Finances Overview</h1>
      <p>Welcome to the Finances management section.</p>
    </div>
  );
};

export default Finances;