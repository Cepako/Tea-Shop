import React, { useRef } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import Modal, { ModalMethods } from '../../Modal';
import lockIcon from '../../../assets/lock-icon.svg';

import './OrderSummary.scss';

const OrderSummary: React.FC = () => {
  const dialog = useRef<ModalMethods>(null);

  const viewHeader = window.innerWidth >= 768;

  const cart = useAppSelector((state) => state.cart);
  let totalPrice = 0;
  cart.map(
    (product) => (totalPrice += Number(product.price) * product.quantity!)
  );

  return (
    <div className='order-summary'>
      {viewHeader && <h3>Order summary</h3>}
      <div>
        <Modal ref={dialog} closeButtonValue='Got it'>
          <h2>We can't accept online orders right now</h2>
          <p>Please contact us to complete your purchase.</p>
        </Modal>
        <p className='subtotal'>
          Subtotal{' '}
          <span className='subtotal__price'>${totalPrice.toFixed(2)}</span>
        </p>
        <p className='delivery'>Estimate Delivery</p>
      </div>
      <p className='total'>
        Total <span className='total__price'>${totalPrice.toFixed(2)}</span>
      </p>
      <button className='checkout' onClick={() => dialog.current?.open()}>
        Checkout
      </button>
      <p className='secure'>
        <img src={lockIcon} alt='lock' />
        Secure Checkout
      </p>
    </div>
  );
};

export default OrderSummary;
