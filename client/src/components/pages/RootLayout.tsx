import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '../Navigation';
import Info from '../Info';
import Footer from '../Footer';
import GoUpButton from '../GoUpButton';
import PopUp from '../PopUp';
import ScrollToTop from '../ScrollToTop';

import '../../App.scss';

const RootLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className='App'>
        <Navigation />
        <Outlet />
        <Info />
        <Footer />
        <GoUpButton />
        <PopUp />
      </div>
    </>
  );
};

export default RootLayout;
