import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.scss';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  const cartClickHandler = () => {
    const cartSideBar = document.querySelector(
      '.cart-sidebar'
    ) as HTMLDivElement;

    if (window.innerWidth < 1024) navigate('/cart');
    else if (cartSideBar) {
      cartSideBar.classList.add('active');
    }
  };

  return (
    <div className="cart">
      <img
        src="./images/shopping-bag-icon.svg"
        alt="shopping bag"
        onClick={cartClickHandler}
      />
      <span id="product-count" onClick={cartClickHandler}>
        100
      </span>
    </div>
  );
};

export default Cart;
