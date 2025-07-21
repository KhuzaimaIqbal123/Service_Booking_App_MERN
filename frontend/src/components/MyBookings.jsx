import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await API.get(`/api/booking`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data.bookings);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [user, token, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((booking) => (
            <li key={booking._id} style={styles.card}>
              <h3>{booking.serviceName}</h3>
              <p>Price: {booking.price} PKR</p>
              <p>Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "10px"
  }
};

export default MyBookings;
