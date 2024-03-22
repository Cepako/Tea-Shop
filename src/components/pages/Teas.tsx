import React, { useEffect } from 'react';
import Header from './product-details-components/Header';
import Filters from './products-page-components/Filters';
import Products from './products-page-components/Products';
import { useAppDispatch } from '../../redux/hooks';
import { editTeasFilters } from '../../redux/filters';

import './Teas.scss';

const Teas: React.FC = () => {
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
  }, []);
  return (
    <div className='teas-page'>
      <Header />
      <div className='teas-page__filter-wrapper'>
        <Filters />
        <Products />
      </div>
    </div>
  );
};

export default Teas;
