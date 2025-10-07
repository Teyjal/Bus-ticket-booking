import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <header className="header">
      <div className="brand"><div className="logo">BB</div><div><div style={{fontWeight:700,color:'#fff'}}>BusBooking Pro</div><div style={{fontSize:12,color:'rgba(255,255,255,0.7)'}}>Fast. Reliable. Comfortable.</div></div></div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Find Buses</Link>
        <Link to="/confirmation">My Bookings</Link>
      </nav>
    </header>
  );
}