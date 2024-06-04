import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

import { FormDataInterface } from '../ProductForm';

type imagesURLsType = {
  main: string;
  hover: string;
};

interface imageInputProps {
  inputError?: string;
  setFormData: Dispatch<SetStateAction<FormDataInterface>>;
  setRemoveHoverImage: Dispatch<SetStateAction<boolean>>;
  setImageURLs: Dispatch<SetStateAction<imagesURLsType>>;
  imageURLs: imagesURLsType;
}

const ImageInputs: React.FC<imageInputProps> = ({
  inputError,
  setFormData,
  setRemoveHoverImage,
  setImageURLs,
  imageURLs,
}) => {
  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const hoverFileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <>
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
      {inputError && <p className='invalid'>{inputError}</p>}
      <input
        type='file'
        id='main'
        name='main'
        ref={mainFileInputRef}
        onChange={(e) => handleImageChange(e, 'main')}
        className={inputError ? 'invalid' : ''}
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
    </>
  );
};

export default ImageInputs;
