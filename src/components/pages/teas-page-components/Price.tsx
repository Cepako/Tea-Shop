import React, { useState } from 'react';
import ReactSlider from 'react-slider';

import './Price.scss';

interface PriceInterface {
  minValue: number;
  maxValue: number;
}

const Price: React.FC<PriceInterface> = ({ minValue, maxValue }) => {
  const [active, setActive] = useState(false);
  const [lowerValue, setLowerValue] = useState(minValue);
  const [upperValue, setUpperValue] = useState(maxValue);

  const handleSliderChange = (values: number[]) => {
    setLowerValue(values[0]);
    setUpperValue(values[1]);
  };

  return (
    <div className={active ? 'price active' : 'price'}>
      <h3 className='price__title' onClick={() => setActive((prev) => !prev)}>
        Price (${minValue}.00 - ${maxValue}.00)
        <span>{active ? '-' : '+'}</span>
      </h3>
      <ReactSlider
        className='horizontal-slider'
        thumbClassName='example-thumb'
        trackClassName='example-track'
        defaultValue={[lowerValue, upperValue]}
        onChange={handleSliderChange}
        minDistance={0.5}
        min={5}
        max={15}
        step={0.5}
      />
      <div className='under-slider'>
        <span>${lowerValue.toFixed(2)}</span>
        <span>${upperValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Price;
