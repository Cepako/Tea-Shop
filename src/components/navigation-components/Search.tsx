import React from 'react';

import './Search.scss';

const Search: React.FC = () => {
  return (
    <div className="search">
      <label htmlFor="search">
        <input id="search" name="search" type="text" placeholder="Search..." />
        <img src="./images/loupe-icon.svg" alt="" />
      </label>
    </div>
  );
};

export default Search;
