import React from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchProduct.scss';

interface SearchProductModel {
  link: string;
  product_img: string;
  name: string;
  setSearchValue: (value: string) => void;
}

const SearchProduct: React.FC<SearchProductModel> = ({
  link,
  product_img,
  name,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    setSearchValue('');
    navigate(`/teas/${link}`);
  };

  return (
    <div className='search-product' onClick={handleProductClick}>
      <img src={product_img} alt='tea bag' />
      <div className='search-product__description'>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default SearchProduct;