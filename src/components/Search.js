import React, { useContext, useState, useRef, useEffect } from 'react';
import Cities from "./hooks/Cities";
import './css/Search.css';
import axios from 'axios';
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
  let data = new FormData();  
  const changeSelectOptionHandler = (e) => {
      selectedCity.current = e.target.value;
      setCity(e.target.value);
      data.append('city', selectedCity.current);
      let config = {
        method: 'post',
        url: 'https://lab.karo.land/api/post/districtlist',
        data: data
      };
      axios(config).then(function (response) {
        setListDistrict(response.data.district);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    data.append('city', 1);
    let config = {
      method: 'post',
      url: 'https://lab.karo.land/api/post/districtlist',
      data: data
    };
    axios(config).then(function (response) {
      setListDistrict(response.data.district);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const filter = () => {
    // let data = new FormData();
    // data.append('post_type', '1');
    // data.append('property_type', type);
    // data.append('city', city);
    // data.append('district', dist);
    // data.append('limit', '100');
    // data.append('offset', '0');
    // let config = {
    //   method: 'post',
    //   url: 'https://lab.karo.land/api/post/listfilter',
    //   data: data
    // };
    // axios(config).then(function (response) {
    //   console.log(response.data.collection);
    //   setErrCode(response.data.error_code);
    //   setHouseList(response.data.collection);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  return (
    <form className='px-[30px] py-5 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>
      
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
              listDistrict.map((district) => <option value={district.id}>{district.name}</option>)
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
