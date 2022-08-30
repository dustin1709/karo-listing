import React from 'react';

const Post = ({ house }) => {
  return (
    <div style={{}} className='mb-5 mt-6 bg-white p-5 shadow-1 rounded-lg cursor-pointer hover:shadow-2xl transition'>
      <div className='text-lg text-gray-800 mb-1' style={{width: '80%', display: 'grid', gridTemplateColumns: '6% 90%'}}>
        <img className='avatar' src={'https://lab.karo.land/' + house.broker.avatar} alt='' />
        <div>
          <span className='font-semibold'>{house.broker.fullname}</span>
          <br />
          <span className='text-sm'>{house.created_at}</span>
        </div>
      </div>
      <h2 className='font-semibold mt-2'>{house.title}</h2>
      <h2 className='mt-2 mb-5'>{house.description}</h2>
      <div className='text-gray-800 mb-4'>
        Phone: {house.broker.phone}
        <br />
        Email: <a className='text-red-900' href={'mailto:'+house.broker.email}>{house.broker.email}</a>
      </div>
    </div>
  );
};

export default Post;
