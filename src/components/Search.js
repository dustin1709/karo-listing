import React, { useContext, useState, useRef, useEffect } from 'react';
import Cities from "./hooks/Cities";
import './css/Search.css';
// import context
import { HouseContext } from './HouseContext';

// import icon
import { RiSearch2Line } from 'react-icons/ri';

const Search = () => {

  const [city, setCity] = useState(0);
  const [dist, setDist] = useState(0);

  const cities = Cities();
  const selectedCity = useRef(1);
  const [listDistrict, setListDistrict] = useState([]);    
  const changeSelectOptionHandler = (e) => {
      selectedCity.current = e.target.value;
      setCity(e.target.value);
      let districts = cities[selectedCity.current-1].dist;
      setListDistrict(districts);
      console.log("User choose city: " + selectedCity.current + ". The districts are: " + districts);
  };
  useEffect(() => {
      if (selectedCity.current === 1) {
          let districts = cities[0].dist;
          setListDistrict(districts);
      }
  }, []);

  return (
    <form className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      
      <select className="dropdown" aria-label=".form-select-lg">
        <option value="1">Mua</option>
        <option value="2">Thuê</option>
      </select>

      <select onChange={changeSelectOptionHandler}  className="dropdown" aria-label=".form-select-lg">
          {
              cities.map(c => (
                  <option value={c.id}>{c.name}</option>
              ))
          }
      </select>

      <select onChange={(e) => setDist(e.target.value)} className="dropdown" aria-label=".form-select-lg">
          {
              listDistrict.map((district, index) => <option value={index+1}>{district}</option>)
          }
      </select>

      <select className="dropdown" aria-label=".form-select-lg">
        <option value="1">Nhà Phố</option>
        <option value="2">Chung Cư</option>
        <option value="4">Đất nền</option>
      </select>

      <button type='submit'
        className='bg-red-800 hover:bg-black-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'
      >
        <RiSearch2Line />
      </button>
    </form>
  );
};

export default Search;
