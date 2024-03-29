import React from 'react';
import FilterMenu from './FilterMenu';

import './Filters.scss';

const Filters: React.FC = () => {
  const body = document.querySelector('body')! as HTMLBodyElement;

  const handleBtnClick = () => {
    const menuFilter = document.querySelector('.filter-menu') as HTMLDivElement;
    if (menuFilter) {
      menuFilter.classList.add('active');
      body.style.overflow = 'hidden';
    }
  };

  return (
    <div className='filters'>
      <button className='filters__btn' onClick={handleBtnClick}>
        Filter
      </button>
      <FilterMenu />
    </div>
  );
};

export default Filters;
