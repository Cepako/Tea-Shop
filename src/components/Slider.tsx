import React from 'react';
import Carousel from 'react-multi-carousel';

import Card from './slider-components/Card';

import 'react-multi-carousel/lib/styles.css';
import './Slider.scss';

import SliderModel from './slider.model';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 465 },
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
      product_img={card.product_img}
      hover_img={card.hover_img}
      name={card.name}
      price={card.price}
      code={card.code}
      size={card.size}
    />
  ));

  return (
    <div className="slider">
      <Carousel
        className="gd-carousel"
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
