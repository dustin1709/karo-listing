import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from './pages/Home';
import Mua from './pages/Mua';
import PropertyDetails from './pages/PropertyDetails';
import Thue from './pages/Thue';
import Request from './pages/Request';

const App = () => {

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/mua' element={<Mua />} />
        <Route path='/thue' element={<Thue />} />
        <Route path='/request' element={<Request />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
