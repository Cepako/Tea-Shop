import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import './Cart.scss';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  const products = useAppSelector((state) => state.cart);
  let productsCount = 0;
  products.map((product) => (productsCount += product.quantity!));

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
        {productsCount}
      </span>
    </div>
  );
};

export default Cart;
