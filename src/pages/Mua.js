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
        
        <form className="flex items-center">
          <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" 
                id="voice-search" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Gõ từ khóa" />
          </div>
          <button type="submit" className="inline-flex items-center py-2.5 px-2 ml-2 font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>

            {houses.map((house, index) => {
                return (
                  <>
                    {
                      <Link to={`/property/${house.id}`} key={index}>
                        <House2 house={house} />
                      </Link>
                    }
                  </>
                );
            })}
        </div>
        </section>
        </>
    );
}

export default Mua;
