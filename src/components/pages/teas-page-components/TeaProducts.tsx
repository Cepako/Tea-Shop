import React from 'react';
import data from '../../../data';
import Card from '../../slider/Card';
import { Link } from 'react-router-dom';

import './TeaProducts.scss';

const TeaProducts: React.FC = () => {
  const productsList = data.map((product) => (
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
