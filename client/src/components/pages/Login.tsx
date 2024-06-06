import React, { ChangeEvent, FormEvent, useState } from 'react';
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
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setLoginError('');
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData(e.target as HTMLFormElement);

      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: fd,
      });
      if (!response.ok) {
        const errorData = await response.json();

        setLoginError(errorData.message);
        throw new Error(errorData.message);
      }
      const resData = await response.json();
      //token and userId
    } catch (err) {
      console.error('Failed to log in. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-page__box'>
        <img className='logo' src='./images/shop-logo.svg' alt='cup of tea' />
        <h2>Login to Bloom's Tea</h2>
        <p>Discover premium teas and accessories</p>
        <form onSubmit={handleSubmit}>
          {loginError && <p className='invalid'>{loginError}</p>}
          <input
            type='email'
            name='email'
            value={loginData.email}
            placeholder='Email'
            required
            onChange={(e) => handleFormChange(e)}
            onBlur={(e) => handleFormChange(e)}
          />
          <div className='password'>
            <input
              type={type}
              value={loginData.password}
              onChange={(e) => handleFormChange(e)}
              onBlur={(e) => handleFormChange(e)}
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
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Logging in' : 'Log in'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
