import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import House2 from '../components/House2';

const Mua = ({ houses, search, setSearch }) => {

    return (
        <>
        <section className='mb-20'>
        <div className='container mx-auto'>
        
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
          <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Gõ từ khóa"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button type="submit" className="inline-flex items-center py-2.5 px-2 ml-2 font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
            {houses.map((house, index) => {
                return (
                  <>
                    {
                      house.type === 1 ?
                      <Link to={`/property/${house.id}`} key={index}>
                        <House2 house={house} />
                      </Link>
                      : <></>
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
