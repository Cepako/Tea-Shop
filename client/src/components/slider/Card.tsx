import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { editPopUp } from '../../redux/popUp';

import './Card.scss';

import CardModel from './card.model';

const Card: React.FC<CardModel> = ({
  product_img,
  hover_img,
  name,
  price,
  code,
  size,
  color,
}) => {
  const [over, setOver] = useState(false);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const redirectHandle = () => {
    if (size === undefined) {
      navigate(`/extras/${productLink}`, {
        state: { prevPath: location.pathname === '/' ? '/' : '/extras' },
      });
    } else {
      navigate(`/teas/${productLink}`, {
        state: { prevPath: location.pathname === '/' ? '/' : '/teas' },
      });
    }

    closeCart();
  };

  const quickView = () => {
    const wrapperElement = document.querySelector('.wrapper') as HTMLDivElement;
    const cartSideBar = document.querySelector(
      '.cart-sidebar'
    ) as HTMLDivElement;
    if (cartSideBar) cartSideBar.className = 'cart-sidebar';
    const payload = {
      name,
      price,
      code,
      size,
      color,
      product_img,
      hover_img,
    };
    dispatch(editPopUp(payload));

    if (wrapperElement) {
      wrapperElement.style.display = 'block';
    }
  };
  const closeCart = () => {
    const cartSideBar = document.querySelector(
      '.cart-sidebar'
    ) as HTMLDivElement;
    if (cartSideBar) cartSideBar.className = 'cart-sidebar';
  };

  let productLink = name.replace('& ', '').replace(/\s+/g, '-').toLowerCase();

  return (
    <div
      className='card'
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => {
        setOver(false);
      }}
    >
      <img
        onClick={redirectHandle}
        className='card__img'
        src={over ? hover_img : product_img}
        alt={over ? 'herbs' : 'teabag'}
      />

      <h3 className='card__name' onClick={redirectHandle}>
        {name}
      </h3>

      <p className='card__price' onClick={redirectHandle}>{`$${Number(
        price
      ).toFixed(2)}`}</p>

      <p className='card__view' onClick={quickView}>
        Quick View
      </p>
    </div>
  );
};

export default Card;
