import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './tea-details-components/Header';
import TeaProduct from './tea-details-components/TeaProduct';
import TeaProductInfo from './tea-details-components/TeaProductInfo';
import data from '../../data';
import Slider from '../slider/Slider';

import './TeaDetails.scss';

const TeaDetails: React.FC = () => {
  const { productLink } = useParams<string>();

  const keyForProduct = `product-${productLink}`;

  const productData = data.filter((product) => product.link === productLink);

  const sliderData =
    productData[0].collection === 'extras'
      ? data.filter((product) => product.collection === 'extras')
      : data.filter((product) => product.collection !== 'extras');

  const {
    name,
    price,
    code,
    size,
    color,
    product_img,
    hover_img,
    product_description,
    product_info,
  } = productData[0];

  useEffect(() => {
    const teasButton = document.querySelector('.list__item a');
    if (teasButton) teasButton.className = '';
  }, []);

  return (
    <div className='tea-details'>
      <Header />
      <TeaProduct
        key={keyForProduct}
        name={name}
        price={price}
        code={code}
        size={size}
        color={color}
        product_img={product_img}
        hover_img={hover_img}
        product_description={product_description}
      />
      <TeaProductInfo product_info={product_info} />
      <h3 className='tea-details__related'>Related Products</h3>
      <div className='tea-details__slider'>
        <Slider
          key={keyForProduct}
          removeArrowOnDeviceType={[]}
          data={sliderData}
        />
      </div>
    </div>
  );
};

export default TeaDetails;
