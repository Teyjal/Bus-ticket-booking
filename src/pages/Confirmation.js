import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function Confirmation(){
  const { booking, reset } = useBooking();
  if(!booking) return <div className="container"><div className="hero"><h2>No booking found</h2></div></div>;
  return (
    <div className="container">
      <div className="confirm card">
        <div className="success">BOOKING CONFIRMED</div>
        <h2>Booking ID: {booking.id}</h2>
        <p><strong>Bus:</strong> {booking.bus.name}</p>
        <p><strong>Route:</strong> {booking.bus.from} → {booking.bus.to}</p>
        <p><strong>Departure:</strong> {booking.bus.time}</p>
        <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
        <p><strong>Passenger:</strong> {booking.passenger.name} — {booking.passenger.phone}</p>
        <p><strong>Paid using:</strong> {booking.payment.method}</p>
        <p><strong>Booked at:</strong> {booking.date}</p>
        <div style={{marginTop:16}}>
          <button className="btn-primary" onClick={()=>{ reset(); window.location='/' }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}