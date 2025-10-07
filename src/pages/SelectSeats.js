import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import busesData from '../data/buses.json';
import { useBooking } from '../context/BookingContext';

export default function SelectSeats(){
  const { id } = useParams();
  const bus = busesData.find(b=>String(b.id)===id);
  const { selectedSeats, setSelectedSeats, setSelectedBus } = useBooking();
  const [seatStates,setSeatStates] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(bus) setSelectedBus(bus);
    const arr = Array.from({length: bus.seats}, (_,i)=>({num:i+1, booked: Math.random() < 0.12}));
    setSeatStates(arr);
    setSelectedSeats([]);
  },[id]);

  const toggle = (s)=>{
    if(s.booked) return;
    const exists = selectedSeats.find(x=>x===s.num);
    if(exists){
      setSelectedSeats(selectedSeats.filter(x=>x!==s.num));
    } else {
      if(selectedSeats.length>=6){ alert('Max 6 seats allowed'); return; }
      setSelectedSeats([...selectedSeats,s.num]);
    }
  }

  return (
    <div className="container">
      <h2 style={{color:'#fff'}}>Select seats for {bus.name}</h2>
      <div className="card">
        <div className="details"><p><strong>Route:</strong> {bus.from} → {bus.to}</p><p><strong>Departure:</strong> {bus.time}</p></div>
        <div className="seat-map">
          {seatStates.map(s=>(
            <div key={s.num} className={`seat ${s.booked? 'booked' : (selectedSeats.includes(s.num)? 'selected':'')}`} onClick={()=>toggle(s)}>{s.num}</div>
          ))}
        </div>
        <p style={{marginTop:12}}>Selected seats: {selectedSeats.join(', ') || 'none'}</p>
        <div style={{marginTop:10}}>
          <button className="btn-primary" onClick={()=>navigate('/checkout')}>Proceed to Passenger & Payment</button>
        </div>
      </div>
    </div>
  );
}