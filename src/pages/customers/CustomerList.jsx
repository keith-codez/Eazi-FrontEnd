import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/staff/customers/";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        title: "MR",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        national_id: "",
        drivers_license: null,
        next_of_kin1_first_name: "",
        next_of_kin1_last_name: "",
        next_of_kin1_id_number: "",
        next_of_kin1_phone: "",
        next_of_kin2_first_name: "",
        next_of_kin2_last_name: "",
        next_of_kin2_id_number: "",
        next_of_kin2_phone: "",
        last_booking_date: null,
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(API_URL);
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, drivers_license: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== "" && form[key] !== null) {
                formData.append(key, form[key]);
            }
        });

        try {
            await axios.post(API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchCustomers();
        } catch (error) {
            console.error("Error adding customer", error.response?.data || error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Customers</h2>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">First Name</th>
                        <th className="border border-gray-300 p-2">Last Name</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Last Booking</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="border border-gray-300">
                            <td className="p-2">{customer.first_name}</td>
                            <td className="p-2">{customer.last_name}</td>
                            <td className="p-2">{customer.phone_number}</td>
                            <td className="p-2">{customer.last_booking_date || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} className="border p-2 w-full" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="national_id" placeholder="National ID" onChange={handleChange} className="border p-2 w-full" />
                <input type="file" name="drivers_license" onChange={handleFileChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin1_first_name" placeholder="Next of Kin 1 First Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin1_last_name" placeholder="Next of Kin 1 Last Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin1_id_number" placeholder="Next of Kin 1 ID" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin1_phone" placeholder="Next of Kin 1 Phone" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin2_first_name" placeholder="Next of Kin 2 First Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin2_last_name" placeholder="Next of Kin 2 Last Name" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin2_id_number" placeholder="Next of Kin 2 ID" onChange={handleChange} className="border p-2 w-full" />
                <input type="text" name="next_of_kin2_phone" placeholder="Next of Kin 2 Phone" onChange={handleChange} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Customer</button>
            </form>
        </div>
    );
}