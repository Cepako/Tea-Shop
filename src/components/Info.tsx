import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import './Info.scss';

const Info: React.FC = () => {
  const [email, setEmail] = useState('');
  const [displayParagraph, setDisplayParagraph] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fromSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (email !== '') {
      setEmail('');
      setDisplayParagraph(true);
      inputRef.current!.style.border = '1px solid black';
    } else {
      inputRef.current!.style.border = '2px solid red';
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplayParagraph(false);
    }, 3000);
  }, [displayParagraph]);

  const paragraph = <p>Thanks for submitting!</p>;

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
        <h3>Follow Us</h3>
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
      <form onSubmit={fromSubmitHandler}>
        <input
          ref={inputRef}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email here*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe Now</button>
        {displayParagraph ? paragraph : null}
      </form>
    </div>
  );
};

export default Info;
