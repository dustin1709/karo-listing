import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import "../components/css/loader.css";
import House2 from '../components/House2';

const SearchRequest = () => {
    const {type, city, dist, ptype} = useParams();
    const [houses, setHouses] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [city_name, setCity_name] = useState("");
    const [district_name, setDistrict_name] = useState("");

    useEffect(() => {
        const filter = async () => {
            // console.log(type+city+dist+ptype);
            let data = new FormData();
            data.append('post_type', ptype);
            data.append('property_type', type);
            data.append('city', city);
            data.append('district', dist);
            data.append('limit', '1000');
            data.append('offset', '0');
            let config = {
              method: 'post',
              url: 'https://lab.karo.land/api/post/listfilter',
              data: data
            };
            axios(config).then(function (response) {
              // console.log(response.data.collection);
              setHouses(response.data.collection);
              setIsloading(false);
              setCity_name(response.data.collection[0].city_name);
              setDistrict_name(response.data.collection[0].district_name);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        filter();
    }, [])

    useEffect(() => {
        const filteredResults = houses.filter((house) =>
          (house.city_name || "").toLowerCase().includes(search.toLowerCase())
          || (house.district_name || "").toLowerCase().includes(search.toLowerCase())
          || (house.title || "").toLowerCase().includes(search.toLowerCase())
          || (house.property.full_address || "").toLowerCase().includes(search.toLowerCase())
          || (house.broker.fullname || "").toLowerCase().includes(search.toLowerCase())
          || (house.description || "").toLowerCase().includes(search.toLowerCase())
        );
  
        setSearchResults(filteredResults);
    }, [houses, search]);

    return (
        <div className='container mx-auto'>
        <div className='mt-2 mb-3'>
            <div className='bg-red-800 rounded-full text-white px-5 inline-block  text-lg mr-2'>
              {city_name}
            </div>
            <div className='bg-gray-500 rounded-full text-white px-5 inline-block  text-lg'>
              {district_name}
            </div>
        </div>
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
          <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" 
                className="bg-gray-100 border border-gray-600 text-gray-900 text-sm rounded-lg block w-full pl-10 p-3  dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black" 
                placeholder="Tìm kiếm theo từ khóa"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button type="submit" className="inline-flex items-center py-3 px-2 ml-2 font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
        <div>
            {
              !isloading ?
              searchResults.map((house, index) => {
                  return (
                    <>
                      { 
                        <Link to="">
                          <House2 house={house} />
                        </Link>
                      }
                    </>
                  );
              }) : 
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Đang tải dữ liệu...</h2>
              </div>
            }
        </div>
        </div>
    )
}

export default SearchRequest