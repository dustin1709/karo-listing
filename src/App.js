import React, {lazy, Suspense, useState, useEffect} from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from './pages/Home';
import Mua from './pages/Mua';
import PropertyDetails from './pages/PropertyDetails';
import Thue from './pages/Thue';
import Request from './pages/Request';
import SearchRequest from './pages/SearchRequest';
import Post from './pages/Post';
import TimMoiGioi from './pages/TimMoiGioi';

// Use lazy loading
// const Mua = lazy(() => import('./pages/Mua'));
// const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
// const Thue = lazy(() => import('./pages/Thue'));
// const Request = lazy(() => import('./pages/Request'));
// const SearchRequest = lazy(() => import('./pages/SearchRequest'));
// const Post = lazy(() => import('./pages/Post'));
// const TimMoiGioi = lazy(() => import('./pages/TimMoiGioi'));

export default function App() {

  const [houses, setHouses] = useState([]);
  const [houses1, setHouses1] = useState([]);
  const [houses2, setHouses2] = useState([]);
  const [count, setCount] = useState(0);

  const [isloading, setIsloading] = useState(true);

  const [listAgent, setListAgent] = useState([]);

  const [housesNew, setHousesNew] = useState([]);
  const [housesHanoi, setHousesHanoi] = useState([]);
  const [housesSaigon, setHousesSaigon] = useState([]);

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
          let hlist1 = [];
          let hlist2 = [];
          let hlist3 = [];
          let hlist4 = [];
          let hlist5 = [];
          let hlist6 = [];

          houselist.map((house) => {
            if(house.type !== 4 && house.type !== 2) {hlist1.push(house)}
            if(house.type == 2) {hlist2.push(house)}
            if(house.type == 4) {hlist3.push(house)}
            if (house.type == 1) {
              hlist4.push(house);
              if(house.city_name == "Hà Nội") {hlist5.push(house)}
              if(house.city_name == "TP Hồ Chí Minh") {hlist6.push(house)}
            }
          })
          hlist4.length = 15;
          hlist5.length = 15;
          hlist6.length = 15;

          setHouses(hlist1);
          setHouses1(hlist2);
          setHouses2(hlist3);

          setHousesNew(hlist4);
          setHousesHanoi(hlist5);
          setHousesSaigon(hlist6);

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
    const loadAgent = async () => {
      var config = {
        method: 'post',
        url: 'https://lab.karo.land/api/broker/detail'
      };
      axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        setListAgent(response.data);
        setIsloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    loadAgent();
  }, []);

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Suspense fallback={<h1 className='text-red-700'>Đang tải...</h1>}>
        <Routes>
          <Route path='/' element={<Home houseNew={housesNew} houseHanoi={housesHanoi} houseSaigon={housesSaigon} isloading={isloading} />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path='/mua' element={<Mua houses={houses} count={count} isloading={isloading} />} />
          <Route path='/thue' element={<Thue houses={houses1} count={count} isloading={isloading} />} />
          <Route path='/request' element={<Request houses={houses2} isloading={isloading} />} />
          <Route path='/search_request/:type/:city/:dist/:ptype' element={<SearchRequest />} />
          <Route path="/post" element={<Post />} />
          <Route path="/timmoigioi" element={<TimMoiGioi listAgent={listAgent} />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
  
};
