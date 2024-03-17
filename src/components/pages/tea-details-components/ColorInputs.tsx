import React from 'react';

import './ColorInputs.scss';

interface ColorInputsModel {
  selectedColor: string;
  firstColor: string;
  secondColor: string;
  handleRadioChange: (color: string) => void;
  displayWarning: boolean;
}

const ColorInputs: React.FC<ColorInputsModel> = ({
  selectedColor,
  firstColor,
  secondColor,
  handleRadioChange,
  displayWarning,
}) => {
  return (
    <div className='color-inputs'>
      <p className={displayWarning ? 'warning active' : 'warning'}>
        <span className='warning-arrow-up'></span>Select Color
      </p>
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
