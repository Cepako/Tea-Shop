import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
}) => {
  const [over, setOver] = useState(false);

  const dispatch = useAppDispatch();

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
      product_img,
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
      className="card"
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => {
        setOver(false);
      }}
    >
      <Link to={`/teas/${productLink}`} onClick={closeCart}>
        <img
          className="card__img"
          src={over ? hover_img : product_img}
          alt={over ? 'herbs' : 'teabag'}
        />
      </Link>
      <Link to={`/teas/${productLink}`} onClick={closeCart}>
        <h3 className="card__name">{name}</h3>
      </Link>
      <Link to={`/teas/${productLink}`} onClick={closeCart}>
        <p className="card__price">{`$${price}`}</p>
      </Link>
      <p className="card__view" onClick={quickView}>
        Quick View
      </p>
    </div>
  );
};

export default Card;