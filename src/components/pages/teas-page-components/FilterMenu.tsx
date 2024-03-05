import React from 'react';
import Collection from './Collection';
import Price from './Price';
import Size from './Size';

import './FilterMenu.scss';

const FilterMenu: React.FC = () => {
  return (
    <div className='filter-menu'>
      <div className='filter-menu__remove'>X</div>
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
