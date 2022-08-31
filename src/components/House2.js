import React from 'react';
import { BiArea, BiCheck } from 'react-icons/bi';
import './css/House2.css';

const House2 = ({ house }) => {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '30% 5% 65%'}} className='mb-5 mt-6 bg-white p-5 shadow-1 rounded-lg cursor-pointer hover:shadow-2xl transition'>
      <img src={'https://lab.karo.land/' + house.thumbnail.url} alt='' />
      <div></div>
      <div>
        <div className='mb-4 flex gap-x-3'>
            <div className='bg-red-800 rounded-full text-white px-3 inline-block  text-sm'>
              {house.city_name}
            </div>
            <div className='bg-gray-500 rounded-full text-white px-3 inline-block  text-sm'>
              {house.district_name}
            </div>
            <div className='bg-blue-500 rounded-full text-white px-2 inline-block  text-lg'>
              <BiCheck />
            </div>
        </div>
        <h3 className='font-semibold'>{house.title}</h3>
        <h5 className='text-gray-500'>{house.created_at}</h5>
        <h2 className='mt-2'>{house.property.full_address ? house.property.full_address : "Đang cập nhật"}</h2>
        <h2 className='mt-2'>{house.description}</h2>
        <div className='flex gap-x-4 my-4'>
            <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[25px] rounded-full'>
                <BiArea />
            </div>
            <div className='text-base'>{house.property.dien_tich_san} m2</div>
            </div>
            <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[18px] font-bold'>
                Dài
            </div>
            <div className='text-base'>{house.property.chieu_dai} m</div>
            </div>
            <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[18px] font-bold'>
                Rộng
            </div>
            <div className='text-base'>{house.property.chieu_rong} m</div>
            </div>
        </div>
        <div className='text-lg font-semibold text-red-800 mb-4'>
            {
            house.price[0].price ?
            "VND "+(house.price[0].price / 1000000000)+" tỷ" : "Giá đang cập nhật"
            }
        </div>
        <div className='text-lg text-gray-800 mb-1' style={{width: '80%', display: 'grid', gridTemplateColumns: '10% 90%'}}>
            <img className='avatar' src={'https://lab.karo.land/' + house.broker.avatar} alt='' />
            <div className='font-semibold'>
              {house.broker.fullname}
              <br />
              Phone: {house.broker.phone}
            </div>
        </div>
      </div>
    </div>
  );
};

export default House2;
