import React, { useEffect, useState } from 'react';
import House from './House';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    let data = new FormData();
    data.append('limit', '12');
    data.append('offset', '0');
    let config = {
      method: 'post',
      url: 'https://lab.karo.land/api/post/listall',
      data: data
    };
    axios(config).then(function (response) {
      //console.log(JSON.stringify(response.data));
      setHouses(response.data.collection);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <h1 className='text-4xl lg:text-[45px] leading-none mb-10'>Gợi ý</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
