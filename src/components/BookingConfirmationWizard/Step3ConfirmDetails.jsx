import React, { useState } from 'react';
import axios from 'axios';

const Step3ConfirmDetails = ({ formData, bookingRequest, onChange }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const payload = {
      national_id: formData.national_id,
      street_address: formData.street_address,
      address_line2: formData.address_line2,
      city: formData.city,
      country: formData.country,
      next_of_kin1_first_name: formData.next_of_kin1_first_name,
      next_of_kin1_last_name: formData.next_of_kin1_last_name,
      next_of_kin1_id_number: formData.next_of_kin1_id_number,
      next_of_kin1_phone: formData.next_of_kin1_phone,
      pay_now: formData.pay_now,
    };

    try {
      await axios.post(`/api/booking-request/${bookingRequest.id}/finalize/`, payload, {
        withCredentials: true,
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to confirm booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Confirm Details</h2>

      <input type="text" name="national_id" onChange={handleChange} placeholder="National ID" className="input" />
      <input type="text" name="street_address" onChange={handleChange} placeholder="Street Address" className="input" />
      <input type="text" name="address_line2" onChange={handleChange} placeholder="Address Line 2" className="input" />
      <input type="text" name="city" onChange={handleChange} placeholder="City" className="input" />
      <input type="text" name="country" onChange={handleChange} placeholder="Country" className="input" />

      <h3 className="font-semibold mt-4">Next of Kin</h3>
      <input type="text" name="next_of_kin1_first_name" onChange={handleChange} placeholder="First Name" className="input" />
      <input type="text" name="next_of_kin1_last_name" onChange={handleChange} placeholder="Last Name" className="input" />
      <input type="text" name="next_of_kin1_id_number" onChange={handleChange} placeholder="ID Number" className="input" />
      <input type="text" name="next_of_kin1_phone" onChange={handleChange} placeholder="Phone Number" className="input" />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">Booking Confirmed!</p>}

      <div className="mt-6 flex justify-between flex-col sm:flex-row gap-4">
        <button
            onClick={onBack}
            className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all"
        >
            ← Back
        </button>
        <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`inline-flex items-center justify-center px-5 py-2 rounded-xl ${
            submitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            } text-white transition-all`}
        >
            {submitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default Step3ConfirmDetails;
