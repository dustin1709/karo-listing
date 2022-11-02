import React, {lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from './pages/Home';

const Mua = lazy(() => import('./pages/Mua'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Thue = lazy(() => import('./pages/Thue'));
const Request = lazy(() => import('./pages/Request'));
const SearchRequest = lazy(() => import('./pages/SearchRequest'));
const Post = lazy(() => import('./pages/Post'));
const TimMoiGioi = lazy(() => import('./pages/TimMoiGioi'));

export default function App() {

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Suspense fallback={<h1 className='text-red-700'>Đang tải...</h1>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path='/mua' element={<Mua />} />
          <Route path='/thue' element={<Thue />} />
          <Route path='/request' element={<Request />} />
          <Route path='/search_request/:type/:city/:dist/:ptype' element={<SearchRequest />} />
          <Route path="/post" element={<Post />} />
          <Route path="/timmoigioi" element={<TimMoiGioi />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
  
};
