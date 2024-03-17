import React from 'react';
import Header from './product-details-components/Header';
import ProductsList from './cart-page-components/ProductsList';
import OrderSummary from './cart-page-components/OrderSummary';
import EmptyCart from './cart-page-components/EmptyCart';
import { useAppSelector } from '../../redux/hooks';

import './CartPage.scss';

const CartPage: React.FC = () => {
  const products = useAppSelector((state) => state.cart);
  const cartPageView =
    products.length > 0 ? (
      <>
        <ProductsList />
        <OrderSummary />
      </>
    ) : (
      <EmptyCart />
    );

  return (
    <div className='cart-page'>
      <Header />
      <div className='cart-page__details'>{cartPageView}</div>
    </div>
  );
};

export default CartPage;
