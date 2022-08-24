import React, { useEffect, useState } from 'react';
import House from './House';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./css/loader.css";

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    let data = new FormData();
    data.append('limit', '100');
    data.append('offset', '0');
    let config = {
      method: 'post',
      url: 'https://lab.karo.land/api/post/listall',
      data: data
    };
    axios(config).then(function (response) {
      //console.log(JSON.stringify(response.data));
      const houselist = response.data.collection;
      let hlist = [];
      houselist.map((house) => {
        if(house.type == 1) {hlist.push(house)}
      })
      hlist.length = 24;
      setHouses(hlist.reverse());
      setIsloading(false);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <h1 className='text-4xl lg:text-[45px] leading-none mb-10 text-red-800 font-semibold'>Nhà nổi bật</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {
            !isloading ?
            houses.map((house, index) => {
              return (
                <Link to={`/property/${house.id}`} key={index}>
                  <House house={house} />
                </Link>
              );
            })
            :
            <>
              <div></div>
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Vui lòng chờ xữ liệu tải...</h2>
              </div>
              <div></div>
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default HouseList;
