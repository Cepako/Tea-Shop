import React, { useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import './Cart.scss';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  const products = useAppSelector((state) => state.cart);
  let productsCount = 0;
  products.map((product) => (productsCount += product.quantity!));

  const cartSideBar = document.querySelector('.cart-sidebar') as HTMLDivElement;

  const cartClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) navigate('/cart');
    else if (cartSideBar) {
      cartSideBar.classList.add('active');
    }
    e.stopPropagation();
  };
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (cartSideBar && !cartSideBar.contains(event.target as Node)) {
        cartSideBar.classList.remove('active');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="cart">
      <img
        src="/images/shopping-bag-icon.svg"
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
