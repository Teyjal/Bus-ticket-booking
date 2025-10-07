import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function Checkout(){
  const { selectedBus, selectedSeats, passenger, setPassenger, payment, setPayment, setBooking } = useBooking();
  const navigate = useNavigate();
  if(!selectedBus) return <div className="container"><div className="hero"><h2>No bus selected</h2></div></div>;

  const onChangePassenger = (field,val)=> setPassenger({...passenger,[field]:val});
  const onChangePayment = (field,val)=> setPayment({...payment,[field]:val});

  const submit = (e)=>{
    e.preventDefault();
    if(selectedSeats.length===0){ alert('Select at least one seat'); return; }
    if(!passenger.name || !passenger.email || !passenger.phone){ alert('Enter passenger name, email and phone'); return; }
    if(payment.method==='card'){
      if(!payment.cardNumber || !payment.expiry || !payment.cvv){ alert('Enter complete card details'); return; }
      if(!/^[0-9]{16}$/.test(payment.cardNumber)){ alert('Card number must be 16 digits'); return; }
      if(!/^[0-9]{3,4}$/.test(payment.cvv)){ alert('CVV must be 3 or 4 digits'); return; }
    }
    const booking = {
      id: 'BK'+Math.floor(Math.random()*900000+100000),
      bus: selectedBus,
      seats: selectedSeats,
      passenger, payment, date: new Date().toString()
    };
    setBooking(booking);
    navigate('/confirmation');
  }

  return (
    <div className="container">
      <h2 style={{color:'#fff'}}>Passenger & Payment</h2>
      <div className="form card">
        <h3>Passenger Details</h3>
        <div className="row">
          <div className="input-field"><label>Name</label><input value={passenger.name} onChange={e=>onChangePassenger('name',e.target.value)} /></div>
          <div className="input-field"><label>Email</label><input type="email" value={passenger.email} onChange={e=>onChangePassenger('email',e.target.value)} /></div>
        </div>
        <div className="row">
          <div className="input-field"><label>Phone</label><input type="tel" value={passenger.phone} onChange={e=>onChangePassenger('phone',e.target.value)} /></div>
          <div className="input-field"><label>Seats</label><input value={selectedSeats.join(', ')} readOnly /></div>
        </div>
        <hr style={{margin:'12px 0',borderColor:'rgba(255,255,255,0.04)'}} />
        <h3>Payment</h3>
        <div className="row">
          <div className="input-field"><label>Method</label><select value={payment.method} onChange={e=>onChangePayment('method',e.target.value)}><option value="card">Card</option><option value="upi">UPI</option></select></div>
        </div>
        {payment.method==='card' && (
          <>
            <div className="row">
              <div className="input-field"><label>Card Number</label><input value={payment.cardNumber} onChange={e=>onChangePayment('cardNumber',e.target.value)} placeholder="16 digits" /></div>
              <div className="input-field"><label>Expiry (MM/YY)</label><input value={payment.expiry} onChange={e=>onChangePayment('expiry',e.target.value)} placeholder="MM/YY" /></div>
              <div className="input-field"><label>CVV</label><input value={payment.cvv} onChange={e=>onChangePayment('cvv',e.target.value)} placeholder="3 or 4 digits" /></div>
            </div>
          </>
        )}
        <div style={{marginTop:14}}>
          <button className="btn-primary" onClick={submit}>Pay & Confirm</button>
        </div>
      </div>
    </div>
  );
}