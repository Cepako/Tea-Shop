import React, { useState } from 'react';

import './Size.scss';

const Size: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={active ? 'size active' : 'size'}>
      <h3 className='size__title' onClick={() => setActive((prev) => !prev)}>
        Size <span>{active ? '-' : '+'}</span>
      </h3>
      <ul className='size__list'>
        <li className='size__list__el'>
          <label htmlFor='125Gr'>
            <input type='checkbox' name='125Gr' id='125Gr' /> 125Gr
            <span className='checkmark'></span>
          </label>
        </li>
        <li className='size__list__el'>
          <label htmlFor='200Gr'>
            <input type='checkbox' name='200Gr' id='200Gr' /> 200Gr
            <span className='checkmark'></span>
          </label>
        </li>
        <li className='size__list__el'>
          <label htmlFor='300Gr'>
            <input type='checkbox' name='300Gr' id='300Gr' /> 300Gr
            <span className='checkmark'></span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Size;
