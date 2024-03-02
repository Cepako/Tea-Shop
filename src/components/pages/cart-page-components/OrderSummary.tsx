import React from 'react';
import { useAppSelector } from '../../../redux/hooks';

import './OrderSummary.scss';

const OrderSummary: React.FC = () => {
  const viewHeader = window.innerWidth > 786;

  const cart = useAppSelector((state) => state.cart);
  let totalPrice = 0;
  cart.map(
    (product) => (totalPrice += Number(product.price) * product.quantity!)
  );

  return (
    <div className='order-summary'>
      {viewHeader && <h3>Order summary</h3>}
      <div>
        <p className='subtotal'>
          Subtotal{' '}
          <span className='subtotal__price'>${totalPrice.toFixed(2)}</span>
        </p>
        <p className='delivery'>Estimate Delivery</p>
      </div>
      <p className='total'>
        Total <span className='total__price'>${totalPrice.toFixed(2)}</span>
      </p>
      <button className='checkout'>Checkout</button>
      <p className='secure'>
        <img src='./images/lock-icon.svg' alt='lock' />
        Secure Checkout
      </p>
    </div>
  );
};

export default OrderSummary;
