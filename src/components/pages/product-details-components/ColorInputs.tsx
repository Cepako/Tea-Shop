import React from 'react';

import './ColorInputs.scss';

interface ColorInputsModel {
  selectedColor: string;
  firstColor: string;
  secondColor: string;
  handleRadioChange: (color: string) => void;
  displayWarning: boolean;
  firstLabel: string;
  secondLabel: string;
}

const ColorInputs: React.FC<ColorInputsModel> = ({
  selectedColor,
  firstColor,
  secondColor,
  handleRadioChange,
  displayWarning,
  firstLabel,
  secondLabel,
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
        className={firstColor}
        readOnly
        checked={selectedColor === firstColor}
        id={firstLabel}
        onClick={() => handleRadioChange(firstColor)}
      />
      <label id='radio-container' htmlFor={firstLabel}></label>

      <input
        type='radio'
        name='color'
        className={secondColor}
        readOnly
        checked={selectedColor === secondColor}
        id={secondLabel}
        onClick={() => handleRadioChange(secondColor)}
      />
      <label id='radio-container' htmlFor={secondLabel}></label>
    </div>
  );
};

export default ColorInputs;
