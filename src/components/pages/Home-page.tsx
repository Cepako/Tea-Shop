import React from 'react';

import Welcome from './home-page-components/Welcome';

import './Home-page.scss';

const Page: React.FC = () => {
  return (
    <div className="home-page">
      <Welcome />
    </div>
  );
};

export default Page;
