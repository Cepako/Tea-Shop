import React, { useEffect } from 'react';
import Filters from './products-page-components/Filters';
import Products from './products-page-components/Products';
import { useAppDispatch } from '../../redux/hooks';
import { editExtrasFilters } from '../../redux/filters';

import './Extras.scss';

const Extras: React.FC = () => {
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
  }, []);

  return (
    <div className='extras-page'>
      <div className='header'>
        <div className='header__image'>
          <h1>Shop Extras</h1>
        </div>
      </div>
      <div className='extras-page__filter-wrapper'>
        <Filters />
        <Products />
      </div>
    </div>
  );
};

export default Extras;
