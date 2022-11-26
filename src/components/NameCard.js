import React from "react";
import { BiPhone, BiMailSend } from 'react-icons/bi';

const NameCard = ({ broker }) => {
    return (
        <>
            <div className='bg-white shadow-1 p-5 rounded-lg w-full max-w-[360px] h-[180px] mx-auto cursor-pointer hover:shadow-2xl transition'>
                <div className='mb-4 flex gap-x-2'>
                    <div className='bg-red-800 rounded-full text-white px-3 inline-block  text-sm'>
                    {broker.city_name}
                    </div>
                    <div className='bg-gray-500 rounded-full text-white px-3 inline-block  text-sm'>
                    {broker.district_name}
                    </div>
                </div>
                <h1 className='font-semibold'>{(broker.fullname).toUpperCase()}</h1>
                <p className="text-xs text-transparent">{broker.city_id}--{broker.district_id}</p>
                <div className='flex items-center text-gray-600 gap-1'>
                    <div className='text-[20px] rounded-full'>
                        <BiMailSend />
                    </div>
                    <div className='text-base'>{broker.email ? broker.email : "Chưa nhập email"}</div>
                </div>
                <div className='flex items-center text-gray-600 gap-1'>
                    <div className='text-[20px] rounded-full'>
                        <BiPhone />
                    </div>
                    <div className='text-base'>{broker.phone ? broker.phone : "Chưa nhập số điện thoại"}</div>
                </div>
            </div>
        </>
    );
}

export default NameCard