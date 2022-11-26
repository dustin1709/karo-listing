import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Cities from "../components/hooks/Cities";
import NameCard from "../components/NameCard";
import Dialog from "../components/Dialog";

const TimMoiGioi = ({ listAgent }) => {
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const confirm = () => {
      console.log('Confirm');
      setShowTaskDialog(false);
    };

    const [city, setCity] = useState(0);
    const [dist, setDist] = useState(0);
    // const [type, setType] = useState(0);
    const cities = Cities();
    const selectedCity = useRef(1);
    const [listDistrict, setListDistrict] = useState([]);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
        const filteredResults = listAgent.filter((broker) =>
          (broker.city_name || "").toLowerCase().includes(search.toLowerCase())
          || (broker.district_name || "").toLowerCase().includes(search.toLowerCase())
          || (broker.fullname || "").toLowerCase().includes(search.toLowerCase())
        );
  
        setSearchResults(filteredResults);
    }, [listAgent, search]);

    const filter = async (e) => {
        e.preventDefault();
        if (city == 0 || dist == 0) {
            e.preventDefault();
            setShowTaskDialog(true);
        } else {
            var config = {
                method: 'post',
                url: 'https://lab.karo.land/api/broker/detail'
            };
            axios(config).then(function (response) {
                // console.log(JSON.stringify(response.data));
                let fulllist = response.data;
                let broker_list = [];
                fulllist.map((broker) => {
                    if(broker.city_id == city && broker.district_id == dist) {
                        broker_list.push(broker);
                    }
                });
                setSearchResults(broker_list);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <>
        <Dialog
        show={showTaskDialog}
        title="Chưa chọn bộ lọc"
        description="Để sử dụng công cụ filter tìm kiếm môi giới, xin vui lòng chọn lại thành phố, quận huyện trong bộ lọc."
        confirm={confirm} />
        <section className="mb-5 pl-9">
            <h1 className="text-red-800 lg:text-[30px] leading-none mb-6 font-medium">
                Tìm Kiếm Môi Giới trên Karo.Homes
            </h1>

            <form className="flex items-center mt-2 pr-5 lg:pr-96" onSubmit={(e) => e.preventDefault()}>
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

            <h5 className="lg:text-[18px] mb-2 mt-2">Chọn theo tỉnh thành:</h5>
            <form className='mx-auto flex flex-col lg:flex-row mt-1 pr-8' onSubmit={filter}>
            
            <select onChange={changeSelectOptionHandler}  className="dropdown p-3 mr-5 mb-2" aria-label=".form-select-lg">
                {
                    <>
                    <option value="0">Chọn TP</option>
                    {cities.map(c => (<option value={c.id}>{c.name}</option>))}
                    </>
                }
            </select>

            <select onChange={(e) => setDist(e.target.value)} className="dropdown p-3 mr-5 mb-2" aria-label=".form-select-lg">
                {
                    <>
                    <option value="0">Chọn quận</option>
                    {listDistrict.map((district) => <option value={district.id}>{district.name}</option>)}
                    </>
                }
            </select>

            {/* <select onChange={(e) => setType(e.target.value)} className="dropdown p-3 mr-5 mb-2" aria-label=".form-select-lg">
                <option value="0">Chọn loại nhà</option>
                <option value="1">Nhà Phố</option>
                <option value="2">Chung Cư</option>
                <option value="4">Đất nền</option>
            </select> */}

            <button type='submit'
                className='bg-red-700 text-white px-5 py-3 mb-2 rounded-lg'
            >
                Tìm Môi Giới
            </button>
            </form>
        </section>
        <section className='mb-20'>
            <div className="lg:w-[1200px] lg:pl-9">
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
                {searchResults.map((broker) => {
                    return (
                        <NameCard broker={broker} />
                    );
                })}
            </div>
            </div>
        </section>
        </>
    );
}

export default TimMoiGioi
