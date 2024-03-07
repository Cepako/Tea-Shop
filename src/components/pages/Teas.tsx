import React from 'react';
import Header from './tea-details-components/Header';
import Filters from './teas-page-components/Filters';
import TeaProducts from './teas-page-components/TeaProducts';

import './Teas.scss';

const Teas: React.FC = () => {
  return (
    <div className='teas-page'>
      <Header />
      <Filters />
      <TeaProducts />
    </div>
  );
};

export default Teas;
