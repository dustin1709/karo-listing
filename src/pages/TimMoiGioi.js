import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Cities from "../components/hooks/Cities";

const TimMoiGioi = ({listAgent}) => {

    const [city, setCity] = useState(0);
    const [dist, setDist] = useState(0);
    const [type, setType] = useState(0);
    const cities = Cities();
    const selectedCity = useRef(1);
    const [listDistrict, setListDistrict] = useState([]);

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

    const filter = async (e) => {

    }

    return (
        <>
        <section className="mb-20 pb-20 pl-8">
            <h1 className="text-red-800 lg:text-[30px] leading-none mb-6 font-medium">
                Tìm Kiếm Môi Giới trên Karo.Homes
            </h1>
            <h5 className="lg:text-[18px] mb-2">Chọn theo tỉnh thành, loại nhà:</h5>
            <form className='mx-auto flex flex-col lg:flex-row mt-1 pr-10' onSubmit={filter}>
            
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

            <select onChange={(e) => setType(e.target.value)} className="dropdown p-3 mr-5 mb-2" aria-label=".form-select-lg">
                <option value="0">Chọn loại nhà</option>
                <option value="1">Nhà Phố</option>
                <option value="2">Chung Cư</option>
                <option value="4">Đất nền</option>
            </select>

            <button type='submit'
                className='bg-red-700 text-white px-5 py-3 mb-2 rounded-lg'
            >
                Tìm Môi Giới
            </button>
            </form>
        </section>
        </>
    );
}

export default TimMoiGioi
