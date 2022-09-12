import React from 'react';
// 253428109
// import link
import { Link } from 'react-router-dom';
// import logo
import Logo from '../assets/img/logo.png';

const Header = () => {
  return (
    <header className='py-2 mb-0'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
          <img src={Logo} alt=''  style={{width: '25%'}}/>
        </Link>
        <div className='flex items-center gap-5'>
          <Link className='hover:text-red-800 transition' to='/mua'>
            Mua
          </Link>
          <Link
            className='hover:text-red-800 transition' to='/thue'>
            Thuê
          </Link>
          <Link
            className='hover:text-red-800 transition' to='/request'>
            Nhu cầu
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
