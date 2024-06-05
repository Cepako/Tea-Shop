import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import userIcon from '../../assets/user-icon.svg';

import './Menu.scss';

const Menu: React.FC = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [barStatus, setBarsStatus] = useState('burger__bar unclicked');
  const [menuStatus, setMenuStatus] = useState('menu');

  const body = document.querySelector('body')! as HTMLBodyElement;

  const handleBurgerClick = () => {
    setIsMenuClicked((prevValue) => !prevValue);
    const newMennuClickedValue = !isMenuClicked;
    if (newMennuClickedValue) {
      setBarsStatus('burger__bar clicked');
      setMenuStatus('menu active');
      body.style.overflow = 'hidden';
    } else closeMenu();
  };

  const closeMenu = () => {
    setBarsStatus('burger__bar unclicked');
    setMenuStatus('menu');
    body.style.overflow = 'auto';
  };

  return (
    <>
      <div className='burger' onClick={handleBurgerClick}>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
      </div>
      <div className={menuStatus}>
        <Link to='/login' className='log-in' onClick={closeMenu}>
          <img src={userIcon} alt='user icon' />
          Log In
        </Link>
        <ul className='list'>
          <li className='list__item'>
            <NavLink to='/teas' onClick={closeMenu}>
              Teas
            </NavLink>
          </li>
          <li className='list__item'>
            <NavLink to='/extras' onClick={closeMenu}>
              Extras
            </NavLink>
          </li>
          <li className='list__item'>
            <NavLink to='/about' onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li className='list__item'>
            <NavLink to='/blog' onClick={closeMenu}>
              Blog
            </NavLink>
          </li>
          <li className='list__item'>
            <NavLink to='/contact' onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
