import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import SearchProduct from './SearchProduct';
import data from '../../data';

import './Search.scss';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  let productsList = data
    .filter((product) => {
      return searchValue.toLowerCase() === ''
        ? product
        : product.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((product) => (
      <SearchProduct
        key={product.code}
        link={product.link}
        name={product.name}
        product_img={product.product_img}
        setSearchValue={setSearchValue}
      />
    ));
  const hangleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setInputFocus(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='search'>
      <label htmlFor='search'>
        <input
          id='search'
          name='search'
          type='text'
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onChange={(e) => hangleInputChange(e)}
          value={searchValue}
          placeholder='Search...'
        />
        <div
          className={searchValue && inputFocus ? 'remove active' : 'remove'}
          onClick={() => setSearchValue('')}
        >
          X
        </div>
        <img src='./images/loupe-icon.svg' alt='loupe' />
      </label>
      <div
        className={
          inputFocus && productsList.length > 0
            ? 'search__products active'
            : 'search__products'
        }
      >
        <h2>
          {searchValue && productsList.length > 0
            ? 'Products'
            : 'Trending Products'}
        </h2>
        <div className='products'>{productsList}</div>
      </div>
    </div>
  );
};

export default Search;
