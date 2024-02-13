import React, { useEffect, useState, useRef } from 'react';

import './GoUpButton.scss';

const GoUpButton: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550 && !isVisible) {
        setIsVisible(true);
      } else if (window.scrollY <= 550 && isVisible) {
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
      ref={divRef}
      className={`arrow-up${isVisible ? ' active' : ''}`}
      onClick={scrollUpHandler}
    >
      <img src="./images/arrow-up.svg" alt="arrow up" />
    </div>
  );
};

export default GoUpButton;
