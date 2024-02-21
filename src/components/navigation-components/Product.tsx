import React from 'react';
import { Link } from 'react-router-dom';

import './Product.scss';

const Product: React.FC = () => {
  return (
    <div className="product">
      <Link to="/teas/hibicious-flower">
        <img src="./images/teas/teabag1.png" alt="herbs" />
      </Link>
      <div className="details">
        <h3 className="details__name">Hibicious Flower</h3>
        <p className="details__price">$7.00</p>
        <div className="details__input-number">
          <span>-</span>
          <input type="number" min={1} max={999} defaultValue={1} />
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
