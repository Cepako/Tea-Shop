import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { addToCart } from '../../../redux/cart';
import Modal, { ModalMethods } from '../../Modal';
import ImageChoser from './ImageChoser';
import ColorInputs from './ColorInputs';
import Description from './Description';

import './Product.scss';

interface PInterface {
  name: string;
  price: string;
  code: string;
  size?: string;
  color?: string[];
  product_img: string;
  hover_img: string;
  product_description: string;
}

const Product: React.FC<PInterface> = ({
  name,
  price,
  code,
  size,
  color,
  product_img,
  hover_img,
  product_description,
}) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);

  const dialog = useRef<ModalMethods>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const type = size === undefined ? 'extras' : 'teas';

  const addToCartHandler = (e: MouseEvent) => {
    const afterAdd = () => {
      if (window.innerWidth < 1024) navigate('/cart');
      else {
        const cartSideBar = document.querySelector(
          '.cart-sidebar'
        ) as HTMLDivElement;
        if (cartSideBar) cartSideBar.classList.add('active');
      }
      e.stopPropagation();
    };

    if (type === 'teas' || color![0] === undefined) {
      const payload = {
        name,
        price,
        code,
        size,
        product_img,
        quantity: productQuantity,
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
          quantity: productQuantity,
        };
        dispatch(addToCart(payload));
        afterAdd();
      }
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) setProductQuantity(1);
    else if (Number(e.target.value) > 999) setProductQuantity(999);
    else setProductQuantity(Number(e.target.value));
  };

  const breadCrumbs =
    location.state.prevPath === '/' ? (
      <p className='tea-product__breadcrumbs'>
        <Link to='/'>Home</Link> / {name}
      </p>
    ) : (
      <p className='tea-product__breadcrumbs'>
        <Link to='/'>Home</Link> /
        {type === 'extras' ? (
          <Link to='/extras'> Extras </Link>
        ) : (
          <Link to='/teas'> Teas </Link>
        )}
        / {name}
      </p>
    );

  const handleRadioChange = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('');
    } else {
      setSelectedColor(color);
      setDisplayWarning(false);
    }
  };

  return (
    <div className='tea-product'>
      {breadCrumbs}
      <Modal ref={dialog} closeButtonValue='Got it'>
        <h2>We can't accept online orders right now</h2>
        <p>Please contact us to complete your purchase.</p>
      </Modal>
      {type === 'extras' && color![0] ? (
        <ImageChoser
          product_img={product_img}
          hover_img={hover_img}
          name={name}
          selectedColor={selectedColor}
          firstColor={color![0]}
        />
      ) : (
        <img className='tea-product__image' src={product_img} alt='tea bag' />
      )}

      <div className='description'>
        <h2 className='description__name'>{name}</h2>
        <p className='description__price'>${price}</p>
        <form>
          {type === 'extras' ? (
            color![0] && (
              <ColorInputs
                firstColor={color![0]}
                secondColor={color![1]}
                selectedColor={selectedColor}
                handleRadioChange={handleRadioChange}
                displayWarning={displayWarning}
                firstLabel='product-first-color'
                secondLabel='product-second-color'
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
            value={productQuantity}
            onChange={inputHandler}
          />
        </form>
        <button className='add-to-cart' onClick={addToCartHandler}>
          Add to Cart
        </button>
        <button className='buy-now' onClick={() => dialog.current?.open()}>
          Buy Now
        </button>
        <Description product_description={product_description} />
      </div>
    </div>
  );
};

export default Product;
