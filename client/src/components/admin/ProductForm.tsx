import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ProductForm.scss';
import { useNavigate } from 'react-router-dom';

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

interface ProductFormProps {
  isEdit?: boolean;
  id?: string;
}

const availableColors = [
  'Black',
  'Violet',
  'Brown',
  'Blue-Grey',
  'Grey',
  'Light-Green',
];

const ProductForm: React.FC<ProductFormProps> = ({ isEdit = false, id }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const hoverFileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    price: 1,
    type: 'default',
    images: {
      main: null,
    },
    color: ['', ''],
    description: '',
    info: '',
  });

  const [imageURLs, setImageURLs] = useState({
    main: '',
    hover: '',
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

  const [removeHoverImage, setRemoveHoverImage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8080/admin/product/${id}`);
      if (!response.ok) {
      } else {
        const data = await response.json();
        setFormData({
          ...data.product,
          color:
            data.product.color[0] || data.product.color[1]
              ? [data.product.color[0], data.product.color[1]]
              : ['', ''],
        });
        if (data.product.images.main) {
          setImageURLs((prev) => ({
            ...prev,
            main: `http://localhost:8080/images/${data.product.images.main}`,
          }));
        }
        if (data.product.images.hover) {
          setImageURLs((prev) => ({
            ...prev,
            hover: `http://localhost:8080/images/${data.product.images.hover}`,
          }));
        }
      }
    };

    if (isEdit && id) fetchProduct();
  }, [isEdit, id]);

  useEffect(() => {
    if (formData.images.main && formData.images.main instanceof File) {
      const mainFile = formData.images.main;
      const mainURL = URL.createObjectURL(mainFile);
      setImageURLs((prev) => ({ ...prev, main: mainURL }));
      return () => URL.revokeObjectURL(mainURL);
    }
  }, [formData.images.main]);

  useEffect(() => {
    if (formData.images.hover && formData.images.hover instanceof File) {
      const hoverFile = formData.images.hover;
      const hoverURL = URL.createObjectURL(hoverFile);
      setImageURLs((prev) => ({ ...prev, hover: hoverURL }));
      return () => URL.revokeObjectURL(hoverURL);
    }
  }, [formData.images.hover]);

  const notifySuccess = () =>
    toast.success(isEdit ? 'Product edited!' : 'Product added!', {
      position: 'top-center',
      autoClose: isEdit ? 500 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
  const notifyError = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: any = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = 'The name must be at least 3 characters long!';
    }
    if (!formData.images.main) {
      newErrors.image = 'Add at least one image!';
    }
    if (formData.type === 'default') {
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
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('type', formData.type);
      if (formData.group) formDataToSend.append('group', formData.group);
      if (formData.size) formDataToSend.append('size', formData.size);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('info', formData.info);
      if (formData.images.main)
        formDataToSend.append('main', formData.images.main);
      if (formData.images.hover) {
        formDataToSend.append('hover', formData.images.hover);
      }
      if (removeHoverImage) {
        formDataToSend.append('removeHoverImage', 'true');
      }
      if (formData.color && formData.color[0]) {
        formDataToSend.append('color', formData.color.join(','));
      }
      const response = await fetch(
        `http://localhost:8080/admin/product/${isEdit ? id : ''}`,
        {
          method: `${isEdit ? 'PUT' : 'POST'}`,
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        notifyError(`Failed to ${isEdit ? 'edit' : 'add'} product.`);
        throw new Error(`Failed to ${isEdit ? 'edit' : 'add'} product.`);
      }
      notifySuccess();
      setFormData({
        name: '',
        price: 1,
        type: 'default',
        images: {
          main: null,
        },
        color: ['', ''],
        description: '',
        info: '',
      });
      setImageURLs({ main: '', hover: '' });
      setErrors(newErrors);

      if (formRef.current) {
        formRef.current.reset();
      }
      if (isEdit) setTimeout(() => navigate('/admin/products'), 1000);
    } catch (error) {
      notifyError(
        `Failed to ${isEdit ? 'edit' : 'add'} product. Please try again later.`
      );
      console.error(`Could not ${isEdit ? 'edit' : 'add'} product`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { id, value } = e.target;

    if (id === 'type') {
      setFormData((prevValue) => ({
        ...prevValue,
        [id]: value,
        color: ['', ''],
        group: 'default',
        size: 'default',
      }));
      return;
    }

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
          [imageName]: file,
        },
      }));
  };
  const deleteImageHandler = (type: string) => {
    setFormData((prevValue) => ({
      ...prevValue,
      images: { ...prevValue.images, [type]: null },
    }));
    setImageURLs((prevValue) => ({ ...prevValue, [type]: '' }));
    if (type === 'hover') {
      setRemoveHoverImage(true);
    }
    if (type === 'main' && mainFileInputRef.current) {
      mainFileInputRef.current.value = '';
    }
    if (type === 'hover' && hoverFileInputRef.current) {
      hoverFileInputRef.current.value = '';
    }
  };

  const handleFirstColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      color: [value, prevValue.color ? prevValue.color[1] : ''],
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

  if (formData.type !== 'default') {
    formData.type === 'tea'
      ? (additionalInfo = (
          <>
            <label htmlFor='group'>Choose group:</label>
            {errors.group && <p className='invalid'>{errors.group}</p>}
            <select
              name='group'
              id='group'
              value={isEdit ? formData.group : formData.group ?? 'default'}
              onChange={handleInputChange}
              className={errors.group ? 'invalid' : ''}
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
              value={isEdit ? formData.size : formData.size ?? 'default'}
              onChange={handleInputChange}
              className={errors.size ? 'invalid' : ''}
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
              value={formData.color![0] === '' ? 'default' : formData.color![0]}
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
              value={formData.color![1] === '' ? 'default' : formData.color![1]}
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
      <h2>{isEdit ? 'Edit product' : 'Add product'}</h2>
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
          className={errors.name ? 'invalid' : ''}
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
          value={formData.type}
          onChange={handleInputChange}
          className={errors.type ? 'invalid' : ''}
        >
          <option value='default' disabled>
            Select type
          </option>
          <option value='tea'>Tea</option>
          <option value='extras'>Extras</option>
        </select>
        {additionalInfo}
        <label htmlFor='main'>Add image:</label>
        {imageURLs.main && (
          <div className='img'>
            <span
              className='remove-button'
              onClick={() => deleteImageHandler('main')}
            >
              <span className='caption'>Delete image</span>❌
            </span>
            <img src={imageURLs.main} alt='Product' />
          </div>
        )}
        {errors.image && <p className='invalid'>{errors.image}</p>}
        <input
          type='file'
          id='main'
          name='main'
          ref={mainFileInputRef}
          onChange={(e) => handleImageChange(e, 'main')}
          className={errors.image ? 'invalid' : ''}
        />
        <label htmlFor='hover'>Add hover-image(Optional):</label>
        {imageURLs.hover && (
          <div className='img'>
            <span
              className='remove-button'
              onClick={() => deleteImageHandler('hover')}
            >
              <span className='caption'>Delete image</span>❌
            </span>
            <img src={imageURLs.hover} alt='Product' />
          </div>
        )}
        <input
          type='file'
          id='hover'
          name='hover'
          ref={hoverFileInputRef}
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
          value={formData.description}
          className={errors.description ? 'invalid' : ''}
        ></textarea>
        <label htmlFor='info'>Product information:</label>
        {errors.info && <p className='invalid'>{errors.info}</p>}
        <textarea
          name='info'
          id='info'
          placeholder='Enter product information...'
          onChange={handleInputChange}
          onBlur={handleInputChange}
          value={formData.info}
          className={errors.info ? 'invalid' : ''}
        ></textarea>
        <button type='submit' disabled={isSubmitting}>
          {isEdit
            ? isSubmitting
              ? 'Editing...'
              : 'Edit'
            : isSubmitting
            ? 'Adding...'
            : 'Add'}
        </button>
      </form>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='dark'
        transition={Zoom}
      />
    </div>
  );
};

export default ProductForm;
