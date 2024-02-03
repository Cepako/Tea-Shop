import React, { useState } from 'react';

import './Menu.scss';

const Menu: React.FC = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [barStatus, setBarsStatus] = useState('burger__bar unclicked');
  const [menuStatus, setMenuStatus] = useState('menu');

  const body = document.querySelector('body')! as HTMLBodyElement;

  const handleBurgerClick = () => {
    setIsMenuClicked((prevValue) => !prevValue);
    if (isMenuClicked) {
      setBarsStatus('burger__bar clicked');
      setMenuStatus('menu active');
      body.style.overflow = 'hidden';
    } else {
      setBarsStatus('burger__bar unclicked');
      setMenuStatus('menu');
      body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <div className="burger" onClick={handleBurgerClick}>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
      </div>
      <div className={menuStatus}>
        <p className="log-in">
          <img src="./images/user-icon.svg" alt="user icon" />
          Log In
        </p>
        <ul>
          <li>Teas</li>
          <li>Extras</li>
          <li>About</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
