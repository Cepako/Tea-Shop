import React from 'react';
import { useParams } from 'react-router-dom';
import teasData from './tea-details-components/tea-details-data';
import Header from './tea-details-components/Header';
import TeaProduct from './tea-details-components/TeaProduct';
import TeaProductInfo from './tea-details-components/TeaProductInfo';

import './TeaDetails.scss';

const TeaDetails: React.FC = () => {
  const { productLink } = useParams<string>();
  const teaData = teasData.filter((tea) => tea.link === productLink);
  const { name, price, code, product_img, product_description, product_info } =
    teaData[0];

  return (
    <div className="tea-details">
      <Header />
      <TeaProduct
        name={name}
        price={price}
        code={code}
        product_img={product_img}
        product_description={product_description}
      />
      <TeaProductInfo product_info={product_info} />
    </div>
  );
};

export default TeaDetails;
