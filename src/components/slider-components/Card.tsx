import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';

import './Card.scss';

import CardModel from './card.model';
import { editPopUp } from '../../redux/popUp';

const Card: React.FC<CardModel> = ({
  defaultImg,
  hoverImg,
  name,
  price,
  code,
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
      imgUrl: defaultImg,
    };
    dispatch(editPopUp(payload));

    if (wrapperElement) {
      wrapperElement.style.display = 'block';
    }
  };

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
      <img
        className="card__img"
        src={over ? hoverImg : defaultImg}
        alt={over ? 'herbs' : 'teabag'}
      />
      <h3 className="card__name">{name}</h3>
      <p className="card__price">{`$${price}`}</p>
      <p className="card__view" onClick={quickView}>
        Quick View
      </p>
    </div>
  );
};

export default Card;
