import React from 'react';
import { Link } from 'react-router-dom';

import './EmptyCart.scss';

const EmptyCart: React.FC = () => {
  return (
    <div className='empty-cart'>
      <h3>My cart</h3>
      <div>
        <p>Cart is empty</p>
        <Link to='/'>Continue Browsing</Link>
      </div>
    </div>
  );
};

export default EmptyCart;
