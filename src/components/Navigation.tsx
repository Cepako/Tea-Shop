import React from 'react';
import Cart from './navigation-components/Cart';
import Menu from './navigation-components/Menu';
import Search from './navigation-components/Search';

import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <>
      <div className="nav">
        <Cart />
        <h1 className="nav__title">Blooms's Tea</h1>
        <Search />
      </div>
      <Menu />
    </>
  );
};

export default Navigation;
