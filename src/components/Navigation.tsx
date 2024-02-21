import React from 'react';
import Cart from './navigation-components/Cart';
import Menu from './navigation-components/Menu';
import Search from './navigation-components/Search';
import CartSideBar from './navigation-components/CartSideBar';
import { Link } from 'react-router-dom';

import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <>
      <div className="nav">
        <Cart />
        <Link to="/" className="nav__title">
          <h1>Blooms's Tea</h1>
        </Link>
        <Search />
        <Menu />
        <CartSideBar />
      </div>
    </>
  );
};

export default Navigation;
