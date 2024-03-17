import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import Product from './Product';

import './CartSideBar.scss';

const CartSideBar: React.FC = () => {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const products = useAppSelector((state) => state.cart);

  let totalPrice = 0;

  const productsList = products.map((product) => {
    totalPrice += Number(product.price) * product.quantity!;
    return (
      <Product
        key={product.code + product.color}
        name={product.name}
        price={product.price}
        code={product.code}
        color={product.color}
        product_img={product.product_img}
        quantity={product.quantity}
      />
    );
  });
  const closeCart = () => {
    if (sideBarRef) sideBarRef.current!.className = 'cart-sidebar';
  };

  const cartNotEmpty = (
    <>
      <div className='cart-sidebar__products-list'>{productsList}</div>
      <p className='cart-sidebar__total-price'>
        Subtotal
        <br />
        <span className='total-price'>${totalPrice.toFixed(2)}</span>
      </p>
      <Link to='/cart' className='cart-sidebar__button' onClick={closeCart}>
        View Cart
      </Link>
    </>
  );

  const cartEmpty = <h3>Cart is empty</h3>;

  return (
    <div className='cart-sidebar' ref={sideBarRef}>
      <h2 className='cart-sidebar__title'>
        <i className='fa-solid fa-chevron-left' onClick={closeCart}></i>
        Cart
      </h2>
      {products.length > 0 ? cartNotEmpty : cartEmpty}
    </div>
  );
};

export default CartSideBar;
