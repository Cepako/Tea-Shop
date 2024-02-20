import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import './PopUp.scss';

const PopUp: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const { name, price, code, imgUrl } = useAppSelector((state) => state.popUp);

  const closePopUp = () => {
    const wrapperElement = document.querySelector('.wrapper') as HTMLDivElement;

    if (wrapperElement) {
      wrapperElement.style.display = 'none';
      setQuantity(1);
    }
  };

  return (
    <div className="wrapper">
      <div className="pop-up">
        <span className="pop-up__close" onClick={closePopUp}>
          x
        </span>
        <img src={imgUrl} alt="tea bag" />
        <div className="details">
          <h3 className="details__name">{name}</h3>
          <p className="details__price">${price}</p>
          <p className="details__code">{code}</p>
          <form>
            <label htmlFor="size">Size</label>
            <select name="size" id="size">
              <option value="250Gr">250Gr</option>
            </select>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </form>
          <button>Add to Cart</button>
          <Link to="/teas/chamomile-tea">View More Details</Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
