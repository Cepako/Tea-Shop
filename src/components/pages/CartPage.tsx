import React from 'react';
import Header from './tea-details-components/Header';
import ProductsList from './cart-page-components/ProductsList';
import OrderSummary from './cart-page-components/OrderSummary';

import './CartPage.scss';

const CartPage: React.FC = () => {
  return (
    <div className='cart-page'>
      <Header />
      <div className='cart-page__details'>
        <ProductsList />
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartPage;
