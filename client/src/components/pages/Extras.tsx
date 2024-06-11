import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Filters from './filter-components/Filters';
import Products from './products-page-components/Products';
import { useAppDispatch } from '../../redux/hooks';
import { editExtrasFilters } from '../../redux/filters';

import './Extras.scss';

const Extras: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialPayload: {
      price: [number, number];
      color: string[];
    } = {
      price: [2, 20],
      color: [],
    };
    dispatch(editExtrasFilters(initialPayload));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const fetchProds = async () => {
      try {
        const response = await fetch('http://localhost:8080/shop/extras');
        if (!response.ok) {
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Fetch error:', err);
        setIsError('Failed to fetch products. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProds();
  }, []);

  return (
    <div className='extras-page'>
      <div className='header'>
        <div className='header__image'>
          <h1>Shop Extras</h1>
        </div>
      </div>
      <TailSpin
        visible={isLoading}
        height='80'
        width='80'
        color='#242a35'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass='spinner'
      />
      {!isError && !isLoading && (
        <div className='extras-page__filter-wrapper'>
          <Filters />
          <Products data={products} />
        </div>
      )}
      {isError && <p className='error'>{isError}</p>}
    </div>
  );
};

export default Extras;
