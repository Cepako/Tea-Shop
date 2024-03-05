import React, { useRef } from 'react';
import Collection from './Collection';
import Price from './Price';
import Size from './Size';

import './FilterMenu.scss';

const FilterMenu: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const body = document.querySelector('body')! as HTMLBodyElement;

  const handleRemoveBtn = () => {
    menuRef.current!.classList.remove('active');
    body.style.overflow = 'auto';
  };

  return (
    <div className='filter-menu' ref={menuRef}>
      <div className='filter-menu__remove' onClick={handleRemoveBtn}>
        X
      </div>
      <h2 className='filter-menu__title'>Filter by</h2>
      <Collection />
      <Price minValue={5} maxValue={15} />
      <Size />
      <div className='filter-menu__buttons'>
        <button className='filter-menu__buttons__clear'>Clear Filters</button>
        <button className='filter-menu__buttons__apply'> Apply</button>
      </div>
    </div>
  );
};

export default FilterMenu;
