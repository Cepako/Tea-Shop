import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './CartSideBar.scss';
import Product from './Product';

const CartSideBar = () => {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const arrowClickHandler = () => {
    sideBarRef.current!.className = 'cart-sidebar';
  };

  return (
    <div className="cart-sidebar" ref={sideBarRef}>
      <h2 className="cart-sidebar__title">
        <i className="fa-solid fa-chevron-left" onClick={arrowClickHandler}></i>
        Cart
      </h2>
      <div className="cart-sidebar__products-list">{<Product />}</div>
      <p className="cart-sidebar__total-price">
        Subtotal
        <br />
        <span className="total-price">$46.00</span>
      </p>
      <Link to="/cart" className="cart-sidebar__button">
        View Cart
      </Link>
    </div>
  );
};

export default CartSideBar;
