import React, { ChangeEvent, useRef, useState } from 'react';

import './PromoCode.scss';

const PromoCode: React.FC = () => {
  const [viewInput, setViewInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setViewInput((prev) => !prev);
    if (!viewInput)
      setTimeout(() => {
        inputRef.current!.focus();
      }, 100);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const input = (
    <>
      <input
        type='text'
        placeholder='Enter a promo code'
        ref={inputRef}
        onChange={handleInputChange}
        value={inputValue}
      />
      <button>Apply</button>
    </>
  );

  return (
    <div className='promo-code'>
      <p onClick={handleClick}>
        <img src='./images/price-tag-icon.svg' alt='price tag' />
        Enter a promo code
      </p>
      {viewInput && input}
    </div>
  );
};

export default PromoCode;
