import React from 'react';

import './AddProduct.scss';

const AddProduct: React.FC = () => {
  return (
    <div className='add-product'>
      <h2>Add product</h2>
      <form action={`http://localhost:8080/admin/product/`} method='POST'>
        <label htmlFor='name'>Name</label>
        <br />
        <input type='text' id='name' />
        <label htmlFor='price'>Price</label>
        <br />
        <input type='number' />
      </form>
    </div>
  );
};

export default AddProduct;
