import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Cities from "./hooks/Cities";
import './css/Search.css';
import axios from 'axios';
import Dialog from '../components/Dialog';
// import icon
import { RiSearch2Line } from 'react-icons/ri';

const Search = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  const confirm = () => {
    console.log('Confirm');
    setShowTaskDialog(false);
  };

  const cancel = () => {
    setShowTaskDialog(false);
  };

  const navigate = useNavigate();
  const [city, setCity] = useState(0);
  const [dist, setDist] = useState(0);
  const [type, setType] = useState(0);
  const [ptype, setPtype] = useState(0);

  const cities = Cities();
  const selectedCity = useRef(1);
  const [listDistrict, setListDistrict] = useState([]);  
  let data = new FormData();  
  const changeSelectOptionHandler = (e) => {
      selectedCity.current = e.target.value;
      setCity(e.target.value);
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

  const sendForm = async (e) => {
    if (type !== 0 && city!== 0 && dist !== 0 && ptype !== 0) {
      // console.log('/search_request/:'+type+'/:'+city+'/:'+dist+'/:'+ptype);
      navigate('/search_request/'+type+'/'+city+'/'+dist+'/'+ptype);
    } else {
      e.preventDefault();
      setShowTaskDialog(true);
    }
  }

  return (
    <Fragment>
      <Dialog
      show={showTaskDialog}
      title="Xin h??y ch???n b??? l???c"
      description="????? s??? d???ng thanh search, xin vui l??ng ??i???n h???t ho???c ch???n l???i t???t c??? c??c b??? l???c."
      confirm={confirm} />
      <form onSubmit={sendForm} className='px-[15px] py-3 mb-1 max-w-[1170px] mx-auto lg:-top-4 lg:shadow-1 bg-transparent backdrop-blur rounded-lg'>
        <h5 className='font-medium text-[20px]'>T??m nh??</h5>
        <div className='py-3 mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative'>
        <select onChange={(e) => setPtype(e.target.value)} className="dropdown" aria-label=".form-select-lg">
          <option value="0">Ch???n nhu c???u</option>
          <option value="1">Mua</option>
          <option value="2">Thu??</option>
        </select>

        <select onChange={changeSelectOptionHandler}  className="dropdown" aria-label=".form-select-lg">
            {
                <>
                <option value="0">Ch???n TP</option>
                {
                  cities.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))
                }
                </>
                
            }
        </select>

        <select onChange={(e) => setDist(e.target.value)} className="dropdown" aria-label=".form-select-lg">
            {
                <>
                <option value="0">Ch???n Qu???n</option>
                {
                  listDistrict.map((district) => <option value={district.id}>{district.name}</option>)
                }
                </>
            }
        </select>

        <select onChange={(e) => setType(e.target.value)} className="dropdown" aria-label=".form-select-lg">
          <option value="0">Ch???n lo???i b??s</option>
          <option value="1">Nh?? Ph???</option>
          <option value="2">Chung C??</option>
          <option value="4">?????t n???n</option>
        </select>

        <button type='submit'
          className='bg-red-800 hover:bg-black-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'
        >
          <RiSearch2Line />
        </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Search;
