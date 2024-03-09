import React, { useState, useEffect, ChangeEvent } from 'react';

import './Size.scss';

interface SizeProps {
  setSize: React.Dispatch<React.SetStateAction<string[]>>;
}

const Size: React.FC<SizeProps> = ({ setSize }) => {
  const [active, setActive] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sizeId = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedSizes((prevSizes) => [...prevSizes, sizeId]);
    } else {
      setSelectedSizes((prevSizes) =>
        prevSizes.filter((size) => size !== sizeId)
      );
    }
  };

  useEffect(() => {
    setSize(selectedSizes);
  }, [selectedSizes, setSize]);

  useEffect(() => {
    const clearButton = document.querySelector(
      '.filter-menu__buttons__clear'
    ) as HTMLButtonElement;

    const handleClearButtonClick = () => {
      setSelectedSizes([]);
    };

    clearButton.addEventListener('click', handleClearButtonClick);

    return () =>
      clearButton.removeEventListener('click', handleClearButtonClick);
  }, []);

  return (
    <div className={active ? 'size active' : 'size'}>
      <h3 className='size__title' onClick={() => setActive((prev) => !prev)}>
        Size <span>{active ? '-' : '+'}</span>
      </h3>
      <ul className='size__list'>
        <li className='size__list__el'>
          <label htmlFor='125Gr'>
            <input
              type='checkbox'
              name='125Gr'
              id='125Gr'
              onChange={handleInputChange}
            />
            125Gr
            <span className='checkmark'></span>
          </label>
        </li>
        <li className='size__list__el'>
          <label htmlFor='200Gr'>
            <input
              type='checkbox'
              name='200Gr'
              id='200Gr'
              onChange={handleInputChange}
            />
            200Gr
            <span className='checkmark'></span>
          </label>
        </li>
        <li className='size__list__el'>
          <label htmlFor='300Gr'>
            <input
              type='checkbox'
              name='300Gr'
              id='300Gr'
              onChange={handleInputChange}
            />
            300Gr
            <span className='checkmark'></span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Size;
