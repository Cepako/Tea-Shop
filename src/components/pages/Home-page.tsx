import React from 'react';

import Welcome from './home-page-components/Welcome';
import Arrivals from './home-page-components/Arrivals';

import './Home-page.scss';

const Page: React.FC = () => {
  return (
    <div className="home-page">
      <Welcome />
      <Arrivals />
    </div>
  );
};

export default Page;
