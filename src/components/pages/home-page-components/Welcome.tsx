import React from 'react';

import Navigation from '../../Navigation';

import './Welcome.scss';

const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <Navigation />
      <div className="background-image">
        <h1 className="header">
          <span>It's Always Tea Time</span>
          <br></br>
          <span>With Bloom's Herbal Tea</span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
