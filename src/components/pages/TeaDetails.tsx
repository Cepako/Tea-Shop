import React from 'react';
import { useParams } from 'react-router-dom';
import teasData from './tea-details-components/tea-details-data';
import Header from './tea-details-components/Header';
import TeaProduct from './tea-details-components/TeaProduct';

import './TeaDetails.scss';

const TeaDetails: React.FC = () => {
  const { productLink } = useParams<string>();
  const teaData = teasData.filter((tea) => tea.link === productLink);
  const { name, price, product_img, product_description, product_info } =
    teaData[0];

  return (
    <div className="tea-details">
      <Header />
      <TeaProduct
        product_img={product_img}
        name={name}
        price={price}
        product_description={product_description}
        product_info={product_info}
      />
    </div>
  );
};

export default TeaDetails;
