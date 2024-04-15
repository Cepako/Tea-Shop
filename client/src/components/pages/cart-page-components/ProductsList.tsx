import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import CartProduct from './CartProduct';
import PromoCode from './PromoCode';
import Note from './Note';

import './ProductsList.scss';

const ProductsList: React.FC = () => {
  const products = useAppSelector((state) => state.cart);
  const productsList = products.map((product) => {
    const key = product.code + product.color;
    return (
      <CartProduct
        key={key}
        name={product.name}
        price={product.price}
        code={product.code}
        size={product.size}
        color={product.color}
        quantity={product.quantity}
        product_img={product.product_img}
      />
    );
  });

  return (
    <div className='products-list'>
      <h3>My cart</h3>
      <div className='products-list__products'>{productsList}</div>
      <PromoCode />
      <Note />
    </div>
  );
};

export default ProductsList;
