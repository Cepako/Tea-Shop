import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ProductForm.scss';
import { useNavigate } from 'react-router-dom';
import Input from './admin-components/Input';
import ImageInputs from './admin-components/ImageInputs';
import ColorInput from './admin-components/ColorInput';

export interface FormDataInterface {
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
  [key: string]: any;
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
      if (!formData.group || formData.group === 'default')
        newErrors.group = 'Select group!';
      if (!formData.size || formData.size === 'default')
        newErrors.size = 'Select size!';
    }
    if (formData.description.trim().length < 15) {
      newErrors.description =
        'Product description is to short, must be at least 15 letters long!';
    }
    if (formData.info.trim().length < 15) {
      newErrors.info =
        'Product information is to short, must be at least 15 letters long!';
    }
    if (formData.color && formData.color[1] && !formData.color[0]) {
      newErrors.color = 'You have to choose first color before!';
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

  let additionalInfo = <></>;

  if (formData.type !== 'default') {
    formData.type === 'tea'
      ? (additionalInfo = (
          <>
            <Input
              inputType='select'
              htmlFor='group'
              labelContent='Choose group:'
              inputError={errors.group}
              formDataValue={formData}
              setFormData={setFormData}
              options={[
                { value: 'classic', label: 'Classic' },
                { value: 'herbal-tea', label: 'Herbal Tea' },
                { value: 'special-edition', label: 'Special Edition' },
              ]}
            />
            <Input
              inputType='select'
              htmlFor='size'
              labelContent='Choose size:'
              inputError={errors.size}
              formDataValue={formData}
              setFormData={setFormData}
              options={[
                { value: '125Gr', label: '125Gr' },
                { value: '200Gr', label: '200Gr' },
                { value: '300Gr', label: '300Gr' },
              ]}
            />
          </>
        ))
      : (additionalInfo = (
          <>
            <ColorInput
              htmlFor='first-color'
              labelContent='Choose first color:'
              setFormData={setFormData}
              formDataValue={formData}
              availableColors={availableColors}
            />
            <ColorInput
              htmlFor='second-color'
              labelContent='Choose second color:'
              inputError={errors.color}
              setFormData={setFormData}
              formDataValue={formData}
              availableColors={availableColors}
            />
          </>
        ));
  }

  useEffect(() => {
    if (formData.name.trim().length >= 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: '',
      }));
    }
    if (formData.type !== 'default') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: '',
      }));
    }
    if (formData.type === 'tea') {
      if (formData.group !== 'default')
        setErrors((prevErrors) => ({
          ...prevErrors,
          group: '',
        }));
      if (formData.size !== 'default')
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
    if (
      (formData.color && formData.color[0]) ||
      (formData.color && !formData.color[1])
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        color: '',
      }));
    }
  }, [formData]);

  return (
    <div className='add-product'>
      <h2>{isEdit ? 'Edit product' : 'Add product'}</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          inputType='text'
          htmlFor='name'
          labelContent='Name'
          inputError={errors.name}
          placeholder='Enter product name...'
          setFormData={setFormData}
          formDataValue={formData}
        />
        <Input
          inputType='number'
          htmlFor='price'
          labelContent='Price ($)'
          setFormData={setFormData}
          formDataValue={formData}
          min={1.0}
          max={1000}
          step={0.01}
        />
        <Input
          inputType='select'
          htmlFor='type'
          labelContent='Choose type:'
          inputError={errors.type}
          setFormData={setFormData}
          formDataValue={formData}
          options={[
            { value: 'tea', label: 'Tea' },
            { value: 'extras', label: 'Extras' },
          ]}
        />
        {additionalInfo}
        <ImageInputs
          inputError={errors.image}
          setFormData={setFormData}
          setRemoveHoverImage={setRemoveHoverImage}
          setImageURLs={setImageURLs}
          imageURLs={imageURLs}
        />
        <Input
          inputType='textarea'
          htmlFor='description'
          labelContent='Product description:'
          inputError={errors.description}
          placeholder='Enter product description...'
          setFormData={setFormData}
          formDataValue={formData}
        />
        <Input
          inputType='textarea'
          htmlFor='info'
          labelContent='Product information:'
          inputError={errors.info}
          placeholder='Enter product information...'
          setFormData={setFormData}
          formDataValue={formData}
        />

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
