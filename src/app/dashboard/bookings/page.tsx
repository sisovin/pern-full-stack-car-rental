import React, { useEffect, useState } from 'react';
import { getBookings } from '../../../services/booking.service';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.vehicle.make} {booking.vehicle.model} - {booking.startDate} to {booking.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;
