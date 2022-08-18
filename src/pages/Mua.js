import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import House2 from '../components/House2';

const Mua = () => {
    const [houses, setHouses] = useState([]);
    useEffect(() => {
        let data = new FormData();
        data.append('limit', '10');
        data.append('offset', '0');
        let config = {
          method: 'post',
          url: 'https://lab.karo.land/api/post/listall',
          data: data
        };
        axios(config).then(function (response) {
          console.log(JSON.stringify(response.data));
          setHouses(response.data.collection);
        }).catch(function (error) {
          console.log(error);
        });
    }, []);
    return (
        <>
        <section className='mb-20'>
        <div className='container mx-auto'>
            {houses.map((house, index) => {
                return (
                <Link to={`/property/${house.id}`} key={index}>
                    <House2 house={house} />
                </Link>
                );
            })}
        </div>
        </section>
        </>
    );
}

export default Mua;
