import React, { MouseEvent, useRef, useState } from 'react';

import './Collection.scss';

const Collection: React.FC = () => {
  const [active, setActive] = useState(true);

  const allRef = useRef<HTMLLIElement>(null);
  const classicRef = useRef<HTMLLIElement>(null);
  const herbalRef = useRef<HTMLLIElement>(null);
  const specialRef = useRef<HTMLLIElement>(null);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    allRef.current?.classList.remove('active');
    classicRef.current?.classList.remove('active');
    herbalRef.current?.classList.remove('active');
    specialRef.current?.classList.remove('active');

    switch (e.target) {
      case allRef.current:
        allRef.current?.classList.add('active');
        break;
      case classicRef.current:
        classicRef.current?.classList.add('active');
        break;
      case herbalRef.current:
        herbalRef.current?.classList.add('active');
        break;
      case specialRef.current:
        specialRef.current?.classList.add('active');
        break;
    }
  };

  return (
    <div className={active ? 'collection active' : 'collection'}>
      <h3
        className='collection__title'
        onClick={() => setActive((prev) => !prev)}
      >
        Collection <span>{active ? '-' : '+'}</span>
      </h3>
      <ul className='collection__list'>
        <li
          className='collection__list__el active'
          onClick={handleClick}
          ref={allRef}
        >
          All
        </li>
        <li
          className='collection__list__el'
          onClick={handleClick}
          ref={classicRef}
        >
          Classic
        </li>
        <li
          className='collection__list__el'
          onClick={handleClick}
          ref={herbalRef}
        >
          Herbal Tea
        </li>
        <li
          className='collection__list__el'
          onClick={handleClick}
          ref={specialRef}
        >
          Special Edition
        </li>
      </ul>
    </div>
  );
};

export default Collection;
