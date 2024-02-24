import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';

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

  let productLink = name.replace('& ', '').replace(/\s+/g, '-').toLowerCase();
  console.log(productLink);

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
      <Link to={`/teas/${productLink}`}>
        <img
          className="card__img"
          src={over ? hoverImg : defaultImg}
          alt={over ? 'herbs' : 'teabag'}
        />
      </Link>
      <Link to={`/teas/${productLink}`}>
        <h3 className="card__name">{name}</h3>
      </Link>
      <Link to={`/teas/${productLink}`}>
        <p className="card__price">{`$${price}`}</p>
      </Link>
      <p className="card__view" onClick={quickView}>
        Quick View
      </p>
    </div>
  );
};

export default Card;
