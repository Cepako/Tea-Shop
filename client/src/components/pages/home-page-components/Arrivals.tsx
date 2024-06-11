import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

import Slider from '../../slider/Slider';

import './Arrivals.scss';

const Arrivals: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const fetchProds = async () => {
      try {
        const response = await fetch('http://localhost:8080/shop/teas');
        if (!response.ok) {
        }
        const data = await response.json();
        setProducts(data.products.slice(0, 4));
      } catch (err) {
        console.error('Fetch error:', err);
        setIsError('Failed to fetch products. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProds();
  }, []);

  return (
    <div className='new-arrivals'>
      <h2 className='new-arrivals__title'>New Arrivals</h2>
      <p className='new-arrivals__paragraph'>
        Our special teas for different life needs.
        <br /> Choose wisely.
      </p>
      <div className='spinner'>
        <TailSpin
          visible={isLoading}
          height='80'
          width='80'
          color='#242a35'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
      {!isError && !isLoading && (
        <>
          <Slider removeArrowOnDeviceType={['desktop']} data={products} />
          <Link to='/teas' className='new-arrivals__button'>
            Shop All
          </Link>
        </>
      )}
      {isError && <p className='error'>{isError}</p>}
    </div>
  );
};

export default Arrivals;
