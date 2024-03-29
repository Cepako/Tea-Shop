import React, { useState, MouseEvent } from 'react';

import './Colors.scss';

interface ColorsProps {
  colorsState: string[];
  setColor: React.Dispatch<React.SetStateAction<string[]>>;
}

const Colors: React.FC<ColorsProps> = ({ colorsState, setColor }) => {
  const [active, setActive] = useState(false);

  const colors = [
    'Black',
    'Violet',
    'Brown',
    'Blue-Grey',
    'Grey',
    'Light-Green',
  ];

  const handleColorAdd = (e: MouseEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const colorId = inputElement.id;
    if (!colorsState.includes(colorId)) {
      setColor((prevColors) => [...prevColors, colorId]);
    } else {
      setColor((prevColors) => prevColors.filter((color) => color !== colorId));
    }
  };

  const colorInputs = colors.map((color) => (
    <div key={color}>
      <input
        type='radio'
        name={color}
        className={color}
        readOnly
        checked={colorsState.includes(color)}
        id={color}
        onClick={handleColorAdd}
      />
      <label id='radio-container' htmlFor={color}></label>
    </div>
  ));

  return (
    <div className={active ? 'colors active' : 'colors'}>
      <h3 className='colors__title' onClick={() => setActive((prev) => !prev)}>
        Color
        <span>{active ? '-' : '+'}</span>
      </h3>
      <div className='colors__pallet'>{colorInputs}</div>
    </div>
  );
};

export default Colors;
