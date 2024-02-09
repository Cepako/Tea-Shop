import React from 'react';
import Carousel from 'react-multi-carousel';

import Card from './Card';
import { responsive, homePageData } from './home-page-slider-data';

import 'react-multi-carousel/lib/styles.css';
import './Slider.scss';

const Slider: React.FC = () => {
  const productsList = homePageData.map((card) => (
    <Card key={card.name} img={card.url} name={card.name} price={card.price} />
  ));

  return (
    <div className="slider">
      <Carousel
        className="gd-carousel"
        draggable={false}
        responsive={responsive}
        infinite={true}
        renderButtonGroupOutside={true}
        removeArrowOnDeviceType={['desktop']}
      >
        {productsList}
      </Carousel>
    </div>
  );
};

export default Slider;
