import React from 'react';
import Cart from './navigation-components/Cart';
import Menu from './navigation-components/Menu';
import Search from './navigation-components/Search';
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
      </div>
      <Menu />
    </>
  );
};

export default Navigation;
