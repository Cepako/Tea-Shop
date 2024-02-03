import React from 'react';

import './Cart.scss';

const Cart: React.FC = () => {
  return (
    <div className="cart">
      <img src="./images/shopping-bag-icon.svg" alt="shopping bag" />
      <span id="product-count">100</span>
    </div>
  );
};

export default Cart;
