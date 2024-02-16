import React, { useState } from 'react';

import './Card.scss';

import CardModel from './card.model';

const Card: React.FC<CardModel> = ({ defaultImg, hoverImg, name, price }) => {
  const [over, setOver] = useState(false);

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
      <p className="card__view">Quick View</p>
    </div>
  );
};

export default Card;
