import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from './pages/Home';
import Mua from './pages/Mua';
import PropertyDetails from './pages/PropertyDetails';

const App = () => {

  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let data = new FormData();
      data.append('limit', '100');
      data.append('offset', '0');
      let config = {
        method: 'post',
        url: 'https://lab.karo.land/api/post/listall',
        data: data
      };
      axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        const houselist = response.data.collection;
        let hlist = []
        houselist.map((house) => {
          if(house.type !== 4) {hlist.push(house)}
        })
        setHouses(hlist);
      }).catch(function (error) {
        console.log(error);
      })
    };
    loadData();
  }, []);

  useEffect(() => {
    // if (typeof search === 'string') {console.log(search.toLowerCase() + " true")}
    const filteredResults = houses.filter((house) =>
      (house.city_name || "").toLowerCase().includes(search.toLowerCase())
      || (house.district_name || "").toLowerCase().includes(search.toLowerCase())
      || (house.title || "").toLowerCase().includes(search.toLowerCase())
      || (house.property.full_address || "").toLowerCase().includes(search.toLowerCase())
      || (house.broker.fullname || "").toLowerCase().includes(search.toLowerCase())
      || (house.description || "").toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [houses, search]);


  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/mua' element={<Mua 
        houses={searchResults} 
        search={search} 
        setSearch={setSearch} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
