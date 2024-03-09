import React, { MouseEvent } from 'react';
import data from '../../../data';
import Card from '../../slider/Card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addToCart } from '../../../redux/cart';

import './TeaProducts.scss';

const TeaProducts: React.FC = () => {
  const filters = useAppSelector((state) => state.filter);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCartHandler = (
    e: MouseEvent,
    product_img: string,
    name: string,
    price: string,
    code: string,
    size: string
  ) => {
    const payload = {
      name,
      price,
      code,
      size,
      product_img,
      quantity: 1,
    };
    dispatch(addToCart(payload));
    if (window.innerWidth < 1024) navigate('/cart');
    else {
      const cartSideBar = document.querySelector(
        '.cart-sidebar'
      ) as HTMLDivElement;
      if (cartSideBar) cartSideBar.classList.add('active');
    }
    e.stopPropagation();
  };

  const productsList = data
    .filter((product) => {
      if (
        filters.collection !== 'all' &&
        product.collection !== filters.collection
      ) {
        return false;
      }
      if (
        Number(product.price) < filters.price[0] ||
        Number(product.price) > filters.price[1]
      ) {
        return false;
      }

      if (filters.size.length > 0 && !filters.size.includes(product.size)) {
        return false;
      }
      return true;
    })
    .map((product) => (
      <div key={product.name}>
        <Card
          product_img={product.product_img}
          hover_img={product.hover_img}
          name={product.name}
          price={product.price}
          code={product.code}
          size={product.size}
        />
        <button
          onClick={(e) =>
            addToCartHandler(
              e as MouseEvent<HTMLButtonElement>,
              product.product_img,
              product.name,
              product.price,
              product.code,
              product.size
            )
          }
        >
          Add to Cart
        </button>
      </div>
    ));

  const noResults = (
    <h2 className='no-results'>
      No items matched your search criteria. Try widening your search.
    </h2>
  );

  return (
    <div className='tea-products'>
      {productsList.length > 0 ? productsList : noResults}
    </div>
  );
};

export default TeaProducts;
