import React from 'react';
import { BiCheck } from 'react-icons/bi';
import Image from '../assets/img/background.png';
import Search from '../components/Search';


const Banner = () => {
  return (
    <section className='h-full max-h-[600px] mb-0 xl:mb-10'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:ml-8 xl:ml-[100px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] leading-none mb-6'>
            Tìm nhà ưng ý qua <span className='text-red-800'>Karo Homes</span>.
          </h1>
          <p className='max-w-[480px] mb-8'>
            Thông tin chính xác, đảm bảo giấy tờ pháp lý, nhanh, và tiện lợi.
          </p>
        </div>
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <img src={Image} alt='' style={{borderRadius: '30px 0 0 0', opacity: '0.9'}} />
        </div>
      </div>
      <Search />
      <div className='mx-auto container'>
        Chú thích: Các thông tin có tích xanh &nbsp;
        <div className='bg-blue-500 rounded-full text-white px-1 inline-block  text-lg'>
          <BiCheck />
        </div>
        &nbsp;là bất động sản được đăng lên bởi thành viên của Karo.
      </div>
    </section>
  );
};

export default Banner;
