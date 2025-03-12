import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // Track deleted images
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/staff/vehicles/${id}/`);
        setVehicle(response.data);
        setExistingImages(response.data.images || []);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteImage = (imageId) => {
    setExistingImages(existingImages.filter((img) => img.id !== imageId)); // Remove from UI
    setDeletedImages((prevDeleted) => [...prevDeleted, imageId]); // Track the deleted image ID
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Append updated vehicle data
  Object.entries(vehicle).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Ensure next_service_date is included
  if (vehicle.next_service_date) {
    formData.append("next_service_date", vehicle.next_service_date);
  }

  // Add new images
  newImages.forEach((file) => {
    formData.append("images", file);
  });

  // Add deleted images to remove them from backend
  formData.append("deleted_images", JSON.stringify(deletedImages));

  try {
    await axios.patch(`http://127.0.0.1:8000/api/staff/vehicles/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/vehicles");
  } catch (err) {
    console.error("Error updating vehicle:", err);
  }
};

  if (loading) return <p className="text-center text-gray-500">Loading vehicle details...</p>;

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false); // Close modal
    await handleSubmit(new Event("submit")); // Manually trigger form submission
  };

  return (
    <div className={`${isModalOpen ? "overflow-hidden h-screen" : ""}`}>
    <div className="w-full max-w-4xl mx-auto p-6 mt-16 md:mt-0 ">
      <h2 className="text-2xl font-semibold mb-4">Edit Vehicle</h2>
      {/* Confirmation Modal */}
      {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
          <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
          <p className="text-gray-700">Are you sure you want to update this vehicle?</p>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Make</label>
          <input type="text" name="make" value={vehicle.make} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Model</label>
          <input type="text" name="model" value={vehicle.model} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Color</label>
          <input type="text" name="color" value={vehicle.color} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Mileage (km)</label>
          <input type="number" name="mileage" value={vehicle.mileage} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Ownership</label>
          <select name="ownership" value={vehicle.ownership} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500">
            <option value="Company">Company</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Price per day ($)</label>
          <input type="number" name="price_per_day" value={vehicle.price_per_day} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Next Service Date</label>
          <input type="date" name="next_service_date" value={vehicle.next_service_date || ""} onChange={handleInputChange} className="w-full border p-2 rounded focus:border-blue-500" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Upload New Images</label>
          <input type="file" multiple onChange={handleFileChange} className="w-full border p-2 rounded focus:border-blue-500" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {newImages.map((file, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(file)} alt="New" className="w-full h-24 object-cover rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-2">Existing Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((image) => (
              <div key={image.id} className="relative">
                <img src={image.image} alt="Vehicle" className="w-full h-24 object-cover rounded" />
                <button type="button" onClick={() => handleDeleteImage(image.id)} className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
        <button type="button" onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update Vehicle</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditVehicle;
