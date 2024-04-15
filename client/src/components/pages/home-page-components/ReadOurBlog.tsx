import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

import Quote from './Quote';

import { quotes, responsive } from './home-page-quotes-data';

import 'react-multi-carousel/lib/styles.css';
import './ReadOurBlog.scss';

const ReadOurBlog: React.FC = () => {
  const quoteList = quotes.map((el) => (
    <Quote key={el.author} text={el.quote} author={el.author} />
  ));

  return (
    <div className="blog">
      <div className="blog__title">
        <Link to="/blog">Read Our Blog</Link>
      </div>
      <div className="blog__carousel">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'desktop', 'mobile']}
          autoPlay={true}
          autoPlaySpeed={5000}
          infinite={true}
          swipeable={false}
          draggable={false}
        >
          {quoteList}
        </Carousel>
      </div>
    </div>
  );
};

export default ReadOurBlog;
