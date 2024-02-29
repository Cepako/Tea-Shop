import React, { useState } from 'react';

import './PromoCode.scss';

const PromoCode: React.FC = () => {
  const [viewInput, setViewInput] = useState(false);

  const input = (
    <>
      <input type='text' placeholder='Enter a promo code' />
      <button>Apply</button>
    </>
  );

  return (
    <div className='promo-code'>
      <p
        onClick={() => {
          setViewInput((prev) => !prev);
        }}
      >
        <img src='./images/price-tag-icon.svg' alt='price tag' />
        Enter a promo code
      </p>
      {viewInput && input}
    </div>
  );
};

export default PromoCode;
