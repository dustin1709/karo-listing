import React from 'react';

// import components
import HouseList from '../components/HouseList';
import Banner from '../components/Banner';

const Home = ({ houseNew, houseHanoi, houseSaigon, isloading }) => {
  return (
    <div className='min-h-[1200px]'>
      <Banner />
      <div className='clear-both py-10'></div>
      <HouseList houseNew={houseNew} houseHanoi={houseHanoi} houseSaigon={houseSaigon} isloading={isloading} />
    </div>
  );
};

export default Home;
