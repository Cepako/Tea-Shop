import React from 'react';

import Slider from './Slider';

import './Arrivals.scss';

const Arrivals: React.FC = () => {
  return (
    <div className="new-arrivals">
      <h2 className="new-arrivals__title">New Arrivals</h2>
      <p className="new-arrivals__paragraph">
        Our special teas for different life needs. Choose wisely.
      </p>
      <Slider />
    </div>
  );
};

export default Arrivals;
