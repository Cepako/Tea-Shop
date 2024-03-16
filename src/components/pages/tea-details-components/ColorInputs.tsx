import React from 'react';

import './ColorInputs.scss';

interface ColorInputsModel {
  selectedColor: string;
  firstColor: string;
  secondColor: string;
  handleRadioChange: (color: string) => void;
}

const ColorInputs: React.FC<ColorInputsModel> = ({
  selectedColor,
  firstColor,
  secondColor,
  handleRadioChange,
}) => {
  return (
    <div className='color-inputs'>
      <p className='color'>
        {selectedColor ? `Color: ${selectedColor}` : 'Color'}
      </p>
      <input
        type='radio'
        name='color'
        readOnly
        checked={selectedColor === firstColor}
        id={firstColor}
        onClick={() => handleRadioChange(firstColor)}
      />
      <label id='radio-container' htmlFor={firstColor}></label>

      <input
        type='radio'
        name='color'
        readOnly
        checked={selectedColor === secondColor}
        id={secondColor}
        onClick={() => handleRadioChange(secondColor)}
      />
      <label id='radio-container' htmlFor={secondColor}></label>
    </div>
  );
};

export default ColorInputs;
