import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const BookVehicleForm = ({ vehicleId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicle_id: vehicleId,
    start_date: "",
    end_date: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post(
        `booking-requests/`, formData, { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true 
        });
      alert("Booking request submitted successfully!");
      navigate("/customer/dashboard");
    } catch (err) {
      setError("Failed to submit booking request.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          label="Start Date"
          type="date"
          name="start_date"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
        <input
          label="End Date"
          type="date"
          name="end_date"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          value={formData.end_date}
          onChange={handleChange}
          required
        />
      </div>

      <textarea
        name="message"
        placeholder="Message (Optional)"
        className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        value={formData.message}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Booking Request"}
      </button>
    </form>
  );
};

export default BookVehicleForm;
