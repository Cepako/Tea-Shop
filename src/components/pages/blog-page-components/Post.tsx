import React from 'react';
import userIcon from '../../../assets/blog-user-icon.svg';
import viewsIcon from '../../../assets/view-icon.svg';
import commentIcon from '../../../assets/comment-icon.svg';

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
          <img src={userIcon} alt='user icon' />
          <p>
            {author} <br /> {date}
          </p>
        </div>
        <h3 className='blog-info__title'>{title}</h3>
        <p className='blog-info__content'>{content}</p>
        <span className='blog-info__views'>
          <img src={viewsIcon} alt='view icon' />0
        </span>
        <span className='blog-info__comments'>
          <img src={commentIcon} alt='comment icon' />0
        </span>
      </div>
    </div>
  );
};

export default Post;
