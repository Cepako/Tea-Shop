import React from 'react';
import Carousel from 'react-multi-carousel';

import Card from './Card';

import 'react-multi-carousel/lib/styles.css';
import './Slider.scss';

import SliderModel from './slider.model';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1023, min: 465 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slider: React.FC<SliderModel> = ({ removeArrowOnDeviceType, data }) => {
  const productsList = data.map((card) => (
    <Card
      key={card.name}
      product_img={`http://localhost:8080/images/${card.images.main}`}
      hover_img={`http://localhost:8080/images/${card.images.hover}`}
      name={card.name}
      price={card.price}
      code={card._id}
      size={card.size}
      color={card.color}
    />
  ));

  return (
    <div className='slider'>
      <Carousel
        className='gd-carousel'
        draggable={false}
        responsive={responsive}
        infinite={true}
        renderButtonGroupOutside={true}
        removeArrowOnDeviceType={removeArrowOnDeviceType}
      >
        {productsList}
      </Carousel>
    </div>
  );
};

export default Slider;
