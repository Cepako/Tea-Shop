import React from 'react';

import './Card.scss';

import CardModel from './card.model';

const Card: React.FC<CardModel> = ({ img, name, price }) => {
  return (
    <div className="card">
      <img className="card__img" src={img} alt="teabag" />
      <h3 className="card__name">{name}</h3>
      <p className="card__price">{`$${price}`}</p>
    </div>
  );
};

export default Card;
