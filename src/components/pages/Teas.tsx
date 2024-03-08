import React, { useEffect } from 'react';
import Header from './tea-details-components/Header';
import Filters from './teas-page-components/Filters';
import TeaProducts from './teas-page-components/TeaProducts';
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
      <Filters />
      <TeaProducts />
    </div>
  );
};

export default Teas;
