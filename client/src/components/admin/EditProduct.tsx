import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductForm from './ProductForm';

const EditProduct: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  return <ProductForm isEdit={true} id={id} />;
};

export default EditProduct;
