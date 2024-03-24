import React from 'react';
import { Link } from 'react-router-dom';

import Slider from '../../slider/Slider';
import data from '../../../productsData';

import './Arrivals.scss';

const HOME_PAGE_DATA = data.slice(0, 4);

const Arrivals: React.FC = () => {
  return (
    <div className='new-arrivals'>
      <h2 className='new-arrivals__title'>New Arrivals</h2>
      <p className='new-arrivals__paragraph'>
        Our special teas for different life needs.
        <br /> Choose wisely.
      </p>
      <Slider removeArrowOnDeviceType={['desktop']} data={HOME_PAGE_DATA} />
      <Link to='/teas' className='new-arrivals__button'>
        Shop All
      </Link>
    </div>
  );
};

export default Arrivals;
