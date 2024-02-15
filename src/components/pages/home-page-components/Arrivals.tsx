import React from 'react';
import { Link } from 'react-router-dom';

import Slider from '../../Slider';
import { homePageData, responsive } from './home-page-slider-data';

import './Arrivals.scss';

const Arrivals: React.FC = () => {
  return (
    <div className="new-arrivals">
      <h2 className="new-arrivals__title">New Arrivals</h2>
      <p className="new-arrivals__paragraph">
        Our special teas for different life needs.
        <br /> Choose wisely.
      </p>
      <Slider
        removeArrowOnDeviceType={['desktop']}
        responsive={responsive}
        data={homePageData}
      />
      <Link to="/teas" className="new-arrivals__button">
        Shop All
      </Link>
    </div>
  );
};

export default Arrivals;
