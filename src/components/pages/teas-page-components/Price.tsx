import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

import './Price.scss';

interface PriceProps {
  minValue: number;
  maxValue: number;
  setPrice: React.Dispatch<React.SetStateAction<[number, number]>>;
  rerenderKey: number;
}

const Price: React.FC<PriceProps> = ({
  minValue,
  maxValue,
  setPrice,
  rerenderKey,
}) => {
  const [active, setActive] = useState(false);
  const [lowerValue, setLowerValue] = useState(minValue);
  const [upperValue, setUpperValue] = useState(maxValue);

  useEffect(() => {
    setPrice([lowerValue, upperValue]);
  }, [lowerValue, upperValue, setPrice]);

  useEffect(() => {
    setLowerValue(minValue);
    setUpperValue(maxValue);
  }, [rerenderKey]);

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
        value={[lowerValue, upperValue]}
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
