import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function Home(){
  const navigate = useNavigate();
  const { search,setSearch } = useBooking();
  const [from, setFrom] = useState(search.from || '');
  const [to, setTo] = useState(search.to || '');
  const [date, setDate] = useState(search.date || '');

  const submit = (e)=>{
    e.preventDefault();
    if(!from || !to){ alert('Please enter both from and to cities'); return; }
    setSearch({from,to,date});
    const q = new URLSearchParams({from,to,date}).toString();
    navigate('/search?'+q);
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>Find & Book Buses</h1>
        <p className="small-muted">Search buses between cities, choose seats, enter passenger & payment details, and confirm your booking.</p>

        <form className="search-row" onSubmit={submit} style={{marginTop:18}}>
          <input className="input" placeholder="From city (e.g. City A)" value={from} onChange={e=>setFrom(e.target.value)} />
          <input className="input" placeholder="To city (e.g. City B)" value={to} onChange={e=>setTo(e.target.value)} />
          <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <button className="btn-primary" type="submit">Search Buses</button>
        </form>
      </div>
    </div>
  );
}