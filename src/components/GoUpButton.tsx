import React, { useEffect, useState } from 'react';
import arrowUp from '../assets/arrow-up-white.svg';

import './GoUpButton.scss';

const GoUpButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600 && !isVisible) {
        setIsVisible(true);
      } else if (window.scrollY <= 600 && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const scrollUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`arrow-up${isVisible ? ' active' : ''}`}
      onClick={scrollUpHandler}
    >
      <img src={arrowUp} alt='arrow up' />
    </div>
  );
};

export default GoUpButton;
