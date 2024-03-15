import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.scss';
import Modal, { ModalMethods } from '../Modal';

const Menu: React.FC = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [barStatus, setBarsStatus] = useState('burger__bar unclicked');
  const [menuStatus, setMenuStatus] = useState('menu');

  const dialog = useRef<ModalMethods>(null);

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

  useEffect(() => {
    body.style.overflow = 'auto';
  }, []);

  return (
    <>
      <Modal ref={dialog}>
        <h2>I will add this function in the near future</h2>
        <p>Please be patient</p>
      </Modal>
      <div className='burger' onClick={handleBurgerClick}>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
        <div className={barStatus}></div>
      </div>
      <div className={menuStatus}>
        <p className='log-in' onClick={() => dialog.current?.open()}>
          <img src='/images/user-icon.svg' alt='user icon' />
          Log In
        </p>
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
