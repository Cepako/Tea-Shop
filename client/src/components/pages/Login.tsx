import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';
import './Contact.scss';
import eye from '../../assets/view-icon.svg';
import eyeOff from '../../assets/eye-password-hide.svg';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye);

  const handleToggleIcon = () => {
    if (type === 'password') {
      setType('text');
      setIcon(eyeOff);
    } else {
      setType('password');
      setIcon(eye);
    }
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const logIn = () => {};

  return (
    <div className='login-page'>
      <div className='login-page__box'>
        <img className='logo' src='./images/shop-logo.svg' alt='cup of tea' />
        <h2>Login to Bloom's Tea</h2>
        <p>Discover premium teas and accessories</p>
        <form onSubmit={logIn}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            onChange={(e) => handleFormChange(e)}
          />
          <div className='password'>
            <input
              type={type}
              value={loginData.password}
              onChange={(e) => handleFormChange(e)}
              name='password'
              placeholder='Password'
              required
            />
            <span className='icon'>
              <img
                src={icon}
                onClick={handleToggleIcon}
                alt={type === 'password' ? 'eye' : 'eye off'}
              />
            </span>
          </div>
          <button type='submit'>Log in</button>
        </form>
        <p>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
