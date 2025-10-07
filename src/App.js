import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SelectSeats from './pages/SelectSeats';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search' element={<SearchResults/>} />
        <Route path='/select/:id' element={<SelectSeats/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/confirmation' element={<Confirmation/>} />
      </Routes>
    </div>
  );
}