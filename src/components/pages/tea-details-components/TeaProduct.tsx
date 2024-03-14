import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { addToCart } from '../../../redux/cart';

import './TeaProduct.scss';

interface TPInterface {
  name: string;
  price: string;
  code: string;
  size: string;
  product_img: string;
  product_description: string;
}

const TeaProduct: React.FC<TPInterface> = ({
  name,
  price,
  code,
  size,
  product_img,
  product_description,
}) => {
  const [teaQuantity, setTeaQuantity] = useState(1);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const addToCartHandler = (e: MouseEvent) => {
    const payload = {
      name,
      price,
      code,
      size,
      product_img,
      quantity: teaQuantity,
    };
    dispatch(addToCart(payload));
    if (window.innerWidth < 1024) navigate('/cart');
    else {
      const cartSideBar = document.querySelector(
        '.cart-sidebar'
      ) as HTMLDivElement;
      if (cartSideBar) cartSideBar.classList.add('active');
    }
    e.stopPropagation();
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) setTeaQuantity(1);
    else if (Number(e.target.value) > 999) setTeaQuantity(999);
    else setTeaQuantity(Number(e.target.value));
  };

  let description = '';

  for (let i = 0; i < product_description.length / 2 + 1; i++)
    description += product_description[i];

  const breadCrumbs =
    location.state.prevPath === '/' ? (
      <p className='tea-product__breadcrumbs'>
        <Link to='/'>Home</Link> / {name}
      </p>
    ) : (
      <p className='tea-product__breadcrumbs'>
        <Link to='/'>Home</Link> / <Link to='/teas'>Teas</Link> / {name}
      </p>
    );

  return (
    <div className='tea-product'>
      {breadCrumbs}
      <img className='tea-product__image' src={product_img} alt='tea bag' />
      <div className='description'>
        <h2 className='description__name'>{name}</h2>
        <p className='description__price'>${price}</p>
        <form>
          <label htmlFor='size'>Size</label>
          <select name='size' id='size'>
            <option value={size}>{size}</option>
          </select>
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            id='quantity'
            value={teaQuantity}
            onChange={inputHandler}
          />
        </form>
        <button className='add-to-cart' onClick={addToCartHandler}>
          Add to Cart
        </button>
        <button className='buy-now'>Buy Now</button>
        <p className='short-description'>
          {descriptionVisible ? product_description : description}
        </p>
        <span onClick={() => setDescriptionVisible(!descriptionVisible)}>
          {descriptionVisible ? 'Less' : 'Read more'}
        </span>
      </div>
    </div>
  );
};

export default TeaProduct;
