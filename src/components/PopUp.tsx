import React from 'react';
import { Link } from 'react-router-dom';

import './PopUp.scss';

const PopUp = () => {
  return (
    <div className="wrapper">
      <div className="pop-up">
        <span className="pop-up__close">x</span>
        <img src="./images/teas/teabag1.png" alt="tea bag" />
        <div className="details">
          <h3 className="details__name">Hibicious Flower</h3>
          <p className="details__price">$8.00</p>
          <p className="details__code">SKU: 0003</p>
          <form>
            <label htmlFor="size">Size</label>
            <select name="size" id="size">
              <option value="250Gr">250Gr</option>
            </select>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" min={1} defaultValue={1} />
          </form>
          <button>Add to Cart</button>
          <Link to="/teas/chamomile-tea">View More Details</Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
