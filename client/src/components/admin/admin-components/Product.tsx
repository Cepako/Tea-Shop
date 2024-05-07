import React from 'react';

import './Product.scss';

interface ProductProps {
  details: {
    _id: string;
    type: string;
    group: string;
    name: string;
    price: number;
    images: {
      main: string;
      hover: string;
    };
  };
}

//obsluga buttonow!!

const Product: React.FC<ProductProps> = ({ details }) => {
  const { _id, type, group, name, price, images } = details;

  const handleEditButton = async () => {};

  const handleDeleteButton = async () => {
    try {
      const res = await fetch(`http://localhost:8080/admin/product/${_id}`, {
        method: 'DELETE',
      });
      const resData = await res.json();
      console.log(resData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{images.main}</td>
      <td>{name}</td>
      <td>{`$${price.toFixed(2)}`}</td>
      <td>{type}</td>
      <td>{group}</td>
      <td>
        <button onClick={handleEditButton}>Edit</button>
      </td>
      <td>
        <button onClick={handleDeleteButton}>Delete</button>
      </td>
    </tr>
  );
};

export default Product;
