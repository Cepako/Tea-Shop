import React from 'react';
import { Link } from 'react-router-dom';

import './Error.scss';

const ErrorPage: React.FC = () => {
  return (
    <>
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
        <Link to='/'>Go to home page!</Link>
      </main>
    </>
  );
};

export default ErrorPage;
