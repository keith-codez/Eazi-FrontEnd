import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function BookingRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/booking-requests/${id}/`)
      .then(res => {
        setBooking(res.data);
        setStatus(res.data.status);
        setNotes(res.data.staff_notes || '');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching booking request:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.patch(`/booking-requests/${id}/`, {
      status,
      staff_notes: notes,
    })
      .then(res => {
        navigate('/booking-requests'); // back to list
      })
      .catch(err => {
        console.error('Error updating request:', err);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (!booking) return <div>Booking request not found.</div>;

  return (
    <div className="container">
      <h2>Review Booking Request</h2>

      <div className="booking-details">
        <p><strong>Name:</strong> {booking.first_name} {booking.last_name}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Vehicle:</strong> {booking.vehicle?.title}</p>
        <p><strong>Start Date:</strong> {booking.start_date}</p>
        <p><strong>End Date:</strong> {booking.end_date}</p>
        <p><strong>Message:</strong> {booking.message || '—'}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="accepted">Accept</option>
            <option value="declined">Decline</option>
          </select>
        </div>

        <div>
          <label>Staff Notes:</label><br />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Add any staff notes here"
          />
        </div>

        <button type="submit">Save Review</button>
      </form>
    </div>
  );
}

export default BookingRequestDetail;
