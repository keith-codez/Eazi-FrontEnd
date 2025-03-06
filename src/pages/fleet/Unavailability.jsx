import React from "react";
import FleetSubmenu from "../../components/submenu/FleetSubmenu";

function Unavailability() {
    return (
        <div className="w-full min-h-screen px-4 md:px-8">
            <FleetSubmenu />
            <h1 className="text-2xl font-bold">Unavailability </h1>
            <p>Welcome to the vehicle unavailability page</p>
        </div>
    );
}

export default Unavailability;