import { useState, useEffect } from "react";
import axios from "axios";

const AddBooking = () => {
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false); // Track submission state
    const [formData, setFormData] = useState({
        customer: "",
        vehicle: "",
        start_date: "",
        end_date: "",
        booking_amount: "",
        booking_deposit: "",
        payment_method: "cash",
        booking_status: "upcoming",
        estimated_mileage: "",
        destination: "",
        discount_amount: "0.00",
        discount_description: "",
        pickup_location: "",
        dropoff_location: "",
        pickup_time: "",
        dropoff_time: "",
        notes: ""
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/staff/customers/")
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));

        axios.get("http://127.0.0.1:8000/api/staff/vehicles/")
            .then(response => setVehicles(response.data))
            .catch(error => console.error("Error fetching vehicles:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Disable button while submitting
    
        const bookingData = {
            customer: formData.customer ? parseInt(formData.customer) : null,
            vehicle: formData.vehicle ? parseInt(formData.vehicle) : null,
            start_date: formData.start_date,
            end_date: formData.end_date,
            booking_amount: formData.booking_amount,
            booking_deposit: formData.booking_deposit,
            payment_method: formData.payment_method,
            booking_status: formData.booking_status,
            estimated_mileage: formData.estimated_mileage,
            destination: formData.destination,
            discount_amount: formData.discount_amount,
            discount_description: formData.discount_description,
            pickup_location: formData.pickup_location,
            dropoff_location: formData.dropoff_location,
            pickup_time: formData.pickup_time,
            dropoff_time: formData.dropoff_time,
            notes: formData.notes
        };
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/staff/bookings/",
                bookingData
            );
            console.log("Booking created:", response.data);
            alert("Booking successfully created!");
            setFormData({ ...formData, customer: "", vehicle: "" }); // Reset form if needed
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking. Please check your input.");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <label className="block mb-2">Select Customer:</label>
            <select name="customer" value={formData.customer} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="">-- Choose Customer --</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                    </option>
                ))}
            </select>

            <label className="block mt-4 mb-2">Select Vehicle:</label>
            <select name="vehicle" value={formData.vehicle} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="">-- Choose Vehicle --</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.make} {vehicle.model} ({vehicle.registration_number})
                    </option>
                ))}
            </select>

            <label className="block mt-4 mb-2">Start Date:</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">End Date:</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Booking Amount:</label>
            <input type="number" name="booking_amount" value={formData.booking_amount} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Deposit:</label>
            <input type="number" name="booking_deposit" value={formData.booking_deposit} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Payment Method:</label>
            <select name="payment_method" value={formData.payment_method} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="cash">Cash</option>
                <option value="mobile transfer">Mobile Transfer</option>
                <option value="debit_card">Debit Card</option>
            </select>

            <label className="block mt-4 mb-2">Booking Status:</label>
            <select name="booking_status" value={formData.booking_status} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
            </select>

            <label className="block mt-4 mb-2">Estimated Mileage:</label>
            <input type="number" name="estimated_mileage" value={formData.estimated_mileage} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Destination:</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} className="p-2 border rounded w-full" />

            
            <label className="block mt-4 mb-2">Pickup Location:</label>
            <input type="text" name="pickup_location" value={formData.pickup_location} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Dropoff Location:</label>
            <input type="text" name="dropoff_location" value={formData.dropoff_location} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Pickup Time:</label>
            <input type="time" name="pickup_time" value={formData.pickup_time} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Dropoff Time:</label>
            <input type="time" name="dropoff_time" value={formData.dropoff_time} onChange={handleChange} className="p-2 border rounded w-full" />

            <label className="block mt-4 mb-2">Notes:</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="p-2 border rounded w-full" />

            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Submit Booking
            </button>
        </form>
    );
};

export default AddBooking