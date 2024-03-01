import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import CartProduct from './CartProduct';
import PromoCode from './PromoCode';

import './ProductsList.scss';

const ProductsList: React.FC = () => {
  const products = useAppSelector((state) => state.cart);
  const productsList = products.map((product) => (
    <CartProduct
      key={product.code}
      name={product.name}
      price={product.price}
      code={product.code}
      size={product.size}
      quantity={product.quantity}
      product_img={product.product_img}
    />
  ));

  return (
    <div className='products-list'>
      <h3>My cart</h3>
      <div className='products-list__products'>{productsList}</div>
      <PromoCode />
    </div>
  );
};

export default ProductsList;
