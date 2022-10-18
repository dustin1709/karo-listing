import React, {useState} from 'react';
// 253428109
// import link
import { Link } from 'react-router-dom';
// import logo
import Logo from '../assets/img/logo.png';
import Bar from '../assets/img/menu.png';
import Close from '../assets/img/close.png';

const Header = () => {

  let Links =[
    {name:"mua", link:"/mua"},
    {name:"thuê", link:"/thue"},
    {name:"nhu cầu", link:"/request"},
    {name:"tìm môi giới", link:"/timmoigioi"},
    {name:"đăng tin", link:"/post"}
  ];
  let [open,setOpen]=useState(false);

  return (
    <>
    <div className='w-full fixed top-0 left-0 clear-both z-[1]'>
      <div className='md:flex items-center justify-between bg-white py-3 md:px-10'>
      <div className='font-bold cursor-pointer flex items-center'>
        <Link to='/'>
        <img src={Logo} alt=''  style={{width: '30%'}}/>
        </Link>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      {!open ? <img src={Bar}/>:<img src={Close}/>}
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-18 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-6 md:my-0 my-7'>
              <Link to={link.link} className='hover:text-red-700 duration-500'>{link.name}</Link>
            </li>
          ))
        }
        <button className='ml-5 py-1 px-3 bg-red-800 text-white rounded-lg hover:bg-gray-600'>
          đăng nhập
        </button>
      </ul>
      </div>
    </div>
    <div style={{padding: '50px'}}></div>
    </>
  );
};

export default Header;
