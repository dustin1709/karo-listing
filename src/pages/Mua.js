import React, { useEffect, useState, useRef, Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import House2 from '../components/House2';
import Cities from "../components/hooks/Cities";
import ReactPaginate from 'react-paginate';
import "../components/css/loader.css";
import "../components/css/Pagination.css";
import Dialog from '../components/Dialog';

const Mua = () => {
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const confirm = () => {
      console.log('Confirm');
      setShowTaskDialog(false);
    };
    const cancel = () => {
      setShowTaskDialog(false);
    };

    const [city, setCity] = useState(0);
    const [dist, setDist] = useState(0);
    const [type, setType] = useState(0);
    const [isloading, setIsloading] = useState(true);
    const cities = Cities();
    const selectedCity = useRef(1);
    const [listDistrict, setListDistrict] = useState([]);
    const [count, setCount] = useState(0);

    const changeSelectOptionHandler = (e) => {
        selectedCity.current = e.target.value;
        setCity(e.target.value);
        let data = new FormData();
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
      let data = new FormData();
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

    const [houses, setHouses] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      const loadData = async () => {
        let conf = {
          method: 'post',
          url: 'https://lab.karo.land/api/post/count'
        };
        let limit = 0;
        axios(conf).then(function (response) {
          limit = response.data.countPost;
          setCount(limit);
          console.log("Total listing is " + limit);
          let data = new FormData();
          data.append('limit', limit.toString());
          data.append('offset', '0');
          let config = {
            method: 'post',
            url: 'https://lab.karo.land/api/post/listall',
            data: data
          };
          axios(config).then(function (res) {
            // console.log(JSON.stringify(res.data));
            const houselist = res.data.collection;
            let hlist = [];
            houselist.map((house) => {
              if(house.type !== 4 && house.type !== 2) {hlist.push(house)}
            })
            setHouses(hlist);
            setIsloading(false);
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(function (error) {
          console.log("error loading listing count...");
        });
      };
      loadData();
    }, []);

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

    const filter = async (e) => {
      e.preventDefault();
      console.log(count);
      if(type !== 0 && city !== 0 && dist !== 0) {
        let data = new FormData();
        data.append('post_type', '1');
        data.append('property_type', type.toString());
        data.append('city', city.toString());
        data.append('district', dist.toString());
        data.append('limit', count.toString());
        data.append('offset', '0');
        // for (let pair of data.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]); 
        // }
        let config = {
          method: 'post',
          url: 'https://lab.karo.land/api/post/listfilter',
          data: data
        };
        axios(config).then(function (response) {
          setSearchResults(response.data.collection);
          // console.log(response.data.collection);
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        e.preventDefault();
        setShowTaskDialog(true);
      }
    }

    function Items({ currentItems }) {
      return (
        <>
          {
            currentItems.map((house, index) => {
                    return (
                      <>
                        { 
                          <Link to={`/property/${house.id}`} key={index}>
                            <House2 house={house} />
                          </Link>
                        }
                      </>
                    );
            })
          }
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
        <Dialog
        show={showTaskDialog}
        title="Chưa chọn bộ lọc"
        description="Để sử dụng công cụ filter, xin vui lòng điền hết hoặc chọn lại tất cả các bộ lọc."
        confirm={confirm} />
        <section className='mb-20' style={{width: '100%'}}>
        <div className='container mx-auto'>
        <h1 className="mb-2 font-semibold text-red-800 text-[20px]">Tìm mua nhà</h1>
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

        <h5 className="mt-2">Chọn theo tỉnh thành, loại nhà:</h5>
        <form className='mx-auto flex flex-col lg:flex-row justify-between mt-1' onSubmit={filter}>
        
          <select onChange={changeSelectOptionHandler}  className="dropdown p-3 mb-2" aria-label=".form-select-lg">
              {
                  <>
                  <option value="0">Chọn TP</option>
                  {cities.map(c => (<option value={c.id}>{c.name}</option>))}
                  </>
              }
          </select>

          <select onChange={(e) => setDist(e.target.value)} className="dropdown p-3 mb-2" aria-label=".form-select-lg">
              {
                  <>
                  <option value="0">Chọn quận</option>
                  {listDistrict.map((district) => <option value={district.id}>{district.name}</option>)}
                  </>
              }
          </select>

          <select onChange={(e) => setType(e.target.value)} className="dropdown p-3 mb-2" aria-label=".form-select-lg">
            <option value="0">Chọn loại nhà</option>
            <option value="1">Nhà Phố</option>
            <option value="2">Chung Cư</option>
            <option value="4">Đất nền</option>
          </select>

          <button type='submit'
            className='bg-red-700 text-white px-5 py-3 mb-2 rounded-lg'
          >
            Filter
          </button>
        </form>
            {
              !isloading ?
              // searchResults.map((house, index) => {
              //     return (
              //       <>
              //         { 
              //           <Link to={`/property/${house.id}`} key={index}>
              //             <House2 house={house} />
              //           </Link>
              //         }
              //       </>
              //     );
              // }) : 
              <PaginatedItems itemsPerPage={10} /> :
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Đang tải dữ liệu...</h2>
              </div>
            }
          
        </div>
        </section>
        </>
    );
}

export default Mua;
