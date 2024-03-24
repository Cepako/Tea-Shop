import React from 'react';
import data from '../../../postsData';
import Post from './Post';

import './Posts.scss';

const Posts: React.FC = () => {
  const posts = data.map((post) => (
    <Post
      key={post.title}
      author={post.author}
      date={post.date}
      img={post.img}
      img_alt={post.img_alt}
      title={post.title}
      content={post.content}
    />
  ));
  return (
    <div className='posts'>
      <h2>All Posts</h2>
      {posts}
    </div>
  );
};

export default Posts;
