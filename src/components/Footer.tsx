import React from 'react';
import arrowUp from '../assets/arrow-up-black.svg';

import './Footer.scss';

const Footer: React.FC = () => {
  const scrollUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='footer'>
      &copy;2024 Sebastian Dragan
      <span onClick={scrollUpHandler}>
        <img src={arrowUp} alt='arrow up' /> Back to top
      </span>
    </div>
  );
};

export default Footer;
