import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import Product from './Product';

import './CartSideBar.scss';

const CartSideBar: React.FC = () => {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const arrowClickHandler = () => {
    sideBarRef.current!.className = 'cart-sidebar';
  };

  const products = useAppSelector((state) => state.cart);

  let totalPrice = 0;

  const productsList = products.map((product) => {
    totalPrice += Number(product.price) * product.quantity!;
    return (
      <Product
        key={product.code}
        name={product.name}
        price={product.price}
        code={product.code}
        imgUrl={product.imgUrl}
        quantity={product.quantity}
      />
    );
  });

  const cartNotEmpty = (
    <>
      <div className="cart-sidebar__products-list">{productsList}</div>
      <p className="cart-sidebar__total-price">
        Subtotal
        <br />
        <span className="total-price">${totalPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart" className="cart-sidebar__button">
        View Cart
      </Link>
    </>
  );

  const cartEmpty = <h3>Cart is empty</h3>;

  return (
    <div className="cart-sidebar" ref={sideBarRef}>
      <h2 className="cart-sidebar__title">
        <i className="fa-solid fa-chevron-left" onClick={arrowClickHandler}></i>
        Cart
      </h2>
      {products.length > 0 ? cartNotEmpty : cartEmpty}
    </div>
  );
};

export default CartSideBar;
