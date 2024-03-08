import React from 'react';
import data from '../../../data';
import Card from '../../slider/Card';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

import './TeaProducts.scss';

const TeaProducts: React.FC = () => {
  const filters = useAppSelector((state) => state.filter);

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
        <button>
          <Link to={'/teas/' + product.link}>Add to Cart</Link>
        </button>
      </div>
    ));

  return <div className='tea-products'>{productsList}</div>;
};

export default TeaProducts;
