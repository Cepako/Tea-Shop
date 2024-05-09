import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';

import './AddProduct.scss';

interface FormDataInterface {
  name: string;
  price: number;
  type: string;
  group?: string;
  size?: string;
  images: {
    main: File | null;
    hover?: File | null;
  };
  color?: [string, string];
  description: string;
  info: string;
}

const availableColors = [
  'Black',
  'Violet',
  'Brown',
  'Blue-Grey',
  'Grey',
  'Light-Green',
];

const AddProduct: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    price: 1,
    type: '',
    images: {
      main: null,
    },
    color: ['', ''],
    description: '',
    info: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/admin/product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      console.log('Product added successfully');
      setFormData({
        name: '',
        price: 1,
        type: '',
        images: {
          main: null,
        },
        color: ['', ''],
        description: '',
        info: '',
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Could not add product', error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { id, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [id]: id === 'price' ? +value : value,
    }));
  };
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    imageName: string
  ) => {
    const file = e.target.files?.[0];
    if (file)
      setFormData((prevValue) => ({
        ...prevValue,
        images: {
          ...prevValue.images,
          [imageName]: file.name,
        },
      }));
  };

  const handleFirstColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      color: [value, ''],
    }));
  };
  const handleSecondColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.target;
    if (formData.color && formData.color[0]) {
      setFormData((prevValue) => ({
        ...prevValue,
        color: [prevValue.color ? prevValue.color[0] : '', value],
      }));
    }
  };

  const firstColorOptions = availableColors.map((color) => (
    <option
      key={color}
      value={color}
      disabled={color === (formData.color ? formData.color[1] : '')}
    >
      {color}
    </option>
  ));

  const secondColorOptions = availableColors.map((color) => (
    <option
      key={color}
      value={color}
      disabled={color === (formData.color ? formData.color[0] : '')}
    >
      {color}
    </option>
  ));

  let additionalInfo = <></>;

  if (formData.type !== '') {
    formData.type === 'tea'
      ? (additionalInfo = (
          <>
            <label htmlFor='group'>Choose group:</label>
            <select
              name='group'
              id='group'
              defaultValue='default'
              onChange={handleInputChange}
            >
              <option value='default' disabled>
                Select group
              </option>
              <option value='classic'>Classic</option>
              <option value='herbal-tea'>Herbal Tea</option>
              <option value='special-edition'>Special Edition</option>
            </select>
            <label htmlFor='size'>Choose size:</label>
            <select
              name='size'
              id='size'
              defaultValue='default'
              onChange={handleInputChange}
            >
              <option value='default' disabled>
                Select size
              </option>
              <option value='125Gr'>125Gr</option>
              <option value='200Gr'>200Gr</option>
              <option value='300Gr'>300Gr</option>
            </select>
          </>
        ))
      : (additionalInfo = (
          <>
            <label htmlFor='first-color'>Choose first color:</label>
            <select
              name='first-color'
              id='first-color'
              defaultValue='default'
              onChange={handleFirstColorChange}
            >
              <option value='default' disabled>
                Select first color
              </option>
              {firstColorOptions}
            </select>
            <label htmlFor='second-color'>Choose second color:</label>
            <select
              name='second-color'
              id='second-color'
              defaultValue='default'
              onChange={handleSecondColorChange}
            >
              <option value='default' disabled>
                Select second color
              </option>
              {secondColorOptions}
            </select>
          </>
        ));
  }

  return (
    <div className='add-product'>
      <h2>Add product</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          placeholder='Enter product name...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
          value={formData.name}
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          id='price'
          min={1}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          value={formData.price}
        />
        <label htmlFor='type'>Choose type:</label>
        <select
          name='type'
          id='type'
          defaultValue='default'
          onChange={handleInputChange}
        >
          <option value='default' disabled>
            Select type
          </option>
          <option value='tea'>Tea</option>
          <option value='extras'>Extras</option>
        </select>
        {additionalInfo}
        <label htmlFor='main'>Add image:</label>
        <input
          type='file'
          id='main'
          name='main'
          onChange={(e) => handleImageChange(e, 'main')}
        />
        <label htmlFor='hover'>Add hover-image(Optional):</label>
        <input
          type='file'
          id='hover'
          name='hover'
          onChange={(e) => handleImageChange(e, 'hover')}
        />
        <label htmlFor='description'>Product description:</label>
        <textarea
          name='description'
          id='description'
          placeholder='Enter product description...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
        ></textarea>
        <label htmlFor='info'>Product info:</label>
        <textarea
          name='info'
          id='info'
          placeholder='Enter product information...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
        ></textarea>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
