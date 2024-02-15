import React from 'react';
import Carousel from 'react-multi-carousel';

import Card from './slider-components/Card';

import 'react-multi-carousel/lib/styles.css';
import './Slider.scss';

import SliderModel from './slider.model';

const Slider: React.FC<SliderModel> = ({
  removeArrowOnDeviceType,
  responsive,
  data,
}) => {
  const productsList = data.map((card) => (
    <Card
      key={card.name}
      defaultImg={card.url}
      hoverImg={card.hoverUrl}
      name={card.name}
      price={card.price}
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
