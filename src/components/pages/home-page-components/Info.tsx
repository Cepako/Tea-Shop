import React from 'react';

import { Link } from 'react-router-dom';

import './Info.scss';

const Info: React.FC = () => {
  return (
    <div className="info">
      <div className="info__default">
        <h2>
          Get to Know
          <br /> Bloom's Tea Better
        </h2>
        <ul className="list">
          <li className="list__item">
            <Link to="/teas">Shop</Link>
          </li>
          <li className="list__item">
            <Link to="/extras">Extras</Link>
          </li>
          <li className="list__item">
            <Link to="/about">About</Link>
          </li>
          <li className="list__item">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="list__item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link to="/contact">Visit Our Stores</Link>
        <p>Customer service: 123-456-7890</p>
      </div>
      <div className="info__help">
        <h3>Help</h3>
        <ul className="list">
          <li className="list__item">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="list__item">
            <Link to="/shipping-returns">Shipping & Returns</Link>
          </li>
          <li className="list__item">
            <Link to="/store-policy">Store Policy</Link>
          </li>
          <li className="list__item">
            <Link to="/payment-methods">Payment Methods </Link>
          </li>
        </ul>
      </div>
      <div className="info__follow">
        <h3>Help</h3>
        <ul className="list">
          <li className="list__item">
            <Link to="/">Facebook</Link>
          </li>
          <li className="list__item">
            <Link to="/">Instagram</Link>
          </li>
          <li className="list__item">
            <Link to="/">Pinterest</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
