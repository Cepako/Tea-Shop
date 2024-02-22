import React from 'react';
import { Link } from 'react-router-dom';

import './Welcome.scss';

const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <div className="background-image">
        <h1 className="header">
          <span>It's Always Tea Time</span>
          <br></br>
          <span>With Bloom's Herbal Tea</span>
        </h1>
        <Link to="/teas" className="shop-now-button">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
