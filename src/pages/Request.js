import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import Cities from "../components/hooks/Cities";
import ReactPaginate from 'react-paginate';
import "../components/css/loader.css";
import "../components/css/Pagination.css";

const Request = ({houses, isloading}) => {
    useEffect(() => {
      console.log("request list loaded: " + isloading);
      console.log("request count: " + houses.length);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      const filteredResults = houses.filter((house) =>
        (house.title || "").toLowerCase().includes(search.toLowerCase())
        || (house.broker.fullname || "").toLowerCase().includes(search.toLowerCase())
        || (house.description || "").toLowerCase().includes(search.toLowerCase())
      );

      setSearchResults(filteredResults.reverse());
    }, [houses, search]);

    function Items({ currentItems }) {
      return (
        <>
          {currentItems.map((house, index) => {
                  return (
                    <>
                      { 
                        <Post house={house} />
                      }
                    </>
                  );
          })}
        </>
      );
    }

    function PaginatedItems({ itemsPerPage }) {
      // We start with an empty list of items.
      const [currentItems, setCurrentItems] = useState([]);
      const [pageCount, setPageCount] = useState(0);
      // Here we use item offsets; we could also use page offsets
      // following the API or data you're working with.
      const [itemOffset, setItemOffset] = useState(0);
    
      useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(searchResults.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(searchResults.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);
    
      // Invoke when user click to request another page.
      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % searchResults.length;
        // console.log(
        //   `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
      };
    
      return (
        <>
          <Items currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"page-active"}
          />
        </>
      );
    }

    return (
        <>
        <section className='mb-20'>
        <div className='container mx-auto'>
        <h1 className="mb-2 font-semibold text-red-800 text-[20px]">Nhu c???u b???t ?????ng s???n</h1>
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
          <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" 
                className="bg-gray-100 border border-gray-600 text-gray-900 text-sm rounded-lg block w-full pl-10 p-3  dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black" 
                placeholder="T??m ki???m theo t??? kh??a"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button type="submit" className="inline-flex items-center py-3 px-2 ml-2 font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>

            {
              (isloading == false) ?
              // searchResults.map((house, index) => {
              //     return (
              //       <>
              //         { 
              //           <Post house={house} />
              //         }
              //       </>
              //     );
              // })
              <PaginatedItems itemsPerPage={10} /> : 
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">??ang t???i d??? li???u...</h2>
              </div>
            }
          
        </div>
        </section>
        </>
    );
}

export default Request;
