import React, { useRef, useState } from 'react';
import Collection from './Collection';
import Price from './Price';
import Size from './Size';
import { useAppDispatch } from '../../../redux/hooks';
import { editTeasFilters } from '../../../redux/filters';

import './FilterMenu.scss';

const FilterMenu: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [collection, setCollection] = useState<string>('all');
  const [price, setPrice] = useState<[number, number]>([5, 15]);
  const [size, setSize] = useState<string[]>([]);

  const body = document.querySelector('body')! as HTMLBodyElement;

  const dispatch = useAppDispatch();
  const [rerenderKey, setRerenderKey] = useState<number>(0);

  const handleRemoveBtn = () => {
    menuRef.current!.classList.remove('active');
    body.style.overflow = 'auto';
  };
  const applyHandler = () => {
    const payload = {
      collection,
      price,
      size,
    };
    dispatch(editTeasFilters(payload));
    handleRemoveBtn();
  };
  const clearFiltersHandler = () => {
    const sizeInputs = document.querySelectorAll(
      '.size__list__el'
    ) as NodeListOf<HTMLLabelElement>;

    sizeInputs.forEach((input) => {
      const checkbox = input.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    });

    setCollection('all');
    setPrice([5, 15]);
    setSize([]);
    dispatch(
      editTeasFilters({
        collection: 'all',
        price: [5, 15],
        size: [],
      })
    );
    setRerenderKey((prevKey) => prevKey + 1);
  };

  return (
    <div className='filter-menu' ref={menuRef}>
      <div className='filter-menu__remove' onClick={handleRemoveBtn}>
        X
      </div>
      <h2 className='filter-menu__title'>Filter by</h2>
      <Collection rerenderKey={rerenderKey} setCollection={setCollection} />
      <Price
        rerenderKey={rerenderKey}
        minValue={5}
        maxValue={15}
        setPrice={setPrice}
      />
      <Size setSize={setSize} />
      <div className='filter-menu__buttons'>
        <button
          className='filter-menu__buttons__clear'
          onClick={clearFiltersHandler}
        >
          Clear Filters
        </button>
        <button className='filter-menu__buttons__apply' onClick={applyHandler}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
