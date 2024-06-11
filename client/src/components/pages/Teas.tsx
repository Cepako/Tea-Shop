import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';

import Header from './product-details-components/Header';
import Filters from './filter-components/Filters';
import Products from './products-page-components/Products';
import { useAppDispatch } from '../../redux/hooks';
import { editTeasFilters } from '../../redux/filters';

import './Teas.scss';

const Teas: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialPayload: {
      collection: string;
      price: [number, number];
      size: string[];
    } = {
      collection: 'all',
      price: [5, 15],
      size: [],
    };
    dispatch(editTeasFilters(initialPayload));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const fetchProds = async () => {
      try {
        const response = await fetch('http://localhost:8080/shop/teas');
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
    <div className='teas-page'>
      <Header />
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
        <div className='teas-page__filter-wrapper'>
          <Filters />
          <Products data={products} />
        </div>
      )}
      {isError && <p className='error'>{isError}</p>}
    </div>
  );
};

export default Teas;
