import { useEffect, useState } from "react";
import axios from "axios";
import FleetSubmenu from "../../components/submenu/FleetSubmenu";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/staff/vehicles/");
        console.log(response.data); // Check the response in console
        setVehicles(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="w-full min-h-screen px-4 md:px-8">
      <FleetSubmenu />
      <h2>Vehicle List</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.brand} {vehicle.model} - {vehicle.color}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VehicleList;
