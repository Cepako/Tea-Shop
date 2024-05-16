import React, { useRef } from 'react';

import Modal, { ModalMethods } from '../../Modal';
import './Product.scss';
import { useNavigate } from 'react-router-dom';

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

  const dialog = useRef<ModalMethods>(null);

  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate(`/admin/${_id}/edit`);
  };

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
    dialog.current?.close();
  };

  return (
    <>
      <Modal className='product-modal' ref={dialog} closeButtonValue='Close'>
        <h2>Are you sure you want to delete this product?</h2>
        <button className='delete' onClick={handleDeleteButton}>
          Confirm
        </button>
      </Modal>
      <tr className='admin-product'>
        <td>{images.main}</td>
        <td>{name}</td>
        <td>{`$${price.toFixed(2)}`}</td>
        <td>{type}</td>
        <td>{group}</td>
        <td>
          <button onClick={handleEditButton}>Edit</button>
        </td>
        <td>
          <button onClick={() => dialog.current?.open()}>Delete</button>
        </td>
      </tr>
    </>
  );
};

export default Product;
