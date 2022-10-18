import React from 'react';

// import components
import HouseList from '../components/HouseList';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div className='min-h-[1200px]'>
      <Banner />
      <div className='clear-both py-10'></div>
      <HouseList />
    </div>
  );
};

export default Home;
