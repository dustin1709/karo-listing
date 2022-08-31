import React from 'react';

// import icons
import { BiArea, BiCheck } from 'react-icons/bi';

const House = ({ house }) => {
  return (
    <div className='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] h-[660px] mx-auto cursor-pointer hover:shadow-2xl transition'>
      <img className='mb-8' src={'https://lab.karo.land/' + house.thumbnail.url} style={{width: '312px', height: '312px', borderRadius: '90px 0em 90px 0em'}} alt='' />
      <div className='mb-4 flex gap-x-2'>
        <div className='bg-red-800 rounded-full text-white px-3 inline-block  text-sm'>
          {house.city_name}
        </div>
        <div className='bg-gray-500 rounded-full text-white px-3 inline-block  text-sm'>
          {house.district_name}
        </div>
        <div className='bg-blue-500 rounded-full text-white px-3 inline-block  text-lg'>
          <BiCheck />
        </div>
      </div>
      <h1 className='font-semibold'>
        {house.property.full_address}
      </h1>
      <div className='flex gap-x-4 my-4'>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px] rounded-full'>
            <BiArea />
          </div>
          <div className='text-base'>{house.property.dien_tich_san}m2</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[15px] font-bold'>
            Dài
          </div>
          <div className='text-base'>{house.property.chieu_dai}m</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[15px] font-bold'>
            Rộng
          </div>
          <div className='text-base'>{house.property.chieu_rong}m</div>
        </div>
      </div>
      <div className='text-lg font-semibold text-red-800 mb-4'>
        {
          house.price[0].price ?
          "VND "+(house.price[0].price / 1000000000)+" tỷ" : "Giá đang cập nhật"
        }
      </div>
      <div className='text-lg text-gray-800 mb-1'>
        Broker: {house.broker.fullname}
      </div>
      <div className='text-lg text-gray-800 mb-4'>
        Phone: {house.broker.phone}
      </div>
    </div>
  );
};

export default House;
