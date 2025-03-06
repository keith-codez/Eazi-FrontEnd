import React from "react";
import FleetSubmenu from "../../components/submenu/FleetSubmenu";

const Fleet = () => {
  return (
    <div className="w-full min-h-screen px-4 md:px-8">
      <FleetSubmenu />
      <h1 className="text-2xl font-bold mb-4">Fleet Overview</h1>
      <p>Welcome to the fleet management section.</p>
    </div>
  );
};

export default Fleet;