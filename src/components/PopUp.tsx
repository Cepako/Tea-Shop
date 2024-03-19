import React, { MouseEvent, ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/cart';
import ColorInputs from './pages/product-details-components/ColorInputs';
import ImageChoser from './pages/product-details-components/ImageChoser';

import './PopUp.scss';

const PopUp: React.FC = () => {
  const [popUpQuantity, setPopUpQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);

  const { name, price, code, size, color, product_img, hover_img } =
    useAppSelector((state) => state.popUp);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const closePopUp = () => {
    const wrapperElement = document.querySelector('.wrapper') as HTMLDivElement;

    if (wrapperElement) {
      wrapperElement.style.display = 'none';
      setPopUpQuantity(1);
      setSelectedColor('');
      setDisplayWarning(false);
    }
  };

  const addToCartHandler = (e: MouseEvent) => {
    const afterAdd = () => {
      const cartSideBar = document.querySelector(
        '.cart-sidebar'
      ) as HTMLDivElement;
      if (cartSideBar) cartSideBar.classList.add('active');
      closePopUp();
      e.stopPropagation();
    };
    if (size !== undefined || color![0] === undefined) {
      const payload = {
        name,
        price,
        code,
        size,
        product_img,
        quantity: popUpQuantity,
      };
      dispatch(addToCart(payload));
      afterAdd();
    } else {
      if (selectedColor === '') {
        setDisplayWarning(true);
      } else {
        const payload = {
          name,
          price,
          code,
          color: selectedColor,
          product_img: selectedColor === color![0] ? product_img : hover_img,
          quantity: popUpQuantity,
        };
        dispatch(addToCart(payload));
        afterAdd();
      }
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) setPopUpQuantity(1);
    else if (Number(e.target.value) > 999) setPopUpQuantity(999);
    else setPopUpQuantity(Number(e.target.value));
  };

  const linkClickHandler = () => {
    closePopUp();
    if (size === undefined) {
      navigate(`/extras/${productLink}`, {
        state: { prevPath: location.pathname === '/' ? '/' : '/extras' },
      });
    } else {
      navigate(`/teas/${productLink}`, {
        state: { prevPath: location.pathname === '/' ? '/' : '/teas' },
      });
    }
  };

  const productLink = name.replace('& ', '').replace(/\s+/g, '-').toLowerCase();

  const handleRadioChange = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('');
    } else {
      setSelectedColor(color);
      setDisplayWarning(false);
    }
  };

  return (
    <div className='wrapper'>
      {size !== undefined || color !== undefined ? (
        <div className='pop-up'>
          <span className='pop-up__close' onClick={closePopUp}>
            x
          </span>
          {size === undefined && color![0] ? (
            <ImageChoser
              key={product_img}
              product_img={product_img}
              hover_img={hover_img}
              name={name}
              selectedColor={selectedColor}
              firstColor={color![0]}
            />
          ) : (
            <img src={product_img} alt='tea bag' />
          )}

          <div className='details'>
            <h3 className='details__name'>{name}</h3>
            <p className='details__price'>${price}</p>
            <p className='details__code'>{code}</p>
            <form>
              {size === undefined ? (
                color![0] && (
                  <ColorInputs
                    firstColor={color![0]}
                    secondColor={color![1]}
                    selectedColor={selectedColor}
                    handleRadioChange={handleRadioChange}
                    displayWarning={displayWarning}
                    firstLabel='popUp-first-color'
                    secondLabel='popUp-second-color'
                  />
                )
              ) : (
                <>
                  <label htmlFor='size'>Size</label>
                  <select name='size' id='size'>
                    <option value={size}>{size}</option>
                  </select>
                </>
              )}
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='number'
                id='quantity'
                value={popUpQuantity}
                onChange={inputHandler}
              />
            </form>
            <button onClick={addToCartHandler}>Add to Cart</button>
            <span onClick={linkClickHandler}>View More Details</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopUp;
