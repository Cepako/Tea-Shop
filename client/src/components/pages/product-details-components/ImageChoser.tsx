import React, { useEffect, useState } from 'react';

import './ImageChoser.scss';

interface ImageChoserModel {
  product_img: string;
  hover_img: string;
  name: string;
  firstColor: string;
  selectedColor: string;
}

const ImageChoser: React.FC<ImageChoserModel> = ({
  product_img,
  hover_img,
  name,
  selectedColor,
  firstColor,
}) => {
  const [chosenImage, setChosenImage] = useState(product_img);

  useEffect(() => {
    if (selectedColor)
      setChosenImage(firstColor === selectedColor ? product_img : hover_img);
  }, [selectedColor, firstColor, product_img, hover_img]);

  return (
    <div className='image-choser'>
      <img src={chosenImage} alt={name} />
      {!selectedColor && (
        <div className='image-choser__dots'>
          <span
            onClick={() => setChosenImage(product_img)}
            className={chosenImage === product_img ? 'active' : ''}
          ></span>
          <span
            onClick={() => setChosenImage(hover_img)}
            className={chosenImage === hover_img ? 'active' : ''}
          ></span>
        </div>
      )}
    </div>
  );
};

export default ImageChoser;
