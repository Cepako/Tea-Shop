import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';

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

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    image: '',
    size: '',
    group: '',
    color: '',
    description: '',
    info: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};
    if (formData.name.trim().length < 5) {
      newErrors.name = 'The name must be at least 5 characters long!';
    }
    if (!formData.images.main) {
      newErrors.image = 'Add at least one image!';
    }
    if (!formData.type) {
      newErrors.type = 'Select type!';
    }
    if (formData.type === 'tea') {
      if (!formData.group) newErrors.group = 'Select group!';
      if (!formData.size) newErrors.size = 'Select size!';
    }
    if (formData.description.trim().length < 15) {
      newErrors.description =
        'Product description is to short, must be at least 15 letters long!';
    }
    if (formData.info.trim().length < 15) {
      newErrors.info =
        'Product info is to short, must be at least 15 letters long!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
      setErrors(newErrors);

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
      [id]: id === 'price' ? (+value < 1 ? 1 : +value) : value,
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
            {errors.group && <p className='invalid'>{errors.group}</p>}
            <select
              name='group'
              id='group'
              defaultValue='default'
              onChange={handleInputChange}
              style={
                errors.group ? { borderColor: 'red' } : { borderColor: 'gray' }
              }
            >
              <option value='default' disabled>
                Select group
              </option>
              <option value='classic'>Classic</option>
              <option value='herbal-tea'>Herbal Tea</option>
              <option value='special-edition'>Special Edition</option>
            </select>
            <label htmlFor='size'>Choose size:</label>
            {errors.size && <p className='invalid'>{errors.size}</p>}
            <select
              name='size'
              id='size'
              defaultValue='default'
              onChange={handleInputChange}
              style={
                errors.size ? { borderColor: 'red' } : { borderColor: 'gray' }
              }
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

  useEffect(() => {
    if (formData.name.trim().length >= 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: '',
      }));
    }
    if (formData.type) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: '',
      }));
    }
    if (formData.type === 'tea') {
      if (formData.group)
        setErrors((prevErrors) => ({
          ...prevErrors,
          group: '',
        }));
      if (formData.size)
        setErrors((prevErrors) => ({
          ...prevErrors,
          size: '',
        }));
    }
    if (formData.images.main) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: '',
      }));
    }
    if (formData.description.trim().length >= 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: '',
      }));
    }
    if (formData.info.trim().length >= 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        info: '',
      }));
    }
  }, [formData]);

  return (
    <div className='add-product'>
      <h2>Add product</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        {errors.name && <p className='invalid'>{errors.name}</p>}
        <input
          type='text'
          id='name'
          placeholder='Enter product name...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
          value={formData.name}
          style={errors.name ? { borderColor: 'red' } : { borderColor: 'gray' }}
        />
        <label htmlFor='price'>Price ($)</label>
        <input
          type='number'
          id='price'
          min={1.0}
          step={0.01}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          value={formData.price.toFixed(2)}
        />
        <label htmlFor='type'>Choose type:</label>
        {errors.type && <p className='invalid'>{errors.type}</p>}
        <select
          name='type'
          id='type'
          defaultValue='default'
          onChange={handleInputChange}
          style={errors.type ? { borderColor: 'red' } : { borderColor: 'gray' }}
        >
          <option value='default' disabled>
            Select type
          </option>
          <option value='tea'>Tea</option>
          <option value='extras'>Extras</option>
        </select>
        {additionalInfo}
        <label htmlFor='main'>Add image:</label>
        {errors.image && <p className='invalid'>{errors.image}</p>}
        <input
          type='file'
          id='main'
          name='main'
          onChange={(e) => handleImageChange(e, 'main')}
          style={
            errors.image ? { border: '1px solid red' } : { border: 'none' }
          }
        />
        <label htmlFor='hover'>Add hover-image(Optional):</label>
        <input
          type='file'
          id='hover'
          name='hover'
          onChange={(e) => handleImageChange(e, 'hover')}
        />
        <label htmlFor='description'>Product description:</label>
        {errors.description && <p className='invalid'>{errors.description}</p>}
        <textarea
          name='description'
          id='description'
          placeholder='Enter product description...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
          style={
            errors.description
              ? { borderColor: 'red' }
              : { borderColor: 'gray' }
          }
        ></textarea>
        <label htmlFor='info'>Product information:</label>
        {errors.info && <p className='invalid'>{errors.info}</p>}
        <textarea
          name='info'
          id='info'
          placeholder='Enter product information...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
          style={errors.info ? { borderColor: 'red' } : { borderColor: 'gray' }}
        ></textarea>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
