import { useEffect, useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom"; // Import Link for navigation

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/staff/vehicles/");
        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading vehicles...</p>;

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 mt-16 md:mt-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Vehicle List</h2>
        
        {/* "Add Vehicle" button links to the Add Vehicle page */}
        <Link to="/add-vehicle" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <p className="text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

const VehicleCard = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vehicle.images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? vehicle.images.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div {...handlers} className="relative w-full h-40 bg-gray-200 flex items-center justify-center">
        {vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[currentImageIndex].image}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
        )}
        {vehicle.images.length > 1 && (
          <>
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full" onClick={handleNext}>
              &#10095;
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
        <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
        <p className="text-sm text-gray-600">Mileage: {vehicle.mileage} km</p>
        <p className="text-sm text-gray-600">Price: ${vehicle.price_per_day}/day</p>
      </div>
    </div>
  );
};

export default VehicleList;
