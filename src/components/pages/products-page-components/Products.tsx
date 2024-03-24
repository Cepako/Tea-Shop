import React, { MouseEvent } from 'react';
import data from '../../../productsData';
import Card from '../../slider/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addToCart } from '../../../redux/cart';

import './Products.scss';

const Products: React.FC = () => {
  const filters = useAppSelector((state) => state.filter);

  const location = useLocation();
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

  const productsList =
    location.pathname === '/extras'
      ? data
          .filter((product) => product.collection === 'extras')
          .filter((product) => {
            if (
              Number(product.price) < filters.extras.price[0] ||
              Number(product.price) > filters.extras.price[1]
            ) {
              return false;
            }

            if (
              filters.extras.color.length > 0 &&
              !(
                filters.extras.color.includes(product.color![0]) ||
                filters.extras.color.includes(product.color![1])
              )
            ) {
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
                color={product.color}
              />
              <button
                onClick={() => {
                  navigate(`/extras/${product.link}`, {
                    state: { prevPath: '/extras' },
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
      : data
          .filter((product) => product.collection !== 'extras')
          .filter((product) => {
            if (
              filters.teas.collection !== 'all' &&
              product.collection !== filters.teas.collection
            ) {
              return false;
            }
            if (
              Number(product.price) < filters.teas.price[0] ||
              Number(product.price) > filters.teas.price[1]
            ) {
              return false;
            }

            if (
              filters.teas.size.length > 0 &&
              !filters.teas.size.includes(product.size!)
            ) {
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
                    product.size!
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

export default Products;
