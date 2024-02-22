import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductModel from './product.model';
import { useAppDispatch } from '../../redux/hooks';
import {
  decreaseQuantity,
  deleteFromCart,
  editCart,
  increaseQuantity,
} from '../../redux/cart';

import './Product.scss';

const Product: React.FC<ProductModel> = ({
  name,
  price,
  imgUrl,
  code,
  quantity,
}) => {
  const [over, setOver] = useState(false);

  const dispatch = useAppDispatch();

  const removeHandler = () => {
    dispatch(deleteFromCart(code));
  };

  const increaseHandler = () => {
    dispatch(increaseQuantity(code));
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantityValue = e.target.value === '' ? 1 : Number(e.target.value);

    const payload = {
      code,
      quantity: newQuantityValue > 999 ? 999 : newQuantityValue,
    };

    dispatch(editCart(payload));
  };

  const decreaseHandler = () => {
    dispatch(decreaseQuantity(code));
  };

  const productLink = name.replace(' ', '-').toLowerCase();

  return (
    <div
      className="product"
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => {
        setOver(false);
      }}
    >
      <div
        className={over ? 'product__remove active' : 'product__remove'}
        onClick={removeHandler}
      >
        x
      </div>
      <Link to={`/teas/${productLink}`}>
        <img src={imgUrl} alt="herbs" />
      </Link>
      <div className="details">
        <h3 className="details__name">{name}</h3>
        <p className="details__price">${price}</p>
        <div className="details__input-number">
          <span
            onClick={decreaseHandler}
            style={
              quantity === 1
                ? { color: 'gray', fontWeight: '300', cursor: 'default' }
                : {}
            }
          >
            -
          </span>
          <input type="number" value={quantity} onChange={inputHandler} />
          <span onClick={increaseHandler}>+</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
