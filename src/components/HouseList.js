import React, { useEffect, useState } from 'react';
import House from './House';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./css/loader.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./css/Carousel.css";

const HouseList = ({ houseNew, houseHanoi, houseSaigon, isloading }) => {
  // const [houses, setHouses] = useState([]);
  // const [houses1, setHouses1] = useState([]);
  // const [houses2, setHouses2] = useState([]);
  // const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    // const loadData = async () => {
    //   let conf = {
    //     method: 'post',
    //     url: 'https://lab.karo.land/api/post/count'
    //   };
    //   let limit = 0;
    //   axios(conf).then(function (res) {
    //     limit = res.data.countPost;
    //     let data = new FormData();
    //     data.append('limit', limit.toString());
    //     data.append('offset', '0');
    //     let config = {
    //       method: 'post',
    //       url: 'https://lab.karo.land/api/post/listall',
    //       data: data
    //     };
    //     axios(config).then(function (response) {
    //       const houselist = response.data.collection;
    //       let hlist = [];
    //       let hlist1 = [];
    //       let hlist2 = [];
    //       houselist.map((house) => {
    //         if(house.type == 1) {hlist.push(house)}
    //         if(house.city_name == "Hà Nội") {hlist1.push(house)}
    //         if(house.city_name == "TP Hồ Chí Minh") {hlist2.push(house)} 
    //       })
    //       hlist.length = 15;
    //       hlist1.length = 15;
    //       hlist2.length = 15;
    //       setHouses1(hlist1.reverse());
    //       setHouses2(hlist2.reverse());
    //       setHouses(hlist.reverse());
    //       setIsloading(false);
    //     }).catch(function (error) {
    //       console.log(error);
    //     });
    //   }).catch(function (error) {
    //     console.log("error loading listing count...");
    //   });
    // };
    // loadData();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <h1 className='text-4xl lg:text-[45px] leading-none mb-10 text-red-800 font-semibold'>Gợi ý</h1>
      </div>
      <div className='container mx-auto mt-10'>
        <h1 className='text-4xl lg:text-[25px] leading-none mb-10 text-red-800 font-semibold'>Mới nhất</h1>
        {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'> */}
          {
            !isloading ?
            <Carousel
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item"
            >
              {houseNew.map((house, index) => {
              return (
                <Link to={`/property/${house.id}`} key={index}>
                  <House house={house} />
                </Link>
              );
              })}
            </Carousel>
            :
            <>
              <div></div>
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Vui lòng chờ dữ liệu tải...</h2>
              </div>
              <div></div>
            </>
          }
        {/* </div> */}
      </div>
      <div className='container mx-auto mt-10'>
        <h1 className='text-4xl lg:text-[25px] leading-none mb-10 text-red-800 font-semibold'>Khu vực Hà Nội</h1>
        {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'> */}
          {
            !isloading ?
            <Carousel
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item"
            >
              {houseHanoi.map((house, index) => {
              return (
                <Link to={`/property/${house.id}`} key={index}>
                  <House house={house} />
                </Link>
              );
              })}
            </Carousel>
            :
            <>
              <div></div>
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Vui lòng chờ dữ liệu tải...</h2>
              </div>
              <div></div>
            </>
          }
        {/* </div> */}
      </div>
      <div className='container mx-auto mt-10'>
        <h1 className='text-4xl lg:text-[25px] leading-none mb-10 text-red-800 font-semibold'>TP Hồ Chí Minh</h1>
        {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'> */}
          {
            !isloading ?
            <Carousel
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item"
            >
              {houseSaigon.map((house, index) => {
              return (
                <Link to={`/property/${house.id}`} key={index}>
                  <House house={house} />
                </Link>
              );
              })}
            </Carousel>
            :
            <>
              <div></div>
              <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
                <div className="loader"></div>
                <h2 className="mt-5">Vui lòng chờ dữ liệu tải...</h2>
              </div>
              <div></div>
            </>
          }
        {/* </div> */}
      </div>
    </section>
  );
};

export default HouseList;
