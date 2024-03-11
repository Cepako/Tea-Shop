import React from 'react';
import SearchProduct from './SearchProduct';
import data from '../../data';

import './Search.scss';

const Search: React.FC = () => {
  const productsList = data.map((product) => (
    <SearchProduct
      key={product.code}
      link={product.link}
      name={product.name}
      product_img={product.product_img}
    />
  ));

  return (
    <div className='search'>
      <label htmlFor='search'>
        <input id='search' name='search' type='text' placeholder='Search...' />
        <img src='./images/loupe-icon.svg' alt='' />
      </label>
      <div className='search__products'>
        <h2>Trending Products</h2>
        <div className='products'>{productsList}</div>
      </div>
    </div>
  );
};

export default Search;
