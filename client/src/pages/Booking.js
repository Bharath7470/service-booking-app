import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  const handleBooking = async (serviceId) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    await axios.post("http://localhost:5000/api/bookings/add", {
      userId,
      serviceId
    });

    alert("Booked successfully");
    fetchBookings();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    alert("Booking cancelled");
    fetchBookings();
  };

  return (
    <div>
      <h2>Book a Service</h2>

      {services.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "white",
            margin: "10px auto",
            width: "250px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p><b>₹{s.price}</b></p>
          <button onClick={() => handleBooking(s._id)}>Book</button>
        </div>
      ))}

      <h2>My Bookings</h2>

      <h3>Total Bookings: {bookings.length}</h3>

      {bookings
        .filter((b) => b.userId?._id === userId)
        .map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "white",
              margin: "10px auto",
              width: "250px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <p><b>User:</b> {b.userId?.name}</p>
            <p><b>Service:</b> {b.serviceId?.title}</p>

            <button onClick={() => handleDelete(b._id)}>
              Cancel
            </button>
          </div>
        ))}
    </div>
  );
}

export default Booking;