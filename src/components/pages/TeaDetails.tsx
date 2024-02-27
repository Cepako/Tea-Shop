import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './tea-details-components/Header';
import TeaProduct from './tea-details-components/TeaProduct';
import TeaProductInfo from './tea-details-components/TeaProductInfo';
import data from '../../data';
import Slider from '../Slider';

import './TeaDetails.scss';

const TeaDetails: React.FC = () => {
  const { productLink } = useParams<string>();
  const keyForTeaProduct = `tea-product-${productLink}`;
  const teaData = data.filter((tea) => tea.link === productLink);
  const {
    name,
    price,
    code,
    size,
    product_img,
    product_description,
    product_info,
  } = teaData[0];

  useEffect(() => {
    const teasButton = document.querySelector('.list__item a');
    if (teasButton) teasButton.className = '';
  }, []);

  return (
    <div className="tea-details">
      <Header />
      <TeaProduct
        key={keyForTeaProduct}
        name={name}
        price={price}
        code={code}
        size={size}
        product_img={product_img}
        product_description={product_description}
      />
      <TeaProductInfo product_info={product_info} />
      <h3 className="tea-details__related">Related Products</h3>
      <div className="tea-details__slider">
        <Slider
          key={keyForTeaProduct}
          removeArrowOnDeviceType={[]}
          data={data}
        />
      </div>
    </div>
  );
};

export default TeaDetails;
