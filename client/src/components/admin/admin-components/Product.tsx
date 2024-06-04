import React, { useRef } from 'react';

import Modal, { ModalMethods } from '../../Modal';
import './Product.scss';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  number: number;
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
  onProductDeleted: () => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const Product: React.FC<ProductProps> = ({
  number,
  details,
  onProductDeleted,
  notifySuccess,
  notifyError,
}) => {
  const { _id, type, group, name, price, images } = details;

  const dialog = useRef<ModalMethods>(null);

  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate(`/admin/${_id}/edit`);
  };
  const handleViewDetails = () => {
    navigate(`/admin/${_id}`);
  };

  const handleDeleteButton = async () => {
    try {
      const res = await fetch(`http://localhost:8080/admin/product/${_id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        notifyError('Failed to delete product.');
        throw new Error('Failed to delete product');
      }

      const resData = await res.json();
      onProductDeleted();

      notifySuccess(resData.message);
    } catch (err) {
      notifyError('Failed to delete product. Please try again later.');
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
        <td>{number}</td>
        <td>
          <img
            src={`http://localhost:8080/images/${images.main}`}
            alt='product foto'
          />
        </td>
        <td>{name}</td>
        <td>{`$${price.toFixed(2)}`}</td>
        <td>{type}</td>
        <td>{group === 'default' ? '' : group}</td>
        <td>
          <button onClick={handleEditButton}>Edit</button>
        </td>
        <td>
          <button onClick={handleViewDetails}>Details</button>
        </td>
        <td>
          <button onClick={() => dialog.current?.open()}>Delete</button>
        </td>
      </tr>
    </>
  );
};

export default Product;
