import React from 'react';

import './AddProduct.scss';

const AddProduct: React.FC = () => {
  return (
    <div className='add-product'>
      <h2>Add product</h2>
      <form action={`http://localhost:8080/admin/product/`} method='POST'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' placeholder='Enter product name...' />
        <label htmlFor='price'>Price</label>
        <input type='number' id='price' min={1} defaultValue={1} />
        <label htmlFor='type'>Choose type:</label>
        <select name='type' id='type' defaultValue='default'>
          <option value='default' disabled>
            Select type
          </option>
          <option value='tea'>Tea</option>
          <option value='extras'>Extras</option>
        </select>
        <label htmlFor='group'>Choose group:</label>
        <select name='group' id='group' defaultValue='default'>
          <option value='default' disabled>
            Select group
          </option>
          <option value='classic'>Classic</option>
          <option value='herbal-tea'>Herbal Tea</option>
          <option value='special-edition'>Special Edition</option>
        </select>
        <label htmlFor='size'>Choose size:</label>
        <select name='size' id='size' defaultValue='default'>
          <option value='default' disabled>
            Select size
          </option>
          <option value='125Gr'>125Gr</option>
          <option value='200Gr'>200Gr</option>
          <option value='300Gr'>300Gr</option>
        </select>
        <label htmlFor='first-color'>Choose first color:</label>
        <select name='first-color' id='first-color' defaultValue='default'>
          <option value='default' disabled>
            Select first color
          </option>
          <option value='Black'>Black</option>
          <option value='Violet'>Violet</option>
          <option value='Brown'>Brown</option>
          <option value='Blue-Grey'>Blue-Grey</option>
          <option value='Grey'>Grey</option>
          <option value='Light-Green'>Light-Green</option>
        </select>
        <label htmlFor='second-color'>Choose second color:</label>
        <select name='second-color' id='second-color' defaultValue='default'>
          <option value='default' disabled>
            Select second color
          </option>
          <option value='Black'>Black</option>
          <option value='Violet'>Violet</option>
          <option value='Brown'>Brown</option>
          <option value='Blue-Grey'>Blue-Grey</option>
          <option value='Grey'>Grey</option>
          <option value='Light-Green'>Light-Green</option>
        </select>
        <label htmlFor='image'>Add image:</label>
        <input type='file' id='image' name='image' />
        <label htmlFor='hover-image'>Add hover-image(Optional):</label>
        <input type='file' id='hover-image' name='hover-image' />
        <label htmlFor='description'>Product description:</label>
        <textarea name='description' id='description'></textarea>
        <label htmlFor='info'>Product info:</label>
        <textarea name='info' id='info'></textarea>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
