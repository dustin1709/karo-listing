import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiArea } from 'react-icons/bi';
// import link
import { Link } from 'react-router-dom';
import "../components/css/loader.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(true);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let conf = {
        method: 'post',
        url: 'https://lab.karo.land/api/post/count'
      };
      let limit = 0;
      axios(conf).then(function (response) {
        limit = response.data.countPost;
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
          let hlist = [];
          houselist.map((house) => {
            if(house.id === id) {hlist.push(house)}
          })
          setHouses(hlist);
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

  return (
    <>
    {
      !isloading ?
      houses.map((property, index) => {
          return (
            <>
              { 
                <div className='container mx-auto min-h-[800px] mb-14 mt-5'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <div>
                      <h2 className='text-2xl font-semibold'>{property.title}</h2>
                      <h3 className='text-lg mb-4'>{property.property.full_address}</h3>
                    </div>
                    <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
                      <div className='bg-red-700 rounded-full text-white px-3 inline-block'>
                        {property.city_name}
                      </div>
                      <div className='bg-red-700 rounded-full text-white px-3 inline-block'>
                        {property.district_name}
                      </div>
                    </div>
                    <div className='text-3xl font-semibold text-red-600'>
                      {property.price[0].price / 1000000000} tỷ VNĐ
                    </div>
                  </div>
                  <div className='flex flex-col items-start gap-8 lg:flex-row'>
                    <div className='max-w-[768px]'>
                      <div className='mb-8'>
                        <img src={'https://lab.karo.land/' + property.thumbnail.url} alt='' />
                      </div>
                      <div className='flex gap-x-6 text-red-700 mb-6'>
                        <div className='flex gap-x-2 items-center'>
                          <span className='text-2xl'> Dài </span>
                          <div className='text-lg font-medium'>{property.chieu_dai}</div>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                          <span className='text-2xl'> Rộng </span>
                          <div className='text-lg font-medium'>{property.chieu_rong}</div>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                          <BiArea className='text-2xl' />
                          <div className='text-lg font-medium'>{property.property.dien_tich_san} m2</div>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                          <span className='text-2xl'> Pháp lý: </span>
                          <div className='text-2xl text-black'>{property.property.phap_ly}</div>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                          <span className='text-2xl'> Số năm xây dựng: </span>
                          <div className='text-2xl text-black'>{property.property.so_nam_xay_dung}</div>
                        </div>
                      </div>
                      <p>{property.description}</p>
                    </div>
                    <div className='flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8'>
                      <div className='flex items-center gap-x-4 mb-8'>
                        <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                          <img className='rounded-full' src={(property.broker.avatar === null) ? '/pixabay.jpg' : ('https://lab.karo.land/' + property.broker.avatar)}/>
                        </div>
                        <div>
                          <div className='font-bold text-lg'>{property.broker.fullname}</div>
                          <Link to='' className='text-red-700 text-sm'>
                            {property.broker.phone}
                          </Link>
                        </div>
                      </div>
                      <form className='flex flex-col gap-y-4'>
                        <input
                          className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
                          type='text'
                          placeholder='Name*'
                        />
                        <input
                          className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
                          type='text'
                          placeholder='Email*'
                        />
                        <input
                          className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
                          type='text'
                          placeholder='Phone*'
                        />
                        <textarea
                          className='border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
                          type='text'
                          placeholder='Tôi muốn hỏi thêm thông tin...'
                        />
                        <div className='flex gap-x-2'>
                          <button
                            className='bg-red-700 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition'
                            type='submit'
                          >
                            Gửi
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              }
            </>
          )}
      ) : 
      <div style={{width: '100%', padding: '8%', textAlign: 'center'}}>
        <div className="loader"></div>
        <h2 className="mt-5">Đang tải dữ liệu...</h2>
      </div>
    }
    </>
  );
};

export default PropertyDetails;
