import React from 'react';

import './Post.scss';

interface PostProps {
  author: string;
  date: string;
  img: string;
  img_alt: string;
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({
  author,
  date,
  img,
  img_alt,
  title,
  content,
}) => {
  return (
    <div className='post'>
      <img className='post__img' src={img} alt={img_alt} />
      <div className='blog-info'>
        <div className='blog-info__author'>
          <img src='/images/blog-user-icon.svg' alt='user icon' />
          <p>
            {author} <br /> {date}
          </p>
        </div>
        <h2 className='blog-info__title'>{title}</h2>
        <p className='blog-info__content'>{content}</p>
        <span className='blog-info__views'>
          <img src='/images/view-icon.svg' alt='view icon' />0
        </span>
        <span className='blog-info__comments'>
          <img src='/images/comment-icon.svg' alt='comment icon' />0
        </span>
      </div>
    </div>
  );
};

export default Post;
