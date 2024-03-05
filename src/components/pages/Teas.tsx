import React from 'react';
import Header from './tea-details-components/Header';
import Filters from './teas-page-components/Filters';

import './Teas.scss';

const Teas: React.FC = () => {
  return (
    <div className='teas-page'>
      <Header />
      <Filters />
    </div>
  );
};

export default Teas;
