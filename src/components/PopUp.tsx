import React, { MouseEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/cart';

import './PopUp.scss';

const PopUp: React.FC = () => {
  const [popUpQuantity, setPopUpQuantity] = useState(1);

  const { name, price, code, imgUrl } = useAppSelector((state) => state.popUp);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const closePopUp = () => {
    const wrapperElement = document.querySelector('.wrapper') as HTMLDivElement;

    if (wrapperElement) {
      wrapperElement.style.display = 'none';
      setPopUpQuantity(1);
    }
  };
  const addToCartHandler = (e: MouseEvent) => {
    const payload = {
      name,
      price,
      code,
      imgUrl,
      quantity: popUpQuantity,
    };
    dispatch(addToCart(payload));
    const cartSideBar = document.querySelector(
      '.cart-sidebar'
    ) as HTMLDivElement;
    if (cartSideBar) cartSideBar.classList.add('active');
    closePopUp();
    e.stopPropagation();
  };
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) setPopUpQuantity(1);
    else if (Number(e.target.value) > 999) setPopUpQuantity(999);
    else setPopUpQuantity(Number(e.target.value));
  };

  const linkClickHandler = () => {
    closePopUp();
    navigate(`/teas/${productLink}`);
  };

  const productLink = name.replace('& ', '').replace(/\s+/g, '-').toLowerCase();

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
              value={popUpQuantity}
              onChange={inputHandler}
            />
          </form>
          <button onClick={addToCartHandler}>Add to Cart</button>
          <span onClick={linkClickHandler}>View More Details</span>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
