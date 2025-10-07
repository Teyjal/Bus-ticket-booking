import React, { createContext, useContext, useState } from 'react';
const BookingContext = createContext();
export const BookingProvider = ({children})=>{
  const [search, setSearch] = useState({from:'',to:'',date:''});
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passenger, setPassenger] = useState({name:'',email:'',phone:''});
  const [payment, setPayment] = useState({method:'card',cardNumber:'',expiry:'',cvv:''});
  const [booking, setBooking] = useState(null);

  const reset = ()=>{ setSelectedBus(null); setSelectedSeats([]); setPassenger({name:'',email:'',phone:''}); setPayment({method:'card',cardNumber:'',expiry:'',cvv:''}); setBooking(null); }

  return (
    <BookingContext.Provider value={{
      search,setSearch, selectedBus,setSelectedBus, selectedSeats,setSelectedSeats,
      passenger,setPassenger, payment,setPayment, booking,setBooking, reset
    }}>
      {children}
    </BookingContext.Provider>
  )
}
export const useBooking = ()=> useContext(BookingContext);