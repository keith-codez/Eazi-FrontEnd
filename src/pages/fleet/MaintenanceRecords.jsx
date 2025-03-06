import React from "react";
import FleetSubmenu from "../../components/submenu/FleetSubmenu";

function MaintenanceRecords() {
    return (
        <div className="w-full min-h-screen px-4 md:px-8">
            <FleetSubmenu />
            <h1 className="text-2xl font-bold">Maintenance Records</h1>
            <p>Welcome to the vehicle maintenance records page</p>
        </div>
    );
}

export default MaintenanceRecords;