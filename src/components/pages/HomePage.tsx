import React from 'react';

import Welcome from './home-page-components/Welcome';
import Arrivals from './home-page-components/Arrivals';
import ReadOurBlog from './home-page-components/ReadOurBlog';
import Info from './home-page-components/Info';

import './HomePage.scss';

const Page: React.FC = () => {
  return (
    <div className="home-page">
      <Welcome />
      <Arrivals />
      <ReadOurBlog />
      <Info />
    </div>
  );
};

export default Page;
