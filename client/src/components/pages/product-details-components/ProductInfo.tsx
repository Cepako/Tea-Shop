import React, { useState } from 'react';
import './ProductInfo.scss';

interface PIInterface {
  product_info: string;
}

const ProductInfo: React.FC<PIInterface> = ({ product_info }) => {
  const [infoActive, setInfoActive] = useState(true);
  const [policyActive, setPolicyActive] = useState(false);
  const [shippingActive, setShippingActive] = useState(false);

  const handleToggle = (section: string) => {
    switch (section) {
      case 'info':
        setShippingActive(false);
        setPolicyActive(false);
        setInfoActive(!infoActive);
        break;
      case 'policy':
        setInfoActive(false);
        setShippingActive(false);
        setPolicyActive(!policyActive);
        break;
      case 'shipping':
        setInfoActive(false);
        setPolicyActive(false);
        setShippingActive(!shippingActive);
        break;
      default:
        break;
    }
  };

  return (
    <div className='product-info-wrapper'>
      <div
        id='infoDiv'
        className={`product-info ${infoActive ? 'active' : ''}`}
      >
        <h3 onClick={() => handleToggle('info')}>
          Product Info <span>{infoActive ? '-' : '+'}</span>
        </h3>
        <p>{product_info}</p>
      </div>
      <div
        id='policyDiv'
        className={`product-info ${policyActive ? 'active' : ''}`}
      >
        <h3 onClick={() => handleToggle('policy')}>
          Return & Refund Policy <span>{policyActive ? '-' : '+'}</span>
        </h3>
        <p>
          If you are unhappy with your purchase, you have the right to return
          the product within a specified period from the date of purchase. If
          you receive a faulty or damaged product, please promptly inform us of
          the situation. We are ready to take corrective actions, exchange the
          product, or offer a refund, depending on your preferences.
        </p>
      </div>
      <div
        id='shippingDiv'
        className={`product-info ${shippingActive ? 'active' : ''}`}
      >
        <h3 onClick={() => handleToggle('shipping')}>
          Shipping Info <span>{shippingActive ? '-' : '+'}</span>
        </h3>
        <p>
          Your order is processed within 1-2 business days. Shipping costs
          depend on the delivery location. You will receive a tracking number,
          and available options include standard or express delivery. Ensure to
          provide an accurate delivery address to avoid delays. Thank you for
          shopping with us!
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
