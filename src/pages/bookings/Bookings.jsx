import React from "react";
import BookingsSubmenu from "../../components/submenu/BookingsSubmenu";

const Bookings = () => {
  return (
    <div className="w-full min-h-screen px-4 md:px-8">
      <BookingsSubmenu />
      <h1 className="text-2xl font-bold mb-4">Bookings Overview</h1>
      <p>Welcome to the Bookings management section.</p>
    </div>
  );
};

export default Bookings;