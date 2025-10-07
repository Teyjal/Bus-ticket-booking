import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import busesData from '../data/buses.json';
import { useBooking } from '../context/BookingContext';

export default function SearchResults(){
  const { search,setSelectedBus } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const from = params.get('from') || search.from;
    const to = params.get('to') || search.to;
    const filtered = busesData.filter(b => b.from.toLowerCase()===from.toLowerCase() && b.to.toLowerCase()===to.toLowerCase());
    setResults(filtered);
  },[location.search]);

  if(results.length===0) return <div className="container"><div className="hero"><h2>No buses found</h2><p className="small-muted">Try different cities or check spelling (City A, City B, City C...)</p></div></div>;

  return (
    <div className="container">
      <h2 style={{color:'#fff',marginTop:10}}>Available buses</h2>
      <div className="list-grid">
        {results.map(bus=>(
          <div className="card" key={bus.id}>
            <h3>{bus.name}</h3>
            <div className="details">
              <p><strong>Route:</strong> {bus.from} → {bus.to}</p>
              <p><strong>Departure:</strong> {bus.time}</p>
              <p><strong>Seats available:</strong> {bus.seats}</p>
              <p><strong>Fare:</strong> ₹{bus.price}</p>
            </div>
            <div className="meta">
              <div className="pill">{bus.time}</div>
              <div>
                <button onClick={()=>{ setSelectedBus(bus); navigate('/select/'+bus.id); }} className="btn-primary">Book - ₹{bus.price}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}