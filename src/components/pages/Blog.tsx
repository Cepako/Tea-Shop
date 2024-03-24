import React from 'react';
import Posts from './blog-page-components/Posts';

import './Blog.scss';

const Blog: React.FC = () => {
  return (
    <div className='blog-page'>
      <div className='header'>
        <div className='header__image'>
          <h1>Bloom's Blog</h1>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Blog;
